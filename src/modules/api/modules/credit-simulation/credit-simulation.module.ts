import { Module } from '@nestjs/common';
import { MongoModule } from '@src/modules/mongo/mongo.module';
import { CreditSimulationController } from './controllers/credit-simulation.controller';
import { CreditSimulationService } from './services/credit-simulation.service';

@Module({
  imports: [MongoModule],
  controllers: [CreditSimulationController],
  providers: [CreditSimulationService],
})
export class CreditSimulationModule {}
