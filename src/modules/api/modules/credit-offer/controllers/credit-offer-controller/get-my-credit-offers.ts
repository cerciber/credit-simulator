import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOffersResponseDto } from '../../dtos/credit-offer-response.dto';
import { Request } from 'express';
import { AccountIdNoPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';

export const getMyCreditOffersConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersGetMy,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: CreditOffersResponseDto,
    },
  ],
};

export async function getMyCreditOffers(
  creditOfferService: CreditOfferService,
  request: Request,
): Promise<CreditOffersResponseDto> {
  const account = request.res?.locals?.account as AccountIdNoPasswordDto;
  const creditOffers = await creditOfferService.getMyCreditOffers(account._id);
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditOffers.getMy,
    body: creditOffers,
  };
}
