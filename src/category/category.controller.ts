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
import { CategoryService } from './category.service';
import { CreateOrUpdateCategory } from './dto/create-update.dto';

@ApiTags('Category Module')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Creates a category based on the transferred data' })
  @Post('create')
  async create(@Body() dto: CreateOrUpdateCategory) {
    return this.categoryService.create(dto);
  }

  @ApiOperation({ summary: 'Get one category by the specified ID' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @ApiOperation({ summary: 'Get all categories from this API' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Updates a category by the specified ID' })
  @Patch(':id')
  async update(@Body() dto: CreateOrUpdateCategory, @Param('id') id: string) {
    return this.categoryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletes a category based on the tranferred ID' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
