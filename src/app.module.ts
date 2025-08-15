import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    RegisterModule,
  ],
  providers: [AppService],
})
export class AppModule {}
