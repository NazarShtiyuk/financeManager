import { TransactionEntity } from 'src/transaction/transaction.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'banks' })
export class BankEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ unique: true })
  cardNumber: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
  @JoinTable()
  transactions: TransactionEntity[];
}
