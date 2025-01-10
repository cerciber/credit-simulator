import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { ValidPeriodsDto } from './valid-periods.dto';
import { Type } from 'class-transformer';

export class ValidPeriodsResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValidPeriodsDto)
  body: ValidPeriodsDto = new ValidPeriodsDto();
}
