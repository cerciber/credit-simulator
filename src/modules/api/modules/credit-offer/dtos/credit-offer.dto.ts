import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsIn,
  Min,
  Max,
} from 'class-validator';
import { statics } from '@src/common/statics/statics';

export const CreditOfferNames = {
  id: 'id',
  _id: '_id',
  account: 'account',
  amount: 'amount',
  interestRate: 'interestRate',
  status: 'status',
  period: 'period',
  insurancePercentage: 'insurancePercentage',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export class CreditOfferIdDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsMongoId()
  @IsNotEmpty()
  account: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  interestRate: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(statics.constants.creditOffer.statuses))
  status: string;

  @IsNumber()
  @IsNotEmpty()
  @IsIn(Object.values(statics.constants.creditOffer.periods))
  period: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  insurancePercentage: number;
}

export class CreditOfferDto extends OmitType(CreditOfferIdDto, [
  CreditOfferNames._id,
]) {}

export class PartialCreditOfferDto extends PartialType(CreditOfferDto) {}
