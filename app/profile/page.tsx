'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { BetHistory } from '@/components/bet-history';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Menu, Eye, EyeOff, Wallet, ArrowUpRight, ArrowDownLeft, Medal, Trophy, Copy, History, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { FifaMatch, EFootballMatch, CodmMatch } from '@/components/game-matching';

// Types
type TransactionType = 'deposit' | 'win' | 'wager' | 'withdraw';
type TransactionStatus = 'completed' | 'pending' | 'failed';
type Game = {
  id: string;
  name: string;
  route: string;
  image: string;
  description: string;
  iconPath: string;
  color: string;
};
interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  timestamp: string;
}

interface Bet {
  id: string;
  leagueId: string;
  userId: string;
  amount: number;
  outcome: string;
  timestamp: string;
}

const games: Game[] = [
  { 
    id: 'fifa', 
    name: 'FIFA', 
    route: '/games/fifa', 
    image: '/images/fifa.jpg', 
    description: 'FIFA Gaming Tournaments',
    iconPath: 'fifa.jpeg',
    color: '#1a365d'
  },
  { 
    id: 'efootball', 
    name: 'eFootball', 
    route: '/games/efootball', 
    image: '/images/efootball.jpg', 
    description: 'eFootball Tournaments',
    iconPath: 'efootball.png',
    color: '#2d3748'
  },
  { 
    id: 'codm', 
    name: 'CODM', 
    route: '/games/codm', 
    image: '/images/codm.jpg', 
    description: 'CODM Tournaments',
    iconPath: 'codm.png',
    color: '#4a5568'
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const mockBalance = 150000; // In Naira
  
  const mockBets = [
    { 
      id: '1',
      leagueId: 'league1',
      userId: 'user1',
      amount: 20000,
      outcome: 'win',
      timestamp: new Date().toISOString()
    },
    { 
      id: '2',
      leagueId: 'league2',
      userId: 'user1',
      amount: 30000,
      outcome: 'loss',
      timestamp: new Date().toISOString()
    },
    { 
      id: '3',
      leagueId: 'league3',
      userId: 'user1',
      amount: 15000,
      outcome: 'win',
      timestamp: new Date().toISOString()
    },
    { 
      id: '4',
      leagueId: 'league4',
      userId: 'user1',
      amount: 25000,
      outcome: 'loss',
      timestamp: new Date().toISOString()
    },
    { 
      id: '5',
      leagueId: 'league5',
      userId: 'user1',
      amount: 40000,
      outcome: 'win',
      timestamp: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      {/* Header Section */}
      <header className="border-b border-[#2A2D36] bg-[#141519]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Avatar className="h-10 w-10 border-2 border-emerald-500/20 shadow-emerald-500/10">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">Gaming_Pro123</p>
                <div className="flex items-center gap-1.5 bg-[#1C1E24] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-emerald-500 font-medium">Online</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">ID: #123456</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-[#1C1E24] rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">3</span>
            </button>
            <button className="p-2 hover:bg-[#1C1E24] rounded-lg transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Balance Card */}
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4 sm:p-6 mb-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Total Balance</h2>
          </div>

          {/* Balance Section */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secured Wallet
              </p>

              <p className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
                {showBalance ? `₦${mockBalance.toLocaleString()}` : '₦*****'}
              </p>
            </div>

    {/* Toggle Button */}
    <button
      onClick={() => setShowBalance(!showBalance)}
      className="p-0.5 rounded hover:bg-muted"
    >
      {showBalance ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>

  {/* Extra Details */}
  <div className="grid grid-cols-2 gap-2 my-2 text-xs">
    <div>
      <span className="text-muted-foreground">Available</span>
      <p className="font-semibold">₦{(mockBalance * 0.85).toLocaleString()}</p>
    </div>
    <div>
      <span className="text-muted-foreground">Pending</span>
      <p className="font-semibold text-yellow-600">
        ₦{(mockBalance * 0.15).toLocaleString()}
      </p>
    </div>
    <div className="col-span-2">
      <span className="text-muted-foreground">Wallet ID</span>
      <div className="flex items-center gap-1">
        <span className="font-mono text-xs truncate">WALLET-94F2-XY12</span>
        <button className="p-1 hover:bg-muted rounded">
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  </div>
  </div>

  {/* Actions */}
  <div className="grid grid-cols-2 gap-3 mt-4">
    <Button
      className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
      onClick={() => router.push('/wallet/deposit')}
    >
      <ArrowDownLeft className="h-5 w-5 mr-2" />
      Deposit
    </Button>
    <Button
      className="h-12 bg-[#2A2D36] hover:bg-[#353841] text-white rounded-lg font-medium"
      onClick={() => router.push('/wallet/withdraw')}
    >
      <ArrowUpRight className="h-5 w-5 mr-2" />
      Withdraw
    </Button>
  </div>

  {/* Last Transaction */}
  <div className="mt-4 border-t border-[#2A2D36] pt-4">
    <p className="text-sm text-gray-400 flex items-center gap-2">
      <History className="h-4 w-4" /> Last transaction:{' '}
      <span className="font-medium text-white">₦12,500 Withdrawn</span> 
      <span className="text-xs">on Aug 28</span>
    </p>
  </div>
</div>




{/* Games */}
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4 sm:p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Select a Game</h2>
            <p className="text-sm text-gray-400">Choose from our supported games to find your perfect opponent</p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {games.map((game) => (
              <div 
                key={game.id} 
                className="bg-[#15171B] hover:bg-[#1C1E24] transition-colors cursor-pointer rounded-xl border border-[#2A2D36] p-4"
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="aspect-square relative mb-3">
                  <Image src={game.iconPath} alt={game.name} fill className="object-contain p-2" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-sm font-medium text-white">{game.name}</h3>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={selectedGame !== null} onOpenChange={() => setSelectedGame(null)}>
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full bg-transparent border-0 p-0 overflow-y-auto max-h-[85vh] rounded-xl shadow-xl">
            {selectedGame === 'fifa' && <FifaMatch onClose={() => setSelectedGame(null)} />}
            {selectedGame === 'efootball' && <EFootballMatch onClose={() => setSelectedGame(null)} />}
            {selectedGame === 'codm' && <CodmMatch onClose={() => setSelectedGame(null)} />}
          </DialogContent>
        </Dialog>


{/* Recent Games Section */}
<div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4 sm:p-6 mb-6">
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-xl font-bold text-white">Recent Games</h2>
      <p className="text-sm text-gray-400 mt-1">Your latest gaming activities</p>
    </div>
    <Button 
      variant="link" 
      onClick={() => router.push('/recent-games')}
      className="text-emerald-500 hover:text-emerald-400"
    >
      View All
    </Button>
  </div>

  <div className="space-y-3">
    {[
      {
        id: '1',
        game: 'CODM',
        logo: 'codm.png',
        opponent: 'SniperKing',
        amount: 20000,
        outcome: 'win',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        game: 'FIFA',
        logo: 'fifa.jpeg',
        opponent: 'NoobMaster',
        amount: 30000,
        outcome: 'loss',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        game: 'eFootball',
        logo: 'efootball.png',
        opponent: 'GoalMachine',
        amount: 15000,
        outcome: 'win',
        timestamp: new Date().toISOString(),
      },
      {
        id: '4',
        game: 'CODM',
        logo: 'codm.png',
        opponent: 'ShadowOps',
        amount: 10000,
        outcome: 'pending',
        timestamp: new Date().toISOString(),
      },
      {
        id: '5',
        game: 'FIFA',
        logo: 'fifa.jpeg',
        opponent: 'Legend27',
        amount: 25000,
        outcome: 'win',
        timestamp: new Date().toISOString(),
      },
      {
        id: '6',
        game: 'eFootball',
        logo: 'efootball.png',
        opponent: 'KickMaster',
        amount: 12000,
        outcome: 'loss',
        timestamp: new Date().toISOString(),
      },
    ].map((match) => (
      <div
        key={match.id}
        className="flex items-center justify-between p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] cursor-pointer hover:bg-[#1C1E24] transition-colors"
        onClick={() => router.push(`/games/${match.game.toLowerCase()}`)}
      >
        <div className="flex items-center gap-4">
          {/* Small game logo */}
          <div className="h-12 w-12 relative rounded-lg overflow-hidden border border-[#2A2D36]">
            <Image
              src={match.logo}
              alt={match.game}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{match.game}</p>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                match.outcome === 'win'
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : match.outcome === 'loss'
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {match.outcome}
              </div>
            </div>
            {/* Opponent info */}
            <p className="text-sm text-gray-400 mt-1">
              vs {match.opponent}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(match.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Amount with gradient text */}
        <div className="text-right">
          <p className="font-bold text-lg bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
            ₦{match.amount.toLocaleString()}
          </p>
        </div>
      </div>
    ))}
  </div>



        {/* Leagues Section */}
        <div className="bg-[#1C1E24] rounded-xl border border-[#2A2D36] p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Active Leagues</h2>
              <p className="text-sm text-gray-400 mt-1">3 leagues in progress</p>
            </div>
            <Button 
              variant="link" 
              onClick={() => router.push('/leagues')}
              className="text-emerald-500 hover:text-emerald-400"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, name: 'FIFA Pro League', prize: 50000, players: 32, status: 'ongoing' },
              { id: 2, name: 'CODM Championship', prize: 75000, players: 64, status: 'upcoming' },
              { id: 3, name: 'eFootball Masters', prize: 100000, players: 16, status: 'ongoing' }
            ].map((league) => (
              <div 
                key={league.id}
                className="flex items-center justify-between p-4 bg-[#15171B] rounded-xl border border-[#2A2D36] cursor-pointer hover:bg-[#1C1E24] transition-colors"
                onClick={() => router.push(`/leagues/${league.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{league.name}</p>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        league.status === 'ongoing' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {league.status === 'ongoing' ? 'Live' : 'Starting Soon'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-400">
                        {league.players} Players
                      </p>
                      <span className="text-gray-600">•</span>
                      <p className="text-sm font-medium text-yellow-500">
                        ₦{league.prize.toLocaleString()} Prize
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
