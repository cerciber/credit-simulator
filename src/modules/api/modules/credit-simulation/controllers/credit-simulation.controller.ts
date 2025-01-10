import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { statics } from '@src/common/statics/statics';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';
import { CreditSimulationService } from '../services/credit-simulation.service';
import { SimulateCreditDto } from '../dtos/simulate-credit.dto';
import {
  simulateCredit,
  simulateCreditConfig,
} from './credit-simulation-controller/simulate-credit';
import {
  getInterestRates,
  getInterestRatesConfig,
} from './credit-simulation-controller/get-interest-rates';
import {
  getInsuranceRates,
  getInsuranceRatesConfig,
} from './credit-simulation-controller/get-insurance-rates';
import { InterestRatesResponseDto } from '../dtos/interest-rates-response.dto';
import { InsuranceRatesResponseDto } from '../dtos/insurance-rates-response.dto';
import { SimulationResultResponseDto } from '../dtos/simulate-credit-respone.dto';
import {
  getValidPeriods,
  getValidPeriodsConfig,
} from './credit-simulation-controller/get-valid-periods';
import { ValidPeriodsResponseDto } from '../dtos/valid-periods-response.dto';

@ApiTags(statics.paths.creditSimulation.tag)
@Controller()
export class CreditSimulationController {
  constructor(
    private readonly creditSimulationService: CreditSimulationService,
  ) {}

  @EndpointConfig(simulateCreditConfig)
  async simulateCredit(
    @Body() simulateCreditDto: SimulateCreditDto,
  ): Promise<SimulationResultResponseDto> {
    return simulateCredit(this.creditSimulationService, simulateCreditDto);
  }

  @EndpointConfig(getInterestRatesConfig)
  getInterestRates(): InterestRatesResponseDto {
    return getInterestRates(this.creditSimulationService);
  }

  @EndpointConfig(getInsuranceRatesConfig)
  getInsuranceRates(): InsuranceRatesResponseDto {
    return getInsuranceRates(this.creditSimulationService);
  }

  @EndpointConfig(getValidPeriodsConfig)
  async getValidPeriods(
    @Body() simulateCreditDto: SimulateCreditDto,
  ): Promise<ValidPeriodsResponseDto> {
    return getValidPeriods(this.creditSimulationService, simulateCreditDto);
  }
}
