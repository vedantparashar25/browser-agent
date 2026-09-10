import { chromium } from 'playwright';

async function testSpeech() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  const evalResult = await page.evaluate(async () => {
    const voices = window.speechSynthesis.getVoices();
    const heera = voices.find(v => v.name.includes('Heera')) || voices[0];
    
    const sampleHinglish = "Namaste! Main Aria hoon. Dekhiye, aapke liye sabse badhiya deal mil gayi hai — boAt Airdopes 141 ANC, sirf 1299 rupees me Amazon par! Kya main link open kar doon?";
    
    return {
      voiceUsed: heera ? heera.name : 'none',
      text: sampleHinglish
    };
  });

  console.log('Eval Result:', evalResult);
  await browser.close();
}

testSpeech().catch(console.error);
