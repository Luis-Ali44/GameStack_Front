import { api } from '@/lib/api';
import { CreateTipPayload, Tip } from '@/types/tip.types';

interface CreateTipResponse {
  message: string;
  tip: Tip;
}

interface LikeResponse {
  message: string;
  action: 'liked' | 'unliked';
}

export const tipsService = {
  create: (payload: CreateTipPayload): Promise<CreateTipResponse> =>
    api.post<CreateTipResponse>('/api/v1/tips', payload, true),

  toggleLike: (tipId: number): Promise<LikeResponse> =>
    api.post<LikeResponse>(`/api/v1/tips/${tipId}/likes`, {}, true),
};