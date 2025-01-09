import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOfferResponseDto } from '../../dtos/credit-offer-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { CreditOfferDto } from '../../dtos/credit-offer.dto';

export const generateCreditOfferConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersGenerate,
  apiResponses: [
    {
      status: HttpStatus.CREATED,
      type: CreditOfferResponseDto,
    },
    {
      status: HttpStatus.BAD_REQUEST,
      type: ErrorResponseDto,
    },
    {
      status: HttpStatus.CONFLICT,
      type: ErrorResponseDto,
    },
  ],
};

export async function generateCreditOffer(
  creditOfferService: CreditOfferService,
  creditOffer: CreditOfferDto,
): Promise<CreditOfferResponseDto> {
  const createdCreditOffer =
    await creditOfferService.generateCreditOffer(creditOffer);
  return {
    status: HttpStatus.CREATED,
    code: statics.codes.dataSavedSuccessfully.code,
    message: statics.codes.dataSavedSuccessfully.message,
    detail: statics.messages.creditOffers.generate,
    body: createdCreditOffer,
  };
}
