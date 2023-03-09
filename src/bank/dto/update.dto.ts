import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateBank {
  @ApiProperty({
    required: false,
    description: 'Name of bank',
    example: 'Specified Bank',
    uniqueItems: true,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Balance of bank',
    example: 1000,
  })
  @IsOptional()
  balance?: number;

  @ApiProperty({
    required: false,
    description: "Number of bank's card",
    example: '1234 1234 1234 1234',
    uniqueItems: true,
  })
  @IsOptional()
  cardNumber?: string;
}
