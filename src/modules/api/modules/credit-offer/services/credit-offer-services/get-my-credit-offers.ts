import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferIdDto } from '../../dtos/credit-offer.dto';
import { Model } from 'mongoose';

async function findAllMyOffers(
  creditOfferModel: Model<CreditOffer>,
  accountId: string,
): Promise<CreditOffer[]> {
  return creditOfferModel.find({ account: accountId }).exec();
}

function modelToDto(creditOffers: CreditOffer[]): CreditOfferIdDto[] {
  return creditOffers.map((creditOffer: CreditOffer) => ({
    _id: creditOffer._id.toString(),
    account: creditOffer.account.toString(),
    amount: creditOffer.amount,
    interestRate: creditOffer.interestRate,
    status: creditOffer.status,
    period: creditOffer.period,
    insurancePercentage: creditOffer.insurancePercentage,
  }));
}

export async function getMyCreditOffers(
  creditOfferModel: Model<CreditOffer>,
  accountId: string,
): Promise<CreditOfferIdDto[]> {
  const creditOffers = await findAllMyOffers(creditOfferModel, accountId);
  return modelToDto(creditOffers);
}
