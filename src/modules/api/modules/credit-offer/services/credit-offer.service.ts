import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferDto, CreditOfferIdDto } from '../dtos/credit-offer.dto';
import { generateCreditOffer } from './credit-offer-services/generate-credit-offer';
import { getCreditOffersByClient } from './credit-offer-services/get-credit-offers-by-client';
import { getCreditOfferById } from './credit-offer-services/get-credit-offer-by-id';
import { disableCreditOfferById } from './credit-offer-services/disable-credit-offer-by-id';

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

  async getCreditOfferById(_id: string): Promise<CreditOfferIdDto> {
    return getCreditOfferById(this.creditOfferModel, _id);
  }

  async disableCreditOfferById(_id: string): Promise<CreditOfferIdDto> {
    return disableCreditOfferById(this.creditOfferModel, _id);
  }
}
