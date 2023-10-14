import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import puppeteer from 'puppeteer';

let browser = null;
let page = null;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NavigatorGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getMusicList')
  async init(@MessageBody() data: any): Promise<Object> {

    if (!browser) browser = await puppeteer.launch({ headless: true });
    if (!page) page = await browser.newPage();

    await page.setViewport({ width: 1240, height: 800 });
  
    await page.goto(`https://www.youtube.com/watch?v=${data.video_id}`);

    await page.waitForTimeout(2000);

    const elem = await page.$('ytd-app');
    const boundingBox = await elem.boundingBox();
    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2,
      boundingBox.y + boundingBox.height / 2
    );

    await page.mouse.wheel({ deltaY: 2400 });

    await page.waitForTimeout(1250);

    await page.mouse.wheel({ deltaY: 2400 });

    await page.waitForTimeout(1000);

    let list = await page.$$eval('ytd-compact-video-renderer span#video-title', (l: HTMLSpanElement[]) => {
      return l.map(span => span.textContent);
    });

    // await page.close();
    // await browser.close();

    return { list };
  }
}