import { HttpStatus } from '@nestjs/common';
import { CreditSimulationService } from '../../services/credit-simulation.service';
import { statics } from '@src/common/statics/statics';
import { InsuranceRatesResponseDto } from '../../dtos/insurance-rates-response.dto';

export const getInsuranceRatesConfig = {
  path: statics.paths.creditSimulation.subpaths
    .creditSimulationGetInsuranceRates,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: InsuranceRatesResponseDto,
    },
  ],
};

export function getInsuranceRates(
  creditSimulationService: CreditSimulationService,
): InsuranceRatesResponseDto {
  const rates = creditSimulationService.getInsuranceRates();
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditSimulation.getInsuranceRates,
    body: rates,
  };
}
