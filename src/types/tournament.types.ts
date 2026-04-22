export type TournamentType = 'single' | 'double' | 'round_robin';
export type TournamentStatus = 'registration' | 'active' | 'finished';

export interface Tournament {
  id: number;
  game_id: number;
  creator_id?: number;
  creator_name?: string;
  game_name?: string;
  name: string;
  description?: string;
  type: TournamentType;
  status: TournamentStatus;
  max_participants: number;
  current_participants?: number;
  rules?: string;
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface CreateTournamentPayload {
  game_id: number;
  name: string;
  description?: string;
  type: TournamentType;
  max_participants: number;
  rules?: string;
  start_date: string;
  end_date?: string;
}