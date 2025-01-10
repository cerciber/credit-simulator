import { Module } from '@nestjs/common';
import { AccountsModule } from '@src/modules/api/modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CreditOfferModule } from './modules/credit-offer/credit-offer.module';
import { CreditSimulationModule } from './modules/credit-simulation/credit-simulation.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    CreditOfferModule,
    CreditSimulationModule,
  ],
  controllers: [],
})
export class ApiModule {}
