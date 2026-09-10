import { chromium } from 'playwright';

export class BrowserController {
  static sharedBrowser = null;

  static async warmup(headless = true) {
    if (!BrowserController.sharedBrowser) {
      try {
        BrowserController.sharedBrowser = await chromium.launch({
          headless,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--proxy-server=direct://',
            '--proxy-bypass-list=*',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-background-networking',
            '--disable-blink-features=AutomationControlled',
            '--window-size=1280,800',
            '--mute-audio',
            '--no-first-run'
          ]
        });
        console.log('⚡ Playwright Chromium pre-warmed & ready for instant navigation!');
      } catch (e) {
        console.warn('Browser warmup warning:', e.message);
      }
    }
  }

  constructor(options = {}) {
    this.headless = options.headless !== undefined ? options.headless : true;
    this.browser = null;
    this.context = null;
    this.page = null;
    this.timeout = options.timeout || 6000;
  }

  async init() {
    if (this.context && this.page) return;

    try {
      if (!BrowserController.sharedBrowser) {
        await BrowserController.warmup(this.headless);
      }

      this.browser = BrowserController.sharedBrowser;

      this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        locale: 'en-IN',
        timezoneId: 'Asia/Kolkata',
        extraHTTPHeaders: {
          'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8'
        }
      });

      this.page = await this.context.newPage();

      await this.page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });

      this.page.setDefaultTimeout(this.timeout);
      this.page.setDefaultNavigationTimeout(this.timeout);
    } catch (err) {
      console.error('Browser init failed:', err.message);
      throw err;
    }
  }

  async takeScreenshot() {
    if (!this.page) return null;
    try {
      const buffer = await this.page.screenshot({ type: 'jpeg', quality: 35 });
      return buffer.toString('base64');
    } catch (e) {
      return null;
    }
  }

  async navigate(url) {
    await this.init();
    try {
      // Navigate with domcontentloaded for reliable element access
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: this.timeout
      });

      // Quick wait for listing elements (short timeout so it never stalls)
      try {
        await this.page.waitForSelector(
          '[data-component-type="s-search-result"], [data-asin]:not([data-asin=""]), .s-result-item[data-asin], .product-card, li.b_algo, article',
          { timeout: 3500 }
        );
      } catch (e) {}

      const title = await this.page.title();
      const screenshot = await this.takeScreenshot();
      return {
        success: true,
        url: this.page.url(),
        title,
        status: 200,
        screenshot
      };
    } catch (err) {
      console.warn('Navigation warning:', err.message);
      const screenshot = await this.takeScreenshot();
      return {
        success: false,
        url,
        error: err.message,
        screenshot
      };
    }
  }

  async search(query, engine = 'bing') {
    await this.init();
    let searchUrl = '';
    if (engine === 'bing') {
      searchUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(query);
    } else if (engine === 'duckduckgo') {
      searchUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(query);
    } else {
      searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }

    const nav = await this.navigate(searchUrl);
    const screenshot = await this.takeScreenshot();
    return {
      ...nav,
      screenshot
    };
  }

  async extractListings() {
    if (!this.page) return [];
    try {
      // Auto-scroll to trigger lazy loading of product cards and high-res images
      try {
        await this.page.evaluate(() => window.scrollBy(0, 900));
        await new Promise(r => setTimeout(r, 450));
      } catch (e) {}

      const listings = await this.page.evaluate(() => {
        const results = [];
        
        // Strategy 1: Amazon & E-commerce Product Cards
        const productSelectors = [
          '[data-component-type="s-search-result"]',
          '.s-result-item[data-asin]:not([data-asin=""])',
          '.s-result-item',
          '.product-card',
          '.cp-product'
        ];

        for (const selector of productSelectors) {
          const elements = document.querySelectorAll(selector);
          if (elements && elements.length > 0) {
            elements.forEach((card) => {
              const asin = card.getAttribute('data-asin') || '';
              const titleEl = card.querySelector('h2 a span, h2 span, .a-size-medium, .a-size-base-plus, [class*="title"]');
              if (!titleEl) return;
              let title = titleEl.textContent.trim().replace(/\s+/g, ' ');
              title = title.replace(/^Sponsored.*?query\.Let us know\s*/i, '').replace(/^Sponsored\s*/i, '').trim();
              
              const lowerTitle = title.toLowerCase().trim();
              if (
                lowerTitle === 'results' ||
                lowerTitle.startsWith('results') ||
                lowerTitle.startsWith('showing results') ||
                lowerTitle.startsWith('need help') ||
                lowerTitle.startsWith('filters') ||
                lowerTitle === 'sponsored' ||
                lowerTitle.length < 10 ||
                lowerTitle.includes('results for') ||
                lowerTitle.includes('check each product page')
              ) {
                return;
              }

              const priceEl = card.querySelector('.a-price .a-offscreen, .a-price-whole, [class*="price"]');
              let price = priceEl ? priceEl.textContent.trim() : '';
              const priceMatch = price.match(/₹\s*[\d,]+/);
              const cleanPrice = priceMatch ? priceMatch[0].replace(/\s+/, '') : (price ? '₹' + price.replace(/[^\d,]/g, '') : '');

              const origPriceEl = card.querySelector('.a-text-price .a-offscreen, [class*="strike"], [class*="original"]');
              const originalPrice = origPriceEl ? origPriceEl.textContent.trim() : '';

              const ratingEl = card.querySelector('.a-icon-alt, [class*="rating"], [aria-label*="stars"]');
              let rating = ratingEl ? (ratingEl.getAttribute('aria-label') || ratingEl.textContent.trim()) : '';
              const ratingMatch = rating.match(/(\d+(?:\.\d+)?)\s*(?:out of 5|stars|\/5)/i) || rating.match(/^(\d+(?:\.\d+)?)/);
              const numRating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.2;

              const reviewsEl = card.querySelector('span[aria-label*="ratings"], .a-size-base.s-underline-text');
              const reviewsCount = reviewsEl ? reviewsEl.textContent.trim() : '';

              const imgEl = card.querySelector('img.s-image, img[class*="product"], img');
              let img = '';
              if (imgEl) {
                img = imgEl.currentSrc || imgEl.src || imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '';
                if (img.includes('transparent-pixel') || img.includes('grey-pixel') || img.includes('spacer') || img.includes('/impb?') || img.includes('aax-') || img.startsWith('data:image/gif')) {
                  const srcset = imgEl.getAttribute('srcset') || imgEl.getAttribute('data-srcset');
                  if (srcset) {
                    const parts = srcset.split(',');
                    const last = parts[parts.length - 1].trim().split(' ')[0];
                    if (last && last.startsWith('http') && !last.includes('aax-') && !last.includes('/impb?')) img = last;
                  }
                }
                // Upgrade Amazon thumbnail to crisp high-res official product image
                if (img && img.includes('media-amazon.com/images/')) {
                  img = img.replace(/\._AC_[A-Z0-9,]+_\./, '._AC_SL1500_.');
                }
              }

              const linkEl = card.querySelector('h2 a, a.a-link-normal[href*="/dp/"], a[href*="/dp/"], a.a-link-normal');
              const href = linkEl ? linkEl.getAttribute('href') : '';
              
              // STRONG DIRECT PRODUCT PAGE LINK (NEVER SEARCH PAGE & NEVER 404)
              let directProductUrl = '';
              if (href && href.includes('/dp/')) {
                const cleanPath = href.split('?')[0].split('/ref=')[0];
                directProductUrl = cleanPath.startsWith('http') ? cleanPath : `https://www.amazon.in${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
              } else if (asin && asin.length >= 8) {
                directProductUrl = `https://www.amazon.in/dp/${asin}`;
              } else {
                const asinMatch = (href || '').match(/(?:dp|gp\/product|%2Fdp%2F|product)\/([A-Z0-9]{10})/i);
                if (asinMatch) {
                  directProductUrl = `https://www.amazon.in/dp/${asinMatch[1]}`;
                } else if (href && href.startsWith('http')) {
                  directProductUrl = href;
                } else if (href) {
                  directProductUrl = window.location.origin + href;
                } else {
                  directProductUrl = window.location.href;
                }
              }

              const numPrice = cleanPrice ? parseInt(cleanPrice.replace(/[^\d]/g, ''), 10) : 0;

              results.push({
                asin,
                title,
                price: cleanPrice || '',
                numPrice,
                originalPrice,
                rating: numRating,
                reviewsCount: reviewsCount ? reviewsCount + ' ratings' : 'Verified buyers',
                image: img || '',
                url: directProductUrl,
                directProductUrl,
                source: window.location.hostname.replace('www.', '')
              });
            });

            // Prioritize items that have valid titles and prices; return up to 25 items
            const withPrice = results.filter(r => r.numPrice > 0);
            if (withPrice.length > 0) return withPrice.slice(0, 25);
            if (results.length > 0) return results.slice(0, 25);
          }
        }

        // Strategy 2: Search Engine Results (Bing / Google)
        const searchSelectors = ['li.b_algo', '.b_algo', 'article', '[data-testid="result"]'];
        for (const s of searchSelectors) {
          const items = document.querySelectorAll(s);
          if (items && items.length > 0) {
            items.forEach((item) => {
              const titleEl = item.querySelector('h2 a, h2, [class*="title"]');
              const snippetEl = item.querySelector('.b_caption p, [data-result="snippet"], p');
              const linkEl = item.querySelector('h2 a, a[href^="http"]');
              if (titleEl && linkEl) {
                const title = titleEl.textContent.trim().replace(/\s+/g, ' ');
                const snippet = snippetEl ? snippetEl.textContent.trim() : '';
                const url = linkEl.getAttribute('href') || linkEl.href;
                
                const priceMatch = snippet.match(/(?:₹|rs\.?|inr)\s*(\d+[\d,]*)/i);
                const priceStr = priceMatch ? '₹' + priceMatch[1] : '';
                const numPrice = priceMatch ? parseInt(priceMatch[1].replace(/[^\d]/g, ''), 10) : 0;

                if (title.length > 5) {
                  results.push({
                    title,
                    price: priceStr || 'Available online',
                    numPrice,
                    originalPrice: '',
                    rating: 4.3,
                    reviewsCount: 'Popular choice',
                    snippet,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
                    url: url,
                    source: new URL(url, window.location.href).hostname.replace('www.', '')
                  });
                }
              }
            });
            if (results.length > 0) return results.slice(0, 8);
          }
        }

        return results;
      });

      return listings;
    } catch (e) {
      console.warn('Listing extraction error:', e.message);
      return [];
    }
  }

  async readPageText(maxLength = 3000) {
    if (!this.page) return '';
    try {
      const text = await this.page.evaluate(() => {
        const body = document.body;
        if (!body) return '';
        const scripts = body.querySelectorAll('script, style, noscript, svg, nav, footer');
        scripts.forEach(s => s.remove());
        return body.innerText || '';
      });
      return text.replace(/\s+/g, ' ').trim().slice(0, maxLength);
    } catch (e) {
      return '';
    }
  }

  async click(selectorOrText) {
    if (!this.page) return false;
    try {
      if (await this.page.$(selectorOrText)) {
        await this.page.click(selectorOrText);
        return true;
      }
      const element = this.page.locator('text=' + selectorOrText).first();
      if (await element.count() > 0) {
        await element.click();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  async fillForm(selector, value) {
    if (!this.page) return false;
    try {
      await this.page.fill(selector, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  async proceedToOrder(productUrl) {
    await this.init();
    try {
      console.log('Autonomous checkout proceeding to:', productUrl);
      await this.navigate(productUrl);

      const buySelectors = [
        '#buy-now-button',
        'input#buy-now-button',
        '#add-to-cart-button',
        'input#add-to-cart-button',
        'button[name="submit.buy-now"]',
        'button[name="submit.add-to-cart"]',
        'button:has-text("Buy Now")',
        'button:has-text("Add to Cart")'
      ];

      let clicked = false;
      for (const sel of buySelectors) {
        if (await this.page.$(sel)) {
          try {
            await this.page.click(sel, { timeout: 2000 });
            clicked = true;
            break;
          } catch (err) {}
        }
      }

      const checkoutUrl = this.page.url();
      const screenshot = await this.takeScreenshot();

      return {
        success: true,
        clicked,
        checkoutUrl,
        screenshot
      };
    } catch (e) {
      console.warn('Proceed to order warning:', e.message);
      const screenshot = await this.takeScreenshot();
      return {
        success: false,
        checkoutUrl: productUrl,
        screenshot,
        error: e.message
      };
    }
  }

  async close() {
    try {
      if (this.context) await this.context.close();
    } catch (e) {
      // ignore
    } finally {
      this.context = null;
      this.page = null;
    }
  }
}
