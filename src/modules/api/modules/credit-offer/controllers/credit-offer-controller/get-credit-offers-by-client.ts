import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOffersResponseDto } from '../../dtos/credit-offer-response.dto';
import { IdDto } from '@src/dtos/id.dto';

export const getCreditOffersByClientConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersGetByClient,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: CreditOffersResponseDto,
    },
  ],
};

export async function getCreditOffersByClient(
  creditOfferService: CreditOfferService,
  params: IdDto,
): Promise<CreditOffersResponseDto> {
  const creditOffers = await creditOfferService.getCreditOffersByClient(
    params._id,
  );
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditOffers.getByClient,
    body: creditOffers,
  };
}
