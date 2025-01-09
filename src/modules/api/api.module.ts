import { Module } from '@nestjs/common';
import { AccountsModule } from '@src/modules/api/modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CreditOfferModule } from './modules/credit-offer/credit-offer.module';

@Module({
  imports: [AuthModule, AccountsModule, CreditOfferModule],
  controllers: [],
})
export class ApiModule {}
