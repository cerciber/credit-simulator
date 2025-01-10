import {
  InterestRatesDto,
  ProfileRatesDto,
  RateRangeDto,
} from '../../dtos/interest-rates.dto';
import { statics } from '@src/common/statics/statics';

export function getInterestRates(): InterestRatesDto {
  const profiles = Object.entries(statics.constants.profiles).map(
    ([, profile]) => {
      const rates: RateRangeDto[] = profile.rates.map((rate) => ({
        min: (rate[0] as number[])[0] ?? 0,
        max: (rate[0] as number[])[1] ?? 0,
        rate: Number(((rate[1] as number) * 100).toFixed(3)),
      }));

      return {
        profile: profile.name,
        rates,
      } as ProfileRatesDto;
    },
  );

  return { profiles };
}
