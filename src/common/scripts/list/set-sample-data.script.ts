import { INestApplicationContext } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';
import {
  AccountDto,
  AccountIdNoPasswordDto,
} from '@src/modules/api/modules/accounts/dtos/account.dto';
import { validateDto } from '../utils/validate-dto';
import { CreditOfferService } from '@src/modules/api/modules/credit-offer/services/credit-offer.service';
import { CreditOfferDto } from '@src/modules/api/modules/credit-offer/dtos/credit-offer.dto';

async function generateAccountData(): Promise<AccountDto[]> {
  const accounts: AccountDto[] = [];
  const profiles = Object.values(statics.constants.profiles);

  // Generate admin account
  accounts.push({
    username: 'admin',
    password: 'ABC#abc#123',
    role: statics.constants.roles.admin,
    accountInfo: {
      name: 'Administrator',
      email: 'admin@example.com',
      phone: '+573202138120',
      document: '1234567890',
      profile: statics.constants.profiles.aaa,
      debtCapacityPercentage: 10,
      monthlyNetIncome: 1000000,
      dateOfBirth: '1990-01-01',
    },
  });

  // Generate client accounts
  for (let i = 1; i <= 9; i++) {
    accounts.push({
      username: `client_${i}`,
      password: 'ABC#abc#123',
      role: statics.constants.roles.client,
      accountInfo: {
        name: `Client ${i}`,
        email: `client_${i}@example.com`,
        phone: `+57320213812${i}`,
        document: `1234567890${i}`,
        profile: profiles[i % profiles.length] as string,
        debtCapacityPercentage: 30,
        monthlyNetIncome: 2000000 + i * 500000,
        dateOfBirth: '1995-01-01',
      },
    });
  }
  return accounts;
}

async function generateCreditOfferData(
  accounts: AccountIdNoPasswordDto[],
): Promise<CreditOfferDto[]> {
  const creditOffers: CreditOfferDto[] = [];
  accounts.forEach((account) => {
    if (account.role === statics.constants.roles.client) {
      [
        {
          amount: 5000000,
          period: statics.constants.creditOffer.periods.twelveMonths,
        },
        {
          amount: 10000000,
          period: statics.constants.creditOffer.periods.twentyFourMonths,
        },
        {
          amount: 15000000,
          period: statics.constants.creditOffer.periods.thirtySixMonths,
        },
      ].forEach((offer) => {
        creditOffers.push({
          account: account._id.toString(),
          amount: offer.amount,
          interestRate: 12.5,
          status: statics.constants.creditOffer.statuses.active,
          period: offer.period,
          insurancePercentage: 2.5,
        });
      });
    }
  });

  return creditOffers;
}

async function validateCreditOfferDtos(
  app: INestApplicationContext,
  creditOffers: CreditOfferDto[],
): Promise<void> {
  for (let i = 0; i < creditOffers.length; i++) {
    await validateDto(app, creditOffers[i], CreditOfferDto);
  }
}

async function validateAccountDtos(
  app: INestApplicationContext,
  accounts: AccountDto[],
): Promise<void> {
  for (let i = 0; i < accounts.length; i++) {
    await validateDto(app, accounts[i], AccountDto);
  }
}

export default async function setSampleData(
  app: INestApplicationContext,
): Promise<void> {
  const accountsService = app.get(AccountsService);
  const accounts = await generateAccountData();
  await validateAccountDtos(app, accounts);
  await accountsService.deleteAll();
  const createdAccounts = await accountsService.createMany(accounts);

  const creditOfferService = app.get(CreditOfferService);
  const creditOffers = await generateCreditOfferData(createdAccounts);
  await validateCreditOfferDtos(app, creditOffers);
  for (const creditOffer of creditOffers) {
    await creditOfferService.generateCreditOffer(creditOffer);
  }
}
