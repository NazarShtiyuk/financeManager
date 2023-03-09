import { Exclude } from 'class-transformer';
import { TransactionEntity } from 'src/transaction/transaction.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Exclude()
  @ManyToMany(
    () => TransactionEntity,
    (transactions) => transactions.categories,
  )
  @JoinTable()
  transactions: TransactionEntity[];
}
