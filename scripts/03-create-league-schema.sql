-- League System Database Schema
-- This script creates all tables needed for the tournament league system

-- Main leagues table
CREATE TABLE IF NOT EXISTS leagues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    game_type VARCHAR(50) NOT NULL CHECK (game_type IN ('efootball', 'fifa', 'codm')),
    tournament_format VARCHAR(50) NOT NULL DEFAULT 'knockout' CHECK (tournament_format IN ('knockout', 'group_stage', 'round_robin')),
    max_participants INTEGER NOT NULL DEFAULT 32,
    entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    prize_pool DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'registration_open', 'registration_closed', 'in_progress', 'completed', 'cancelled')),
    registration_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    registration_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    tournament_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    tournament_end_date TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- League participants/registrations
CREATE TABLE IF NOT EXISTS league_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'eliminated', 'withdrawn')),
    seed_number INTEGER, -- For tournament seeding
    group_assignment VARCHAR(10), -- For group stage tournaments (A, B, C, etc.)
    UNIQUE(league_id, user_id)
);

-- Tournament bracket structure
CREATE TABLE IF NOT EXISTS tournament_brackets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    round_name VARCHAR(100) NOT NULL, -- 'Group Stage', 'Round of 16', 'Quarter Finals', 'Semi Finals', 'Final'
    round_number INTEGER NOT NULL,
    match_number INTEGER NOT NULL,
    participant1_id UUID REFERENCES league_participants(id),
    participant2_id UUID REFERENCES league_participants(id),
    winner_id UUID REFERENCES league_participants(id),
    match_id UUID REFERENCES matches(id), -- Links to actual match when played
    scheduled_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'bye')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group stage standings (for group stage tournaments)
CREATE TABLE IF NOT EXISTS league_standings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    participant_id UUID REFERENCES league_participants(id) ON DELETE CASCADE,
    group_name VARCHAR(10), -- A, B, C, etc.
    matches_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    goals_for INTEGER DEFAULT 0, -- For football games
    goals_against INTEGER DEFAULT 0, -- For football games
    kills INTEGER DEFAULT 0, -- For CODM
    deaths INTEGER DEFAULT 0, -- For CODM
    points INTEGER DEFAULT 0, -- Tournament points (3 for win, 1 for draw, 0 for loss)
    goal_difference INTEGER DEFAULT 0,
    position INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(league_id, participant_id)
);

-- League betting system
CREATE TABLE IF NOT EXISTS league_bets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    bracket_match_id UUID REFERENCES tournament_brackets(id) ON DELETE CASCADE,
    bettor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bet_type VARCHAR(50) NOT NULL CHECK (bet_type IN ('match_winner', 'tournament_winner', 'top_scorer', 'group_winner')),
    predicted_winner_id UUID REFERENCES league_participants(id),
    bet_amount DECIMAL(10,2) NOT NULL,
    odds DECIMAL(5,2) NOT NULL DEFAULT 2.00,
    potential_payout DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'cancelled')),
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    settled_at TIMESTAMP WITH TIME ZONE
);

-- League match requirements (for CODM ammunition types, etc.)
CREATE TABLE IF NOT EXISTS league_match_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    requirement_type VARCHAR(50) NOT NULL, -- 'ammunition_type', 'game_mode', 'map_restriction'
    requirement_value VARCHAR(255) NOT NULL, -- 'assault_rifle', 'sniper', 'battle_royale', etc.
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- League prize distribution
CREATE TABLE IF NOT EXISTS league_prizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
    position INTEGER NOT NULL, -- 1st, 2nd, 3rd place, etc.
    prize_amount DECIMAL(10,2) NOT NULL,
    prize_type VARCHAR(50) NOT NULL DEFAULT 'cash' CHECK (prize_type IN ('cash', 'trophy', 'badge')),
    winner_id UUID REFERENCES league_participants(id),
    awarded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leagues_status ON leagues(status);
CREATE INDEX IF NOT EXISTS idx_leagues_game_type ON leagues(game_type);
CREATE INDEX IF NOT EXISTS idx_leagues_dates ON leagues(registration_start_date, registration_end_date, tournament_start_date);
CREATE INDEX IF NOT EXISTS idx_league_participants_league ON league_participants(league_id);
CREATE INDEX IF NOT EXISTS idx_league_participants_user ON league_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_tournament_brackets_league ON tournament_brackets(league_id);
CREATE INDEX IF NOT EXISTS idx_tournament_brackets_round ON tournament_brackets(league_id, round_number);
CREATE INDEX IF NOT EXISTS idx_league_standings_league ON league_standings(league_id);
CREATE INDEX IF NOT EXISTS idx_league_standings_group ON league_standings(league_id, group_name);
CREATE INDEX IF NOT EXISTS idx_league_bets_league ON league_bets(league_id);
CREATE INDEX IF NOT EXISTS idx_league_bets_bettor ON league_bets(bettor_id);
