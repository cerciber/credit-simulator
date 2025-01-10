import {
  InsuranceRatesDto,
  InsuranceRateDto,
} from '../../dtos/insurance-rates.dto';
import { statics } from '@src/common/statics/statics';

export function getInsuranceRates(): InsuranceRatesDto {
  const rates: InsuranceRateDto[] = statics.constants.insuranceByAge.map(
    (insurance) => ({
      minAge: (insurance[0] as number[])[0] ?? 0,
      maxAge: (insurance[0] as number[])[1] ?? 0,
      percentage: (insurance[1] as number) * 100,
    }),
  );

  return { rates };
}
