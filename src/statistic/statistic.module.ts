import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [CategoryModule],
})
export class StatisticModule {}
