import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AccountInfoSimulationDto {
  @IsString()
  @IsNotEmpty()
  profile: string;

  @IsNumber()
  @IsNotEmpty()
  debtCapacityPercentage: number;

  @IsNumber()
  @IsNotEmpty()
  monthlyNetIncome: number;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;
}

export class SimulationResultDto {
  @IsNumber()
  @IsNotEmpty()
  monthlyPayment: number;

  @IsNumber()
  @IsNotEmpty()
  totalPayment: number;

  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @IsNumber()
  @IsNotEmpty()
  insurancePercentage: number;

  @IsNumber()
  @IsNotEmpty()
  period: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  @IsNotEmpty()
  eligible: boolean;

  @ValidateNested()
  @Type(() => AccountInfoSimulationDto)
  accountInfo: AccountInfoSimulationDto;

  @IsNumber()
  @IsNotEmpty()
  currentDebtPayment: number;
}
