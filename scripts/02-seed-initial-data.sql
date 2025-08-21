-- Seed initial data for the gaming platform

-- Insert the three supported games
INSERT INTO games (name, slug, description, requires_ammunition) VALUES
('E-Football', 'e-football', 'Competitive E-Football matches', FALSE),
('FIFA', 'fifa', 'FIFA football simulation matches', FALSE),
('Call of Duty Mobile', 'codm', 'CODM battle royale and multiplayer matches', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Create a demo admin user (password: admin123)
INSERT INTO users (email, username, password_hash, full_name, is_admin) VALUES
('admin@gamemate.com', 'admin', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'Platform Administrator', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Create demo regular users for testing
INSERT INTO users (email, username, password_hash, full_name) VALUES
('player1@gamemate.com', 'player1', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'Demo Player 1'),
('player2@gamemate.com', 'player2', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'Demo Player 2')
ON CONFLICT (email) DO NOTHING;

-- Create wallets for demo users
INSERT INTO wallets (user_id, balance) 
SELECT id, 100.00 FROM users WHERE username IN ('player1', 'player2')
ON CONFLICT (user_id) DO NOTHING;

-- Create demo user game profiles
INSERT INTO user_game_profiles (user_id, game_id, game_username, skill_level, ammunition_type)
SELECT 
    u.id,
    g.id,
    CASE 
        WHEN u.username = 'player1' THEN 'ProGamer1'
        WHEN u.username = 'player2' THEN 'ElitePlayer2'
    END,
    'intermediate',
    CASE WHEN g.slug = 'codm' THEN 'assault_rifle' ELSE NULL END
FROM users u
CROSS JOIN games g
WHERE u.username IN ('player1', 'player2')
ON CONFLICT (user_id, game_id) DO NOTHING;
