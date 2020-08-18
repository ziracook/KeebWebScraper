# KeebScraper

The custom keyboard community is notorious for having parts sell out fast before you even knew they went up for sale.
This script was designed to help me determine when a keyboard I wanted was back in stock, however, this script could be used to detect changes in any webpage.

The script uses these external APIs:
- [Puppeteer](https://pptr.dev/): runs a headless broswer that can navigate a page and take screenshots
- [Pixelmatch](https://github.com/mapbox/pixelmatch): a library that compares the two images and determines how similar they are
- [NodeMailer](https://nodemailer.com/about/): allows for the sending of emails directly from code

Basics of how it works:
- Use Puppeteer to load the desired webpage and take a screenshot.
- Compare the new screenshot to the last captured screenshot using PixelMatch.
- If the screenshots differ within the pixel threshold, send an email alert.
- If the screenshots aren't different, wait for an interval of time (5 minutes) and look again.
