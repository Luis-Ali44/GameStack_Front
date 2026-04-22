import { api } from '@/lib/api';
import { CreateTournamentPayload, Tournament } from '@/types/tournament.types';

interface CreateTournamentResponse {
  message: string;
  tournament: Tournament;
}

interface JoinResponse {
  message: string;
}

interface BracketResponse {
  message: string;
  total_matches_created: number;
}

export const tournamentsService = {
  create: (payload: CreateTournamentPayload): Promise<CreateTournamentResponse> =>
    api.post<CreateTournamentResponse>('/api/v1/tournaments', payload, true),

  join: (tournamentId: number): Promise<JoinResponse> =>
    api.post<JoinResponse>(`/api/v1/tournaments/${tournamentId}/join`, {}, true),

  generateBracket: (tournamentId: number): Promise<BracketResponse> =>
    api.post<BracketResponse>(`/api/v1/tournaments/${tournamentId}/generate-bracket`, {}, true),
};