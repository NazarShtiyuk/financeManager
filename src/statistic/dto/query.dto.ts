import { IsArray, IsString } from 'class-validator';

export class QueryStatistic {
  @IsArray()
  categoryIds: string[];

  @IsString()
  fromPeriod: Date;

  @IsString()
  toPeriod: Date;
}
