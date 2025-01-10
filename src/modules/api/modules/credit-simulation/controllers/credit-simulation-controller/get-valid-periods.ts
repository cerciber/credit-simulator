import { HttpStatus } from '@nestjs/common';
import { CreditSimulationService } from '../../services/credit-simulation.service';
import { statics } from '@src/common/statics/statics';
import { ValidPeriodsResponseDto } from '../../dtos/valid-periods-response.dto';
import { SimulateCreditDto } from '../../dtos/simulate-credit.dto';

export const getValidPeriodsConfig = {
  path: statics.paths.creditSimulation.subpaths.creditSimulationGetValidPeriods,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: ValidPeriodsResponseDto,
    },
  ],
};

export async function getValidPeriods(
  creditSimulationService: CreditSimulationService,
  simulateCreditDto: SimulateCreditDto,
): Promise<ValidPeriodsResponseDto> {
  const periods = await creditSimulationService.getValidPeriods(
    simulateCreditDto.accountId,
    simulateCreditDto.amount,
  );
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditSimulation.getValidPeriods,
    body: periods,
  };
}
