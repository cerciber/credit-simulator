import { Body, Controller, HttpCode, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { statics } from '@src/common/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../services/credit-offer.service';
import {
  CreditOfferResponseDto,
  CreditOffersResponseDto,
} from '../dtos/credit-offer-response.dto';
import { CreditOfferDto } from '../dtos/credit-offer.dto';
import { IdDto } from '@src/dtos/id.dto';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';
import {
  getCreditOffersByClient,
  getCreditOffersByClientConfig,
} from './credit-offer-controller/get-credit-offers-by-client';
import {
  generateCreditOffer,
  generateCreditOfferConfig,
} from './credit-offer-controller/generate-credit-offer';
import {
  getCreditOfferById,
  getCreditOfferByIdConfig,
} from './credit-offer-controller/get-credit-offer-by-id';
import {
  disableCreditOfferById,
  disableCreditOfferByIdConfig,
} from './credit-offer-controller/disable-credit-offer-by-id';
import { Request } from 'express';
import {
  getMyCreditOffers,
  getMyCreditOffersConfig,
} from './credit-offer-controller/get-my-credit-offers';

@ApiTags(statics.paths.creditOffers.tag)
@Controller()
export class CreditOfferController {
  constructor(private readonly creditOfferService: CreditOfferService) {}

  @EndpointConfig(getCreditOffersByClientConfig)
  async getCreditOffersByClient(
    @Param() params: IdDto,
  ): Promise<CreditOffersResponseDto> {
    return getCreditOffersByClient(this.creditOfferService, params);
  }

  @HttpCode(HttpStatus.CREATED)
  @EndpointConfig(generateCreditOfferConfig)
  async generateCreditOffer(
    @Body() creditOffer: CreditOfferDto,
  ): Promise<CreditOfferResponseDto> {
    return generateCreditOffer(this.creditOfferService, creditOffer);
  }

  @EndpointConfig(getMyCreditOffersConfig)
  async getMyCreditOffers(
    @Req() request: Request,
  ): Promise<CreditOffersResponseDto> {
    return getMyCreditOffers(this.creditOfferService, request);
  }

  @EndpointConfig(getCreditOfferByIdConfig)
  async getCreditOfferById(
    @Param() params: IdDto,
  ): Promise<CreditOfferResponseDto> {
    return getCreditOfferById(this.creditOfferService, params);
  }

  @EndpointConfig(disableCreditOfferByIdConfig)
  async disableCreditOfferById(
    @Param() params: IdDto,
  ): Promise<CreditOfferResponseDto> {
    return disableCreditOfferById(this.creditOfferService, params);
  }
}
