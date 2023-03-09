import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankEntity } from 'src/bank/bank.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { CreateTransaction } from './dto/create.dto';
import { QueryGetAll } from './dto/query.dto';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  private readonly logger: Logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateTransaction) {
    const bank = await this.bankRepository.findOne({
      where: { name: dto.bank },
    });

    if (!bank) {
      throw new NotFoundException(
        'This name of bank does not exist in database, please create it!',
      );
    }

    const categories = [];

    for (const el of dto.categories) {
      const category = await this.categoryRepository.findOne({
        where: { name: el },
      });
      if (!category) {
        throw new NotFoundException(
          `The category: ${el} does not exist in database, please create it!`,
        );
      }

      categories.push(category);
    }

    if (dto.type === 'profitable') {
      bank.balance += dto.amount;
    } else if (dto.type === 'consumable') {
      bank.balance -= dto.amount;
    }

    const newTransaction = new TransactionEntity();
    Object.assign(newTransaction, { ...dto, bank, categories });
    Object.assign(bank, { balance: bank.balance });

    this.logger.log('Transaction was succussfully created!');
    await this.bankRepository.save(bank);
    return this.transactionRepository.save(newTransaction);
  }

  async getAll(query: QueryGetAll) {
    const { page = 1, count = 10 } = query;
    const skip = (page - 1) * 10;
    const take = count;
    return this.transactionRepository.find({ skip, take });
  }

  async delete(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(
        'Transaction with this ID not found, please check ID!',
      );
    }

    this.logger.log('Transaction was successfully deleted!');
    await this.transactionRepository.delete(id);
  }
}
