// import Constants from 'expo-constants';
import { SUPABASE_URL, SUPABASE_API_KEY } from '../env';
import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = Constants.manifest.extra.supabaseUrl;
// const SUPABASE_API_KEY = Constants.manifest.extra.supabaseApiKey;

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);