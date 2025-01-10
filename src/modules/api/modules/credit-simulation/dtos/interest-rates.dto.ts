import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RateRangeDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @IsNumber()
  rate: number;
}

export class ProfileRatesDto {
  @IsString()
  profile: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RateRangeDto)
  rates: RateRangeDto[];
}

export class InterestRatesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileRatesDto)
  profiles: ProfileRatesDto[];
}
