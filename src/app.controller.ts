import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
const { Sunflower } = require('sunflower');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getHome(@Res() res: Response): Promise<Response> {
    const parser = {
      sunflower: (s) => { return new Sunflower(s).result }
    };

    const parser_keys = {
      "Shǒu": "camping",
      "Tián": "placard",
      "Shuǐ": "compass",
      "Kǒu": "christmas_tree",
      "Niàn": "sunglasses",
      "Bo": "gas_station",
      "Shān": "pepper_spray",
      "Gē": "fire_extinguisher",
      "Rén": "umbrella",
      "Xīn": "eagle",
      "Rì": "snowflake",
      "Shī": "sunflower",
      "Mù": "watch",
      "Huǒ": "tent",
      "Tǔ": "taxi_cab",
      "Zhú": "toolbox",
      "Shí": "tennis",
      "Dà": "bullseye",
      "Zhōng": "joystick",
      "Nán": "telephone",
      "Jīn": "trash_can",
      "Nǚ": "guitar",
      "Yuè": "calendar",
      "Gōng": "magnet",
      "Yī": "flashlight"
    };

    console.log(parser[parser_keys['Shī']]);

    return res.json(parser_keys);
  }
}
