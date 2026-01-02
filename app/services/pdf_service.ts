import puppeteer from 'puppeteer'
import env from '#start/env'

export class PdfService {
  private async getBrowser() {
    return await puppeteer.launch({
      executablePath: env.get('CHROMIUM_PATH'),
      headless: true,
      args: ['--disable-dev-shm-usage', '--disable-gpu'],
    })
  }

  public async generatePdfFromHtml(html: string): Promise<Buffer> {
    const browser = await this.getBrowser()
    const page = await browser.newPage()

    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-family: 'Helvetica', 'Arial', sans-serif; font-size: 10pt; width: 100%; text-align: center; color: #7f8c8d; padding: 0 15mm;">
          <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>
      `,
      margin: {
        top: '10mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    })

    await browser.close()

    return Buffer.from(pdf)
  }
}
