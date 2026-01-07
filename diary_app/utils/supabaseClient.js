import { SUPABASE_URL, SUPABASE_API_KEY } from '../env';
import { createClient } from '@supabase/supabase-js';

// console.log("Test supaabse == ", supabaseUrl);
console.log("Test supabase == ", SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);