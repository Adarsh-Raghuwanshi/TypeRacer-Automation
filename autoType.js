//input -> node autoType.js

let puppeteer = require('puppeteer');

(async () => {
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport: null,
        args: [
            "--start-maximized"
        ]
    });

    let pages = await browser.pages();
    let page = pages[0];
    await page.goto('https://play.typeracer.com');

    await page.waitForSelector('a.promptBtn.signIn');
    await page.click('a.promptBtn.signIn');

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'addyempire', {delay : 100});

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', 'Adarsh@7', {delay : 100});
    await page.click('button.gwt-Button');

    await page.waitForTimeout(2000);
    await page.waitForSelector('div.enterRace a.prompt-button.bkgnd-green');
    await page.click('div.enterRace a.prompt-button.bkgnd-green');

    await page.waitForSelector('span[unselectable="on"]');
    let type = await page.$$eval('span[unselectable="on"]', span => span.map(v => v.textContent));

    await page.waitForSelector('input.txtInput');
    await page.waitForTimeout(14000);
    for(let i = 0; i < type.length; i++){
         await page.type('input.txtInput', type[i], {delay : 100});//from here you can decide the typing speed.
    }

    await page.waitForTimeout(5000);
    await browser.close();
})();