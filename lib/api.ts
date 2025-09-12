const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Generic API fetcher function
 */
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText || 'Something went wrong'
      }));
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * API endpoints
 */
export const api = {
  // Leagues
  getLeagues: () => fetchApi('/leagues'),
  getLeague: (id: string) => fetchApi(`/leagues/${id}`),
  
  // Matches
  getMatches: () => fetchApi('/matches'),
  getMatch: (id: string) => fetchApi(`/matches/${id}`),
  getUserMatches: (userId: string) => fetchApi(`/matches/user/${userId}`),
  getUserActiveMatches: (userId: string) => fetchApi(`/matches/user/${userId}/active`),
  createMatch: (payload: { game: 'CODM' | 'eFootball' | 'FIFA'; entryFee: number; format?: '1v1' | '2v2' | '3v3' | '4v4' | '5v5'; rules?: string[]; matchType?: 'regular' | 'league' }) =>
    fetchApi('/matches/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  searchOpponent: (matchId: string) =>
    fetchApi(`/matches/${matchId}/searchOpponent`, { method: 'POST' }),
  joinMatch: (matchId: string) =>
    fetchApi(`/matches/${matchId}/join`, { method: 'POST' }),
  matchWithPlayer: (matchId: string, playerId: string) =>
    fetchApi(`/matches/${matchId}/matchWithPlayer`, { method: 'POST', body: JSON.stringify({ playerId }) }),
  updateMatchStatus: (matchId: string, status: 'matching' | 'matched' | 'playing' | 'verification' | 'finished') =>
    fetchApi(`/matches/${matchId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteMatch: (matchId: string) =>
    fetchApi(`/matches/${matchId}`, { method: 'DELETE' }),
  
  // Users/Players
  getPlayers: () => fetchApi('/users'),
  getPlayer: (id: string) => fetchApi(`/users/${id}`),
  getLeaderboard: () => fetchApi('/users/leaderboard'),
  
  // Wallet/Transactions
  getTransactions: () => fetchApi('/wallet'),
  getUserTransactions: (userId: string) => fetchApi(`/wallet/user/${userId}`),
  
  // Games
  getGames: () => fetchApi('/games'),
  
  // Auth
  login: (credentials: { email: string; password: string }) => 
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData: any) => 
    fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};
