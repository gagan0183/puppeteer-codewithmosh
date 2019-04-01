const puppeteer = require('puppeteer');

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://codewithmosh.com');
    await page.setViewport({width: 1000, height: 500});
    await page.screenshot({path: 'code.png'});
    await browser.close();
}

getPic();