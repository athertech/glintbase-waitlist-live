import { createClient } from "@supabase/supabase-js";

// Determine if we have real credentials or should use placeholders for now.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";


// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
