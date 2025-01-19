import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

export async function getNearbyLocations(latitude: number, longitude: number, radius: number = 10000) {
  const { data: locations } = await supabase
    .rpc('nearby_locations', {
      latitude,
      longitude,
      radius_meters: radius
    });

  return locations;
}

export async function createDonation(donationData: Partial<Database['public']['Tables']['donations']['Insert']>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return await supabase
    .from('donations')
    .insert({
      ...donationData,
      donor_id: user.id
    })
    .select()
    .single();
}

export async function getUrgentNeeds() {
  return await supabase
    .from('urgent_needs')
    .select(`
      *,
      location:locations(
        name,
        address,
        contact_details
      )
    `)
    .eq('status', 'active')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });
}

export async function getCommunityStats(period: 'day' | 'week' | 'month' | 'year' = 'month') {
  return await supabase
    .from('community_stats')
    .select('*')
    .gte('period_start', new Date(Date.now() - getPeriodMilliseconds(period)).toISOString())
    .order('period_start', { ascending: false });
}

function getPeriodMilliseconds(period: 'day' | 'week' | 'month' | 'year') {
  const milliseconds = {
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };
  return milliseconds[period];
}