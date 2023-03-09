import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBank {
  @ApiProperty({
    description: 'Name of bank',
    example: 'Specified Bank',
    uniqueItems: true,
  })
  @IsString({ message: 'Invalid name of bank, please write correct data!' })
  name: string;

  @ApiProperty({ description: 'Balance of bank', example: 1000 })
  @IsNumber({}, { message: 'Balance must be a number!' })
  balance: number;

  @ApiProperty({
    description: "Number of bank's card",
    example: '1234 1234 1234 1234',
    uniqueItems: true,
  })
  @IsString({ message: 'Card number must be a string!' })
  cardNumber: string;
}
