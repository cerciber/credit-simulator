import { Module } from '@nestjs/common';
import { MongoModule } from '@src/modules/mongo/mongo.module';
import { CreditOfferController } from './controllers/credit-offer.controller';
import { CreditOfferService } from './services/credit-offer.service';

@Module({
  imports: [MongoModule],
  controllers: [CreditOfferController],
  providers: [CreditOfferService],
})
export class CreditOfferModule {}
