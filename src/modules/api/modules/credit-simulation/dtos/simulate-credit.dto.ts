import { IsString, IsNumber, Min, IsNotEmpty, IsEnum } from 'class-validator';
import { statics } from '@src/common/statics/statics';

export class SimulateCreditDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsNumber()
  @IsEnum(Object.values(statics.constants.creditOffer.periods))
  period: number;
}
