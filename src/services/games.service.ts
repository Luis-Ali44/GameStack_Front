import { api } from '@/lib/api';
import { CreateGamePayload, Game, RAWGGame } from '@/types/game.types';

interface SearchResponse {
  message: string;
  results: RAWGGame[];
}

interface CreateGameResponse {
  message: string;
  game?: Game;
  gameId?: number;
}

export const gamesService = {
  search: (query: string): Promise<SearchResponse> =>
    api.get<SearchResponse>(`/api/v1/games/search?q=${encodeURIComponent(query)}`, true),

  create: (payload: CreateGamePayload): Promise<CreateGameResponse> =>
    api.post<CreateGameResponse>('/api/v1/games', payload, true),
};