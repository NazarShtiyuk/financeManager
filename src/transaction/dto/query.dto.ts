import { IsOptional } from 'class-validator';

export class QueryGetAll {
  @IsOptional()
  page?: number;

  @IsOptional()
  count?: number;
}
