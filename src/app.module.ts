import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './enums/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ProtectedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env[Config.Mode] || 'development'}.env`,
    }),
    MongooseModule.forRoot(process.env[Config.DbUrl]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
