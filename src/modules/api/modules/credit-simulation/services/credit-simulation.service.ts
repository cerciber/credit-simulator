import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditOffer } from '@src/modules/mongo/schemas/credit-offer.schema';
import { Account } from '@src/modules/mongo/schemas/account.schema';
import { SimulateCreditDto } from '../dtos/simulate-credit.dto';
import { SimulationResultDto } from '../dtos/simulate-credit-result.dto';
import { simulateCredit } from './credit-simulation-services/simulate-credit';

@Injectable()
export class CreditSimulationService {
  constructor(
    @InjectModel(CreditOffer.name) private creditOfferModel: Model<CreditOffer>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async simulateCredit(
    simulateCreditDto: SimulateCreditDto,
  ): Promise<SimulationResultDto> {
    return simulateCredit(
      this.creditOfferModel,
      this.accountModel,
      simulateCreditDto,
    );
  }
}
