# KeebScraper

The custom keyboard community is notorious for having parts sell out fast before you even knew they went up for sale.
This script was designed to help me determine when a keyboard I wanted was back in stock, however, this script could be used to detect changes in any webpage.

## External APIs:
- [Puppeteer](https://pptr.dev/): runs a headless broswer that can navigate a page and take screenshots
- [Pixelmatch](https://github.com/mapbox/pixelmatch): a library that compares the two images and determines how similar they are
- [NodeMailer](https://nodemailer.com/about/): allows for the sending of emails directly from code

## How it works:
- Use Puppeteer to load the desired webpage and take a screenshot.
- Compare the new screenshot to the last captured screenshot using PixelMatch.
- If the screenshots differ within the pixel threshold, send an email alert.
- If the screenshots aren't different, wait for an interval of time (5 minutes) and look again.


## Local Setup:
- Clone the repo
  ```
  git clone https://github.com/ziracook/KeebScraper.git
  ```
- Install the libraries
  ```
  npm install puppeteer
  npm install pixelmatch
  npm install nodemailer
  ```
- Duplicate *currentPage.png* and name the duplicate *previousPage.png*
- *emailConfig.json* will need to be configured with two email adresses, one to send and one to recieve.
  - Create or use a previously existing dev email
  - To use a Gmail account to send an alert email, it cannot have 2FA enabled because you must set it to allow use from less secure apps.
  - See this NodeMailer doc for more information: https://nodemailer.com/usage/using-gmail/
- Run the script
  ```
  node scraper.js
  ```
  
