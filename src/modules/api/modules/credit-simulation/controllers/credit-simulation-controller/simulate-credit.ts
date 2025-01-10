import { HttpStatus } from '@nestjs/common';
import { CreditSimulationService } from '../../services/credit-simulation.service';
import { statics } from '@src/common/statics/statics';
import { SimulateCreditDto } from '../../dtos/simulate-credit.dto';
import { SimulationResultResponseDto } from '../../dtos/simulate-credit-respone.dto';

export const simulateCreditConfig = {
  path: statics.paths.creditSimulation.subpaths.creditSimulationSimulate,
  apiResponses: [
    {
      status: HttpStatus.OK,
      type: SimulationResultResponseDto,
    },
  ],
};

export async function simulateCredit(
  creditSimulationService: CreditSimulationService,
  simulateCreditDto: SimulateCreditDto,
): Promise<SimulationResultResponseDto> {
  const simulation =
    await creditSimulationService.simulateCredit(simulateCreditDto);
  return {
    status: HttpStatus.OK,
    code: statics.codes.dataRetrievedSuccessfully.code,
    message: statics.codes.dataRetrievedSuccessfully.message,
    detail: statics.messages.creditSimulation.simulate,
    body: simulation,
  };
}
