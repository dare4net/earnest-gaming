import { fetchApi } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  selectedGames: string[];
}

export const auth = {
  login: (credentials: LoginCredentials) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterData) =>
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getCurrentUser: () =>
    fetchApi('/auth/me'),

  logout: () =>
    fetchApi('/auth/logout', {
      method: 'POST',
    }),

  updateProfile: (data: Partial<{ username: string; email: string; avatar: string }>) =>
    fetchApi('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};
