import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { SimulationResultDto } from './simulate-credit-result.dto';
import { Type } from 'class-transformer';

export class SimulationResultResponseDto extends BodyResponseDto {
  @ValidateNested()
  @Type(() => SimulationResultDto)
  body: SimulationResultDto = new SimulationResultDto();
}

export class SimulationResultsResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SimulationResultDto)
  body: SimulationResultDto[] = [];
}
