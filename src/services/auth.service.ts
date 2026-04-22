import { api } from '@/lib/api';
import { AuthResponse, LoginPayload, RegisterPayload } from '@/types/auth.types';

export const authService = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>('/api/v1/auth/login', payload),

  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>('/api/v1/auth/register', payload),
};