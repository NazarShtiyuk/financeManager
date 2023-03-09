import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryStatistic } from './dto/query.dto';
import { StatisticService } from './statistic.service';

@ApiTags('Statistic Module')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiOperation({ summary: 'Get all data by the specified ID(s)' })
  @ApiQuery({
    name: 'categoryIds',
    description: 'ID(s) of categories',
    required: true,
  })
  @ApiQuery({
    name: 'fromPeriod',
    description: 'From date of creation',
    required: true,
    example: '2023-03-07',
  })
  @ApiQuery({
    name: 'toPeriod',
    description: 'To date of creation',
    example: '2023-03-08',
    required: true,
  })
  @Get()
  async getStatistic(@Query() query: QueryStatistic) {
    return this.statisticService.getStatistic(query);
  }
}
