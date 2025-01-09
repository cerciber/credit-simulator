import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOfferResponseDto } from '../../dtos/credit-offer-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { IdDto } from '@src/dtos/id.dto';

export const disableCreditOfferByIdConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersDisableById,
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

export async function disableCreditOfferById(
  creditOfferService: CreditOfferService,
  params: IdDto,
): Promise<CreditOfferResponseDto> {
  const creditOffer = await creditOfferService.disableCreditOfferById(
    params._id,
  );
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataUpdatedSuccessfully.code,
    message: statics.codes.dataUpdatedSuccessfully.message,
    detail: statics.messages.creditOffers.disableById,
    body: creditOffer,
  };
}
