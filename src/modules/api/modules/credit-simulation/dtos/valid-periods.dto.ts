import { IsArray, IsNumber } from 'class-validator';

export class ValidPeriodsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  periods: number[];
}
