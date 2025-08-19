import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string | any = process.env.SUPABASE_URL;
const SUPABASE_API_KEY: string | any = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export { supabase };
