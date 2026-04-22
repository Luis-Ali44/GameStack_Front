import { api } from '@/lib/api';
import { CreateTipPayload, Tip } from '@/types/tip.types';

interface TipsResponse {
  message: string;
  tips: Tip[];
}

interface CreateTipResponse {
  message: string;
  tip: Tip;
}

interface LikeResponse {
  message: string;
  action: 'liked' | 'unliked';
}

export const tipsService = {
  getAll: (): Promise<TipsResponse> =>
    api.get<TipsResponse>('/api/v1/tips'),

  getMy: (): Promise<TipsResponse> =>
    api.get<TipsResponse>('/api/v1/tips/my', true),

  create: (payload: CreateTipPayload): Promise<CreateTipResponse> =>
    api.post<CreateTipResponse>('/api/v1/tips', payload, true),

  toggleLike: (tipId: number): Promise<LikeResponse> =>
    api.post<LikeResponse>(`/api/v1/tips/${tipId}/likes`, {}, true),
};