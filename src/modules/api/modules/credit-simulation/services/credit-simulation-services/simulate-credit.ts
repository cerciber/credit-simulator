import { Model } from 'mongoose';
import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { AccountInfo } from '@src/modules/mongo/schemas/account-info.schema';
import { SimulateCreditDto } from '../../dtos/simulate-credit.dto';
import { SimulationResultDto } from '../../dtos/simulate-credit-result.dto';
import { ResponseError } from '@src/common/exceptions/response-error';
import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';

async function getAccountInfo(
  accountModel: Model<Account>,
  accountId: string,
): Promise<AccountInfo> {
  const account = await accountModel
    .findById(accountId)
    .populate('accountInfo')
    .exec();

  if (!account?.accountInfo) {
    throw new ResponseError({
      status: HttpStatus.NOT_FOUND,
      code: statics.codes.noDataFound.code,
      message: statics.codes.noDataFound.message,
      detail: statics.messages.accounts.notFound,
    });
  }

  return account.accountInfo as AccountInfo;
}

async function getCurrentDebtPayment(
  creditOfferModel: Model<CreditOffer>,
  accountId: string,
): Promise<number> {
  const disbursedOffers = await creditOfferModel
    .find({
      account: accountId,
      status: statics.constants.creditOffer.statuses.disbursed,
    })
    .exec();

  return disbursedOffers.reduce((total, offer) => {
    const monthlyInterestRate = offer.interestRate / 100 / 12;
    const monthlyInsuranceRate = offer.insurancePercentage / 100 / 12;
    const totalMonthlyRate = monthlyInterestRate + monthlyInsuranceRate;
    const monthlyPayment =
      (offer.amount *
        totalMonthlyRate *
        Math.pow(1 + totalMonthlyRate, offer.period)) /
      (Math.pow(1 + totalMonthlyRate, offer.period) - 1);
    return total + monthlyPayment;
  }, 0);
}

function getInterestRateByProfile(profile: string, amount: number): number {
  const profileData =
    statics.constants.profiles[
      profile.toLowerCase() as keyof typeof statics.constants.profiles
    ];

  if (!profileData) {
    throw new ResponseError({
      status: HttpStatus.BAD_REQUEST,
      code: statics.codes.badRequest.code,
      message: statics.codes.badRequest.message,
      detail: statics.messages.creditOffers.invalidProfile,
    });
  }

  for (const rate of profileData.rates) {
    const [range] = rate;
    const [min, max] = range as [number, number];
    if (amount >= min && amount < max) {
      return (rate[1] as number) * 100;
    }
  }

  throw new ResponseError({
    status: HttpStatus.BAD_REQUEST,
    code: statics.codes.badRequest.code,
    message: statics.codes.badRequest.message,
    detail: statics.messages.creditOffers.invalidAmount,
  });
}

function getInsurancePercentageByAge(dateOfBirth: string): number {
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  for (const insurance of statics.constants.insuranceByAge) {
    const [minAge, maxAge] = insurance[0] as [number, number];
    if (age >= minAge && age <= maxAge) {
      return insurance[1] as number;
    }
  }
  throw new ResponseError({
    status: HttpStatus.BAD_REQUEST,
    code: statics.codes.badRequest.code,
    message: statics.codes.badRequest.message,
    detail: statics.messages.creditOffers.invalidInsurance,
  });
}

function calculateMonthlyPayment(
  amount: number,
  interestRate: number,
  insurancePercentage: number,
  months: number,
): number {
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyInsuranceRate = insurancePercentage / 100 / 12;
  const totalMonthlyRate = monthlyInterestRate + monthlyInsuranceRate;

  return (
    (amount * totalMonthlyRate * Math.pow(1 + totalMonthlyRate, months)) /
    (Math.pow(1 + totalMonthlyRate, months) - 1)
  );
}

function isEligible(
  monthlyPayment: number,
  monthlyNetIncome: number,
  debtCapacityPercentage: number,
  currentDebtPayment: number,
): boolean {
  const maxMonthlyPayment = (monthlyNetIncome * debtCapacityPercentage) / 100;
  return monthlyPayment + currentDebtPayment <= maxMonthlyPayment;
}

export async function simulateCredit(
  creditOfferModel: Model<CreditOffer>,
  accountModel: Model<Account>,
  simulateCreditDto: SimulateCreditDto,
): Promise<SimulationResultDto> {
  const accountInfo = await getAccountInfo(
    accountModel,
    simulateCreditDto.accountId,
  );

  const currentDebtPayment = await getCurrentDebtPayment(
    creditOfferModel,
    simulateCreditDto.accountId,
  );

  const months = simulateCreditDto.period;
  const interestRate = getInterestRateByProfile(
    accountInfo.profile,
    simulateCreditDto.amount,
  );
  const insurancePercentage = getInsurancePercentageByAge(
    accountInfo.dateOfBirth,
  );

  const monthlyPayment = calculateMonthlyPayment(
    simulateCreditDto.amount,
    interestRate,
    insurancePercentage,
    months,
  );

  const eligible = isEligible(
    monthlyPayment,
    accountInfo.monthlyNetIncome,
    accountInfo.debtCapacityPercentage,
    currentDebtPayment,
  );

  return {
    monthlyPayment,
    totalPayment: monthlyPayment * months,
    interestRate,
    insurancePercentage,
    period: simulateCreditDto.period,
    amount: simulateCreditDto.amount,
    eligible,
    accountInfo: {
      profile: accountInfo.profile,
      debtCapacityPercentage: accountInfo.debtCapacityPercentage,
      monthlyNetIncome: accountInfo.monthlyNetIncome,
      dateOfBirth: accountInfo.dateOfBirth,
    },
    currentDebtPayment,
  };
}
