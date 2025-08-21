-- Seed data for league system
-- This script creates sample leagues and tournament data

-- Insert sample leagues
INSERT INTO leagues (
    name, 
    description, 
    game_type, 
    tournament_format, 
    max_participants, 
    entry_fee, 
    prize_pool, 
    status,
    registration_start_date,
    registration_end_date,
    tournament_start_date,
    tournament_end_date
) VALUES 
(
    'Winter Championship - eFootball',
    'The ultimate eFootball tournament featuring the best players from around the world. Compete for glory and a massive prize pool!',
    'efootball',
    'knockout',
    32,
    25.00,
    5000.00,
    'registration_open',
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '14 days'
),
(
    'FIFA Masters League',
    'Professional FIFA tournament with group stages followed by knockout rounds. Show your skills and tactical prowess!',
    'fifa',
    'group_stage',
    16,
    50.00,
    8000.00,
    'upcoming',
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '10 days',
    NOW() + INTERVAL '12 days',
    NOW() + INTERVAL '20 days'
),
(
    'CODM Battle Royale Championship',
    'Call of Duty Mobile tournament featuring intense battle royale matches. Ammunition restrictions apply - Assault Rifles only!',
    'codm',
    'knockout',
    64,
    15.00,
    7500.00,
    'registration_open',
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '6 days',
    NOW() + INTERVAL '8 days',
    NOW() + INTERVAL '15 days'
),
(
    'Spring Cup - eFootball',
    'Seasonal eFootball tournament with exciting matches and great prizes. Perfect for intermediate players!',
    'efootball',
    'round_robin',
    8,
    10.00,
    500.00,
    'in_progress',
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '6 days'
);

-- Insert league match requirements (for CODM ammunition restrictions)
INSERT INTO league_match_requirements (league_id, requirement_type, requirement_value, is_mandatory)
SELECT 
    l.id,
    'ammunition_type',
    'assault_rifle',
    true
FROM leagues l 
WHERE l.name = 'CODM Battle Royale Championship';

INSERT INTO league_match_requirements (league_id, requirement_type, requirement_value, is_mandatory)
SELECT 
    l.id,
    'game_mode',
    'battle_royale',
    true
FROM leagues l 
WHERE l.name = 'CODM Battle Royale Championship';

-- Insert prize distribution for leagues
INSERT INTO league_prizes (league_id, position, prize_amount, prize_type)
SELECT l.id, 1, l.prize_pool * 0.5, 'cash' FROM leagues l WHERE l.name = 'Winter Championship - eFootball'
UNION ALL
SELECT l.id, 2, l.prize_pool * 0.3, 'cash' FROM leagues l WHERE l.name = 'Winter Championship - eFootball'
UNION ALL
SELECT l.id, 3, l.prize_pool * 0.2, 'cash' FROM leagues l WHERE l.name = 'Winter Championship - eFootball';

INSERT INTO league_prizes (league_id, position, prize_amount, prize_type)
SELECT l.id, 1, l.prize_pool * 0.4, 'cash' FROM leagues l WHERE l.name = 'FIFA Masters League'
UNION ALL
SELECT l.id, 2, l.prize_pool * 0.25, 'cash' FROM leagues l WHERE l.name = 'FIFA Masters League'
UNION ALL
SELECT l.id, 3, l.prize_pool * 0.2, 'cash' FROM leagues l WHERE l.name = 'FIFA Masters League'
UNION ALL
SELECT l.id, 4, l.prize_pool * 0.15, 'cash' FROM leagues l WHERE l.name = 'FIFA Masters League';

INSERT INTO league_prizes (league_id, position, prize_amount, prize_type)
SELECT l.id, 1, l.prize_pool * 0.45, 'cash' FROM leagues l WHERE l.name = 'CODM Battle Royale Championship'
UNION ALL
SELECT l.id, 2, l.prize_pool * 0.25, 'cash' FROM leagues l WHERE l.name = 'CODM Battle Royale Championship'
UNION ALL
SELECT l.id, 3, l.prize_pool * 0.15, 'cash' FROM leagues l WHERE l.name = 'CODM Battle Royale Championship'
UNION ALL
SELECT l.id, 4, l.prize_pool * 0.15, 'cash' FROM leagues l WHERE l.name = 'CODM Battle Royale Championship';

-- Create some sample tournament brackets for the in-progress league
INSERT INTO tournament_brackets (league_id, round_name, round_number, match_number, scheduled_date, status)
SELECT 
    l.id,
    'Round 1',
    1,
    generate_series(1, 4),
    NOW() + INTERVAL '1 day',
    'scheduled'
FROM leagues l 
WHERE l.name = 'Spring Cup - eFootball';
