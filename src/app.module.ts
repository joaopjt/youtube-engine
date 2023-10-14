import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NavigatorModule } from './navigator/navigator.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api'],
    }),
    NavigatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
