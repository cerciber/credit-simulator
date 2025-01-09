import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOfferResponseDto } from '../../dtos/credit-offer-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { IdDto } from '@src/dtos/id.dto';

export const getCreditOfferByIdConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersGetById,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: CreditOfferResponseDto,
    },
    {
      status: HttpStatus.NOT_FOUND,
      type: ErrorResponseDto,
    },
  ],
};

export async function getCreditOfferById(
  creditOfferService: CreditOfferService,
  params: IdDto,
): Promise<CreditOfferResponseDto> {
  const creditOffer = await creditOfferService.getCreditOfferById(params._id);
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditOffers.getById,
    body: creditOffer,
  };
}
