import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InsuranceRateDto {
  @IsNumber()
  minAge: number;

  @IsNumber()
  maxAge: number;

  @IsNumber()
  percentage: number;
}

export class InsuranceRatesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InsuranceRateDto)
  rates: InsuranceRateDto[];
}
