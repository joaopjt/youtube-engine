import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHome(@Res() res: Response): Promise<Response> {
    let music_list = await this.appService.getRelatedVideos();

    return res.json(music_list);
  }
}
