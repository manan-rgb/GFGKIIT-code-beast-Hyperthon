/*
  # FoodBridge Database Schema

  1. New Tables
    - `profiles`
      - User profiles with role-based access
    - `locations`
      - Food banks, shelters, and donor locations
    - `donations`
      - Food donation records
    - `achievements`
      - User achievement tracking
    - `urgent_needs`
      - Real-time needs from shelters
    - `community_stats`
      - Aggregated community impact metrics

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users
    - Special policies for organization accounts

  3. Changes
    - Initial schema creation
    - Role-based access control
    - Tracking and statistics
*/

-- Profiles table for extended user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  organization_name text,
  type text NOT NULL CHECK (type IN ('donor', 'receiver', 'admin')),
  contact_name text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Locations table for food banks and shelters
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('shelter', 'foodbank', 'restaurant', 'store')),
  address text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  contact_details text,
  operating_hours jsonb,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id uuid REFERENCES profiles(id),
  receiver_id uuid REFERENCES profiles(id),
  item_name text NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL,
  category text NOT NULL,
  expiry_date date,
  pickup_window tstzrange,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  criteria jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User achievements tracking
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id),
  achievement_id uuid REFERENCES achievements(id),
  progress numeric DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (profile_id, achievement_id)
);

-- Urgent needs table
CREATE TABLE IF NOT EXISTS urgent_needs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  item_name text NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'expired')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Community stats table for caching aggregated metrics
CREATE TABLE IF NOT EXISTS community_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (metric_name, period_start, period_end)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE urgent_needs ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_stats ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Locations policies
CREATE POLICY "Anyone can read verified locations"
  ON locations FOR SELECT
  TO authenticated
  USING (verified = true);

CREATE POLICY "Organizations can manage their locations"
  ON locations FOR ALL
  TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

-- Donations policies
CREATE POLICY "Users can read their donations"
  ON donations FOR SELECT
  TO authenticated
  USING (donor_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Donors can create donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (donor_id = auth.uid());

CREATE POLICY "Involved parties can update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (donor_id = auth.uid() OR receiver_id = auth.uid())
  WITH CHECK (donor_id = auth.uid() OR receiver_id = auth.uid());

-- Achievements policies
CREATE POLICY "Anyone can read achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- User achievements policies
CREATE POLICY "Users can read own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Urgent needs policies
CREATE POLICY "Anyone can read urgent needs"
  ON urgent_needs FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Organizations can manage urgent needs"
  ON urgent_needs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM locations l
      WHERE l.id = urgent_needs.location_id
      AND l.profile_id = auth.uid()
    )
  );

-- Community stats policies
CREATE POLICY "Anyone can read community stats"
  ON community_stats FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_locations_coordinates ON locations USING gist (
  ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_urgent_needs_status ON urgent_needs(status);
CREATE INDEX IF NOT EXISTS idx_community_stats_metric ON community_stats(metric_name, period_start, period_end);