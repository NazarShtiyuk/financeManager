import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrUpdateCategory {
  @ApiProperty({
    required: true,
    description: 'Name of category',
    example: 'Product',
  })
  @IsString({ message: 'Invalid name, please write correct data!' })
  name: string;
}
