import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getRelatedVideos(): Promise<Array<string>> {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800 });
    await page.setRequestInterception(true);
    
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
    
    await page.goto('https://www.youtube.com/watch?v=-0kcet4aPpQ');

    await page.waitForTimeout(5000);

    const list = await page.$$eval('ytd-compact-video-renderer span#video-title', (list: HTMLSpanElement[]) => {
      return list.map(span => span.textContent);
    });

    await page.close();
    await browser.close();

    return list;
  }
}
