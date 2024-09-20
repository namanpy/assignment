import puppeteer, { Browser } from "puppeteer";

// Launch the browser
var browser: Browser;

export const generatePdfFromHtml = async (html: string) => {
  if (!browser) browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(html, { waitUntil: "load" });

  // Generate the PDF
  return Buffer.from(
    await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    })
  );
};
