import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateOrUpdateCategory } from './dto/create-update.dto';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateOrUpdateCategory) {
    const category = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });

    if (category) {
      throw new ConflictException(`Category: ${category.name} already exists!`);
    }

    const newCategory = new CategoryEntity();
    Object.assign(newCategory, dto);

    this.logger.log(`Category: ${newCategory.name} was successfully create!`);
    return this.categoryRepository.save(newCategory);
  }

  async getById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!category) {
      throw new NotFoundException('Category with this ID not found!');
    }

    return category;
  }

  async getAll() {
    return this.categoryRepository.find({ relations: ['transactions'] });
  }

  async update(id: string, dto: CreateOrUpdateCategory) {
    const category = await this.getById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, dto);

    this.logger.log(`Category: ${category.name} was successfully updated!`);
    return category;
  }

  async delete(id: string) {
    const category = await this.getById(id);

    if (category.transactions.length) {
      throw new ConflictException(
        'This object cannot be deleted, because a transaction was made!',
      );
    }

    this.logger.log(`Category: ${category.name} was successfully deleted!`);
    await this.categoryRepository.delete(id);
  }
}
