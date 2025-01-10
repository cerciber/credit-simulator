import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { InsuranceRatesDto } from './insurance-rates.dto';
import { Type } from 'class-transformer';

export class InsuranceRatesResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InsuranceRatesDto)
  body: InsuranceRatesDto = new InsuranceRatesDto();
}
