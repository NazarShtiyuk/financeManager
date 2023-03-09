import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTransaction } from './dto/create.dto';
import { QueryGetAll } from './dto/query.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction Module')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'Creates a transaction based on the transferred data',
  })
  @Post('create')
  async create(@Body() dto: CreateTransaction) {
    return this.transactionService.create(dto);
  }

  @ApiOperation({ summary: 'Get all transactions from this API' })
  @ApiQuery({
    name: 'page',
    description: 'Page of transactions',
    required: false,
    example: 2,
  })
  @ApiQuery({
    name: 'count',
    description: 'Count of transactions',
    required: false,
    example: 10,
  })
  @Get()
  async getAll(@Query() query: QueryGetAll) {
    return this.transactionService.getAll(query);
  }

  @ApiOperation({ summary: 'Deletes a transaction based on ID' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.transactionService.delete(id);
  }
}
