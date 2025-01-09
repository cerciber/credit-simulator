import { INestApplicationContext } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { AccountsService } from '@src/modules/api/modules/accounts/services/accounts.service';
import { AccountDto } from '@src/modules/api/modules/accounts/dtos/account.dto';
import { validateDto } from '../utils/validate-dto';

async function generateAccounData(): Promise<AccountDto[]> {
  const accounts = [];
  for (let i = 1; i <= 10; i++) {
    accounts.push({
      username: `admin_${i}`,
      password: 'ABC#abc#123',
      role: statics.constants.roles.admin,
      accountInfo: {
        name: `Admin ${i}`,
        email: `admin_${i}@example.com`,
        phone: `+57320213812${i - 1}`,
      },
    });
  }
  return accounts;
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
  const accounts = await generateAccounData();
  await validateAccountDtos(app, accounts);
  await accountsService.deleteAll();
  await accountsService.createMany(accounts);
}
