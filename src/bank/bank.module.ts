import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from './bank.controller';
import { BankEntity } from './bank.entity';
import { BankService } from './bank.service';

@Module({
  controllers: [BankController],
  providers: [BankService, Logger],
  imports: [TypeOrmModule.forFeature([BankEntity])],
})
export class BankModule {}
