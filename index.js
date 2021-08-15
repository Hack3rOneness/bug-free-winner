// index.js

// Require Puppeteer.
const puppeteer = require("puppeteer");

async function generatePDF() {
  // Launch a new browser session.
  const browser = await puppeteer.launch();
  // Open a new Page.
  const page = await browser.newPage();

  // Go to our invoice page that we serve on `localhost:8000`.
  await page.goto("http://localhost:8000");
  // Store the PDF in a file named `invoice.pdf`.
  await page.pdf({ path: "invoice.pdf", format: "A4" });

  await browser.close();
}

// index.js
const puppeteer = require("puppeteer");
const http = require("http");

// Create an instance of the HTTP server to handle the request.
http
  .createServer(async (req, res) => {
    // Set the content type so the browser knows how to handle the response.
    res.writeHead(200, { "Content-Type": "application/pdf" });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:8000");
    // By removing the `path` option, we will receive a `Buffer` from `page.pdf`.
    const buffer = await page.pdf({ format: "A4" });

    await browser.close();

    // We can directly serve this buffer to the browser.
    res.end(buffer);
  })
  .listen(3000);
