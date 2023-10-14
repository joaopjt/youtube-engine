import { Module } from '@nestjs/common';
import { NavigatorGateway } from './navigator.gateway';

@Module({
  providers: [NavigatorGateway],
})
export class NavigatorModule {}