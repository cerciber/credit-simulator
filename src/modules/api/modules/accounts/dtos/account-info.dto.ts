import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { statics } from '@src/common/statics/statics';

const AccountInfoNames = {
  _id: '_id',
  account: 'account',
} as const;

export class AccountInfoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsMongoId()
  @IsNotEmpty()
  account: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @MinLength(1)
  document: string;

  @IsString()
  @MinLength(1)
  @IsEnum(statics.constants.profiles)
  profile: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  debtCapacityPercentage: number;

  @IsNumber()
  @Min(0)
  monthlyNetIncome: number;

  @IsString()
  dateOfBirth: string;
}

class AccountInfoDto extends OmitType(AccountInfoIdDto, [
  AccountInfoNames._id,
]) {}

export class AccountInfoNoAccountDto extends OmitType(AccountInfoDto, [
  AccountInfoNames.account,
]) {}

export class PartialAccountInfoNoAccountDto extends PartialType(
  AccountInfoNoAccountDto,
) {}
