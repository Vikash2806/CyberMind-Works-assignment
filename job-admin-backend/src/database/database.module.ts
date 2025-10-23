import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = parseInt(configService.get<string>('DB_PORT') || '5432', 10);
        const dbUser = configService.get<string>('DB_USERNAME');
        const dbPass = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');

        if (!dbHost || !dbUser || !dbPass || !dbName) {
          throw new Error('❌ Missing one or more database environment variables');
        }

        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // rebuild schema during dev
          logging: true,
          ssl: {
            rejectUnauthorized: false, // needed for Supabase SSL
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
