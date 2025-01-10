import { HttpStatus } from '@nestjs/common';
import { CreditSimulationService } from '../../services/credit-simulation.service';
import { statics } from '@src/common/statics/statics';
import { InterestRatesResponseDto } from '../../dtos/interest-rates-response.dto';

export const getInterestRatesConfig = {
  path: statics.paths.creditSimulation.subpaths
    .creditSimulationGetInterestRates,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: InterestRatesResponseDto,
    },
  ],
};

export function getInterestRates(
  creditSimulationService: CreditSimulationService,
): InterestRatesResponseDto {
  const rates = creditSimulationService.getInterestRates();
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditSimulation.getInterestRates,
    body: rates,
  };
}
