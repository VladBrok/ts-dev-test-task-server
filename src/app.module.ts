import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokenBlacklistModule } from './token-blacklist/token-blacklist.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TokenBlacklistModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
