import { Model } from 'mongoose';
import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { ValidPeriodsDto } from '../../dtos/valid-periods.dto';
import { statics } from '@src/common/statics/statics';
import { simulateCredit } from './simulate-credit';

export async function getValidPeriods(
  creditOfferModel: Model<CreditOffer>,
  accountModel: Model<Account>,
  accountId: string,
  amount: number,
): Promise<ValidPeriodsDto> {
  const periods = Object.values(statics.constants.creditOffer.periods);
  const validPeriods = await Promise.all(
    periods.map(async (period) => {
      const simulation = await simulateCredit(creditOfferModel, accountModel, {
        accountId,
        amount,
        period,
      });
      return simulation.eligible ? period : null;
    }),
  );

  return {
    periods: validPeriods.filter((period): period is number => period !== null),
  };
}
