import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { QueryStatistic } from './dto/query.dto';

@Injectable()
export class StatisticService {
  constructor(private readonly categoryService: CategoryService) {}

  async getStatistic(query: QueryStatistic) {
    const { categoryIds, fromPeriod, toPeriod } = query;
    let response = {};

    for (const categoryId of categoryIds) {
      const result = await this.getBalanceFromCategory(
        categoryId,
        fromPeriod,
        toPeriod,
      );
      response = { ...response, ...result };
    }

    return response;
  }

  private async getBalanceFromCategory(
    categoryId: string,
    fromPeriod: Date,
    toPeriod: Date,
  ) {
    const categoryFromDB = await this.categoryService.getById(categoryId);
    const transactions = categoryFromDB.transactions;

    let balance = 0;

    for (const transaction of transactions) {
      if (
        transaction.createdAt >= new Date(fromPeriod) &&
        transaction.createdAt <= new Date(toPeriod)
      ) {
        if (transaction.type === 'profitable') {
          balance += transaction.amount;
        }
        if (transaction.type === 'consumable') {
          balance -= transaction.amount;
        }
      }
    }

    return {
      [categoryFromDB.name.toLowerCase().toString()]: balance,
    };
  }
}
