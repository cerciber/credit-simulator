import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferDto, CreditOfferIdDto } from '../../dtos/credit-offer.dto';
import { Model } from 'mongoose';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { replacePlaceholders } from '@src/common/utils/replace-placeholders';

async function save(
  creditOfferModel: Model<CreditOffer>,
  createCreditOfferDto: CreditOfferDto,
): Promise<CreditOffer> {
  const creditOffer = new creditOfferModel({
    ...createCreditOfferDto,
    status: statics.constants.creditOffer.statuses.active,
  });
  return creditOffer.save();
}

async function modelToDto(
  createdCreditOffer: CreditOffer,
): Promise<CreditOfferIdDto> {
  return {
    _id: createdCreditOffer._id.toString(),
    account: createdCreditOffer.account.toString(),
    amount: createdCreditOffer.amount,
    interestRate: createdCreditOffer.interestRate,
    status: createdCreditOffer.status,
    period: createdCreditOffer.period,
    insurancePercentage: createdCreditOffer.insurancePercentage,
  };
}

async function isConflictError(error: any): Promise<boolean> {
  return error.code === 11000;
}

async function throwConflictError(error: any): Promise<void> {
  throw new ResponseError({
    status: HttpStatus.CONFLICT,
    code: statics.codes.conflictRequest.code,
    message: statics.codes.conflictRequest.message,
    detail: replacePlaceholders(statics.messages.default.dataAlreadyExists, [
      Object.keys(error.keyValue)[0] || '',
    ]),
  });
}

export async function generateCreditOffer(
  creditOfferModel: Model<CreditOffer>,
  createCreditOfferDto: CreditOfferDto,
): Promise<CreditOfferIdDto> {
  try {
    const createdCreditOffer = await save(
      creditOfferModel,
      createCreditOfferDto,
    );
    return modelToDto(createdCreditOffer);
  } catch (error) {
    if (await isConflictError(error)) await throwConflictError(error);
    throw error;
  }
}
