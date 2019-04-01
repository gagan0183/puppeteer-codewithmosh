const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
var request = require('request');

async function getPic() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://codewithmosh.com/sign_in');
    await page.keyboard.type('g.deepsingh1@gmail.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('ARIHANT');
    await page.click('#new_user > div.form-group.text-center > input');
    await page.waitForNavigation({waitUntil: 'load'});
    await page.goto('https://codewithmosh.com/courses/293204/lectures/4509750');
    course(page);
}

function course(page) {
    download(page).then(async (message) => {
        console.log(message);
        page.$eval('#lecture_complete_button', element => element.href).then(completebtn => {
            if(completebtn) {
                page.click('#lecture_complete_button > span').then(() => {
                    page.waitForNavigation({waitUntil: 'load'}).then(() => {
                        course(page);
                    });
                });
            }
            else {
                browser.close().then(() => {
                    console.log('close');
                })
            }
        });
    });
}

var download = function(page) {
    let promise = new Promise(async (resolve, reject) => {
        let url;
        page.$eval('.download', element => element.href).then((url) => {
            url = url;
            console.log(url);
            if(url) {
                let fullname;
                page.$eval('.download', element => element.dataset.xOriginDownloadName).then((name) => {
                    fullname = `/Users/gagan/Downloads/p/${name}`;
                    console.log(fullname);
                    const file = fs.createWriteStream(fullname);
                    const request = https.get(url, function(response) {
                        response.pipe(file);
                        file.on('finish', function() {
                            console.log('finish');
                            file.close(resolve(`${fullname} complete`));
                        });
                    }).on('error', function(err) { // Handle errors
                        console.log('error');
                        fs.unlink(dest); // Delete the file async. (But we don't check the result)
                        if (cb) reject({
                            error: true,
                            message: err.message
                        });
                    });
                });
            }
            else {
                resolve('next video');
            }
        });
    });
    return promise;
};

getPic();