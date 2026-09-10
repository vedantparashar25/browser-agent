import { chromium } from 'playwright';

async function testNumberPronunciation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  const res = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      const heera = voices.find(v => v.name.includes('Heera')) || voices[0];

      const u1 = new SpeechSynthesisUtterance("Dekhiye, yeh 1299 rupees me mil raha hai.");
      const u2 = new SpeechSynthesisUtterance("Dekhiye, yeh baarah sau ninaanve rupaye me mil raha hai.");
      u1.voice = heera;
      u2.voice = heera;

      resolve({
        voice: heera.name,
        lang: heera.lang,
        text1: u1.text,
        text2: u2.text
      });
    });
  });

  console.log('Pronunciation Setup:', res);
  await browser.close();
}

testNumberPronunciation().catch(console.error);
