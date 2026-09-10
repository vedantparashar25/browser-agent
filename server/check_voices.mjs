import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  const voices = await page.evaluate(() => {
    return window.speechSynthesis.getVoices().map(v => ({ name: v.name, lang: v.lang }));
  });
  console.log('Voices count:', voices.length);
  console.log('Voices:', JSON.stringify(voices, null, 2));
  await browser.close();
}

check().catch(console.error);
