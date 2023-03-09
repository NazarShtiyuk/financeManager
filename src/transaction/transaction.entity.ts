import { Exclude } from 'class-transformer';
import { BankEntity } from 'src/bank/bank.entity';
import { CategoryEntity } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionType {
  Profitable = 'profitable',
  Consumable = 'consumable',
}

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ enum: TransactionType })
  type: TransactionType;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Exclude()
  @ManyToOne(() => BankEntity, (bank) => bank.transactions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  bank: BankEntity;

  @ManyToMany(() => CategoryEntity, (categories) => categories.transactions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: CategoryEntity[];
}
