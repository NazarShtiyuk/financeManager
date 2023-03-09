import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankEntity } from './bank.entity';
import { CreateBank } from './dto/create.dto';
import { UpdateBank } from './dto/update.dto';

@Injectable()
export class BankService {
  private readonly logger: Logger = new Logger(BankService.name);

  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
  ) {}

  async create(dto: CreateBank) {
    const bank = await this.bankRepository.findOne({
      where: { name: dto.name },
    });

    if (bank) {
      throw new ConflictException(`Bank: ${bank.name} already exists!`);
    }

    const newBank = new BankEntity();
    Object.assign(newBank, dto);

    this.logger.log(`Bank: ${dto.name} was successfully created`);
    return this.bankRepository.save(newBank);
  }

  async getById(id: string) {
    const bank = await this.bankRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!bank) {
      throw new NotFoundException('Bank with this ID not found!');
    }

    return bank;
  }

  async getAll() {
    return this.bankRepository.find();
  }

  async update(id: string, dto: UpdateBank) {
    const bank = await this.getById(id);

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    Object.assign(bank, dto);

    this.logger.log(`Bank: ${bank.name} was successfully updated!`);
    return await this.bankRepository.save(bank);
  }

  async delete(id: string) {
    const bank = await this.getById(id);

    if (bank.transactions.length) {
      throw new ConflictException(
        'This object cannot be deleted, because a transaction(s) was made!',
      );
    }

    this.logger.log(`Bank: ${bank.name} was successfully deleted!`);
    await this.bankRepository.delete(id);
  }
}
