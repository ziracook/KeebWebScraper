const puppeteer = require('puppeteer');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const nodemailer = require("nodemailer");
const config = require("./emailConfig.json");

diffThreshold = 800;
var intervalMinutes = 5;

async function sendEmail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.fromEmail,
          pass: config.fromPassword,
        }
      });

    transporter.sendMail({
        from: config.fromEmail,
        to: config.toEmail,
        subject: 'MAJA Keyboard',
        text: 'The keyboard may be on sale, here is a link: https://kbdfans.com/collections/diy-kit/products/coming-soon-vulcan-x-kbdfans-maja-mechanical-keyboard-diy-kit ',
    }, (err, info) => {
        console.log(err);
        console.log(info.envelope);
        console.log(info.messageId);
    });
}

async function scrapePage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 1000,
        isLandscape: true,
    });
    await page.goto('https://kbdfans.com/collections/diy-kit/products/coming-soon-vulcan-x-kbdfans-maja-mechanical-keyboard-diy-kit');
    await page.screenshot({path: 'currentPage.png'});
  
    await browser.close();
}

function compareImages() {
    const img1 = PNG.sync.read(fs.readFileSync('currentPage.png'));
    if (!fs.existsSync('previousPage.png')) {
        fs.copyFileSync('currentPage.png', 'previousPage.png', 0, (err) => {
            if (err) throw err;
            console.log('copying file');
        });
    }
    const img2 = PNG.sync.read(fs.readFileSync('previousPage.png'));
    const {width, height} = img1;
    const diff = new PNG({width, height});
    const numOfDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.2});
      
    fs.writeFileSync('diff.png', PNG.sync.write(diff));
    return numOfDiffPixels;
}

function checkPageForUpdate() {
    console.log('\n***********************\nChecking page ' + (new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':'));
    scrapePage().then(() => {
        numOfDiffPixels = compareImages()
        if (numOfDiffPixels > diffThreshold) {
            console.log('CHANGE DETECTED: ' + numOfDiffPixels);
            sendEmail();
            fs.copyFile('currentPage.png', 'previousPage.png', (err) => {
                if (err) throw err;
            });
        } 
        else {
            console.log('No change');
        }
    });
    
}

var runInterval = intervalMinutes * 60 * 1000;
checkPageForUpdate();
setInterval(checkPageForUpdate, runInterval);