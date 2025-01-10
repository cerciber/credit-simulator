import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InterestRatesDto } from './interest-rates.dto';

export class InterestRatesResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterestRatesDto)
  body: InterestRatesDto = new InterestRatesDto();
}
