import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class CreateTransaction {
  @ApiProperty({ description: 'Amount of transaction', example: 250 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Type of transaction',
    example: 'profitable',
    examples: ['profitable', 'consumable'],
    required: true,
  })
  @IsEnum(TransactionType, {
    message: 'Invalid type!(profitable or consumable)',
  })
  type: TransactionType;

  @ApiProperty({
    description: 'Description of transaction',
    example: 'Bought some fruits',
  })
  @IsString({ message: 'Description must be a string!' })
  description: string;

  @ApiProperty({
    description: 'Bank of transaction',
    example: 'Specified Bank',
    required: true,
  })
  @IsString({ message: 'Bank must be a string!' })
  bank: string;

  @ApiProperty({
    description: 'Category(s) of transaction',
    example: ['Product'],
    required: true,
  })
  @IsArray({ message: 'Categories must be array with string!' })
  categories: string[];
}
