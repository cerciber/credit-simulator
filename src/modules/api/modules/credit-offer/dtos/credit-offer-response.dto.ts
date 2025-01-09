import { BodyResponseDto } from '@src/dtos/body-response.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { CreditOfferIdDto } from './credit-offer.dto';
import { Type } from 'class-transformer';

export class CreditOfferResponseDto extends BodyResponseDto {
  @ValidateNested()
  @Type(() => CreditOfferIdDto)
  body: CreditOfferIdDto = new CreditOfferIdDto();
}

export class CreditOffersResponseDto extends BodyResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditOfferIdDto)
  body: CreditOfferIdDto[] = [];
}
