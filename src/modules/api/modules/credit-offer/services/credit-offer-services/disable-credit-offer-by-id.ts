import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferIdDto } from '../../dtos/credit-offer.dto';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';

async function findAndDisableOffer(
  creditOfferModel: Model<CreditOffer>,
  _id: string,
): Promise<CreditOffer | null> {
  return creditOfferModel
    .findByIdAndUpdate(
      _id,
      { status: statics.constants.creditOffer.statuses.inactive },
      { new: true },
    )
    .exec();
}

async function notOfferError(): Promise<ResponseError> {
  return new ResponseError({
    status: HttpStatus.NOT_FOUND,
    code: statics.codes.noDataFound.code,
    message: statics.codes.noDataFound.message,
    detail: statics.messages.creditOffers.notFound,
  });
}

function modelToDto(creditOffer: CreditOffer): CreditOfferIdDto {
  return {
    _id: creditOffer._id.toString(),
    account: creditOffer.account.toString(),
    amount: creditOffer.amount,
    interestRate: creditOffer.interestRate,
    status: creditOffer.status,
    period: creditOffer.period,
    insurancePercentage: creditOffer.insurancePercentage,
  };
}

export async function disableCreditOfferById(
  creditOfferModel: Model<CreditOffer>,
  _id: string,
): Promise<CreditOfferIdDto> {
  const creditOffer = await findAndDisableOffer(creditOfferModel, _id);
  if (!creditOffer) throw await notOfferError();
  return modelToDto(creditOffer);
}
