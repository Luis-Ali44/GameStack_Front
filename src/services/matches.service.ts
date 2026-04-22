import { api } from '@/lib/api';
import { CreateMatchPayload, Match } from '@/types/match.types';

interface MatchesResponse {
  message: string;
  matches: Match[];
}

interface CreateMatchResponse {
  message: string;
  match: Match;
}

export const matchesService = {
  getAll: (): Promise<MatchesResponse> =>
    api.get<MatchesResponse>('/api/v1/matches'),

  create: (payload: CreateMatchPayload): Promise<CreateMatchResponse> =>
    api.post<CreateMatchResponse>('/api/v1/matches', payload, true),
};