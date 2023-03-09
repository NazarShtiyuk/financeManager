import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from 'src/bank/bank.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, Logger],
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, BankEntity, CategoryEntity]),
  ],
})
export class TransactionModule {}
