import { api } from '@/lib/api';
import { UpdateUserPayload, UserProfileResponse } from '@/types/user.types';

interface UpdateUserResponse {
  message: string;
  user: UserProfileResponse['user'];
}

export const usersService = {
  getMe: (): Promise<UserProfileResponse> =>
    api.get<UserProfileResponse>('/api/v1/users/me', true),

  updateMe: (payload: UpdateUserPayload): Promise<UpdateUserResponse> =>
    api.put<UpdateUserResponse>('/api/v1/users/me', payload, true),
};