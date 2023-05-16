const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem-vindo ao Bot conversor 🤖💰');

async function robo() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
  const moedaFinal = readlineSync.question('Informe uma moeda desejada: ') || 'real';

  const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
  await page.goto(qualquerUrl);

  const valorDolar = await page.evaluate(() => {
    const dolarInputElement = document.querySelector('input.lWzCpb.a61j6');
    return dolarInputElement.value;
  });

  const valorReal = await page.evaluate(() => {
    const realInputElement = document.querySelector('input.lWzCpb.ZEB7Fb');
    return realInputElement.value;
  });

  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${valorDolar} ${moedaFinal}`);
  console.log(`O valor de 1 ${moedaFinal} em ${moedaBase} é ${valorReal} ${moedaBase}`);

  await browser.close();
}

robo();
