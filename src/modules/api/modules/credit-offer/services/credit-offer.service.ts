import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferDto, CreditOfferIdDto } from '../dtos/credit-offer.dto';
import { generateCreditOffer } from './credit-offer-services/generate-credit-offer';
import { getCreditOffersByClient } from './credit-offer-services/get-credit-offers-by-client';

@Injectable()
export class CreditOfferService {
  constructor(
    @InjectModel(CreditOffer.name) private creditOfferModel: Model<CreditOffer>,
  ) {}

  async getCreditOffersByClient(
    accountId: string,
  ): Promise<CreditOfferIdDto[]> {
    return getCreditOffersByClient(this.creditOfferModel, accountId);
  }

  async generateCreditOffer(
    createCreditOfferDto: CreditOfferDto,
  ): Promise<CreditOfferIdDto> {
    return generateCreditOffer(this.creditOfferModel, createCreditOfferDto);
  }
}
