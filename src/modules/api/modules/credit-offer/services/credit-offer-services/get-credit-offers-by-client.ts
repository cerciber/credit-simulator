import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { CreditOfferIdDto } from '../../dtos/credit-offer.dto';
import { Model } from 'mongoose';

async function findAllByClientId(
  creditOfferModel: Model<CreditOffer>,
  accountId: string,
): Promise<CreditOffer[]> {
  return creditOfferModel.find({ account: accountId }).exec();
}

async function modelToDto(
  creditOffers: CreditOffer[],
): Promise<CreditOfferIdDto[]> {
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

export async function getCreditOffersByClient(
  creditOfferModel: Model<CreditOffer>,
  accountId: string,
): Promise<CreditOfferIdDto[]> {
  const creditOffers = await findAllByClientId(creditOfferModel, accountId);
  return modelToDto(creditOffers);
}
