import { api } from '@/lib/api';
import { PeriodType, RankingResponse } from '@/types/ranking.types';

export const rankingsService = {
  get: (gameId: number, periodType: PeriodType): Promise<RankingResponse> =>
    api.get<RankingResponse>(`/api/v1/rankings?game_id=${gameId}&period_type=${periodType}`),
};