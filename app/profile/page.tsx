'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { BetHistory } from '@/components/bet-history';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/game-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Menu, Eye, EyeOff, Wallet, ArrowUpRight, ArrowDownLeft, Medal, Trophy, Copy, History, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="bg-sidebar/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Gaming_Pro123</p>
                <p className="text-xs text-muted-foreground">ID: #123456</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-white">3</span>
              </button>
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Balance Card */}
        <Card className="mb-4 p-3 bg-card border rounded-xl shadow-sm">
  {/* Header */}
  <div className="flex items-center gap-1.5 mb-1">
    <Wallet className="h-4 w-4 text-primary" />
    <h2 className="text-sm font-medium text-muted-foreground">Total Balance</h2>
  </div>

  {/* Balance Section */}
  <div className="flex items-center gap-2">
    <div className="flex flex-col leading-tight">
      {/* Secured Wallet (tiny, just above balance) */}
      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
        <ShieldCheck className="h-3 w-3 text-green-600" /> Secured Wallet
      </p>

      <p className="text-2xl font-bold tracking-tight">
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

  {/* Actions */}
  <div className="grid grid-cols-2 gap-2">
    <Button
      size="sm"
      className="flex items-center justify-center gap-1.5"
      onClick={() => router.push('/wallet/deposit')}
    >
      <ArrowDownLeft className="h-3.5 w-3.5" />
      Deposit
    </Button>
    <Button
      size="sm"
      className="flex items-center justify-center gap-1.5 bg-secondary text-primary"
      onClick={() => router.push('/wallet/withdraw')}
    >
      <ArrowUpRight className="h-3.5 w-3.5" />
      Withdraw
    </Button>
  </div>

  {/* Last Transaction */}
  <div className="mt-2 border-t pt-2 text-xs">
    <p className="text-muted-foreground flex items-center gap-1.5">
      <History className="h-3.5 w-3.5" /> Last transaction:{' '}
      <span className="font-medium">₦12,500 Withdrawn</span> on Aug 28
    </p>
  </div>
</Card>




        {/* Games Section */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="p-4 hover:bg-accent/5 transition-colors cursor-pointer"
              onClick={() => router.push(game.route)}
            >
              <div className="aspect-square relative mb-0">
                <Image
                  src={game.iconPath}
                  alt={game.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="text-sm font-medium text-center">{game.name}</h3>
            </Card>
          ))}
        </div>

        {/* Betting History */}
        <Card className="mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Bets</h2>
            <Button variant="link" onClick={() => router.push('/betting-history')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {mockBets.slice(0, 5).map((bet) => (
              <div 
                key={bet.id}
                className="flex items-center justify-between p-3 bg-accent/5 rounded-lg"
              >
                <div>
                  <p className="font-medium">League #{bet.leagueId}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(bet.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className={`text-right ${bet.outcome === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                  <p className="font-bold">₦{bet.amount.toLocaleString()}</p>
                  <p className="text-sm capitalize">{bet.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leagues Section */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Active Leagues</h2>
              <p className="text-sm text-muted-foreground">3 leagues in progress</p>
            </div>
            <Button variant="link" onClick={() => router.push('/leagues')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, name: 'FIFA Pro League', prize: 50000, players: 32, status: 'ongoing' },
              { id: 2, name: 'CODM Championship', prize: 75000, players: 64, status: 'upcoming' },
              { id: 3, name: 'eFootball Masters', prize: 100000, players: 16, status: 'ongoing' }
            ].map((league) => (
              <div 
                key={league.id}
                className="flex items-center justify-between p-3 bg-accent/5 rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => router.push(`/leagues/${league.id}`)}
              >
                <div className="flex items-center gap-3">
                  <Medal className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{league.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {league.players} Players • ₦{league.prize.toLocaleString()} Prize Pool
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  league.status === 'ongoing' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {league.status === 'ongoing' ? 'Live' : 'Starting Soon'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
