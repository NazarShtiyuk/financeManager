import { Module } from '@nestjs/common';
import { BankModule } from './bank/bank.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresOptions } from './configs/database.config';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresOptions,
    }),
    BankModule,
    TransactionModule,
    CategoryModule,
    StatisticModule,
  ],
})
export class AppModule {}
