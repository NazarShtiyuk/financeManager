import { ConfigService } from '@nestjs/config';

export const getPostgresOptions = async (configService: ConfigService) => ({
  type: configService.get('DATABASE_TYPE'),
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  autoLoadEntities: true,
  synchronize: true,
});
