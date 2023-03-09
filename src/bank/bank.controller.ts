import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { CreateBank } from './dto/create.dto';
import { UpdateBank } from './dto/update.dto';

@ApiTags('Bank Module')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @ApiOperation({ summary: 'Creates a bank based on the transferred data' })
  @Post('create')
  async create(@Body() dto: CreateBank) {
    return this.bankService.create(dto);
  }

  @ApiOperation({ summary: 'Get one bank by the specified ID' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bankService.getById(id);
  }

  @ApiOperation({ summary: 'Get all banks from this API' })
  @Get()
  async getAll() {
    return this.bankService.getAll();
  }

  @ApiOperation({ summary: 'Updatea a bank by the specified ID' })
  @Patch(':id')
  async update(@Body() dto: UpdateBank, @Param('id') id: string) {
    return this.bankService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletes a bank based on the transferred ID' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bankService.delete(id);
  }
}
