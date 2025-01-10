import { HttpStatus } from '@nestjs/common';
import { CreditOfferService } from '../../services/credit-offer.service';
import { statics } from '@src/common/statics/statics';
import { CreditOfferResponseDto } from '../../dtos/credit-offer-response.dto';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { IdDto } from '@src/dtos/id.dto';
import { Request } from 'express';
import { AccountIdNoPasswordDto } from '@src/modules/api/modules/accounts/dtos/account.dto';

export const acceptMyCreditOfferByIdConfig = {
  path: statics.paths.creditOffers.subpaths.creditOffersAcceptMy,
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

export async function acceptMyCreditOfferById(
  creditOfferService: CreditOfferService,
  params: IdDto,
  request: Request,
): Promise<CreditOfferResponseDto> {
  const account = request.res?.locals?.account as AccountIdNoPasswordDto;
  const creditOffer = await creditOfferService.acceptMyCreditOfferById(
    params._id,
    account._id,
  );
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataUpdatedSuccessfully.code,
    message: statics.codes.dataUpdatedSuccessfully.message,
    detail: statics.messages.creditOffers.acceptMy,
    body: creditOffer,
  };
}
