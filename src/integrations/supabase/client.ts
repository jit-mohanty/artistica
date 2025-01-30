import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wecstqyokwmungksiuiy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlY3N0cXlva3dtdW5na3NpdWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjM0MzAsImV4cCI6MjAyNTM5OTQzMH0.ZpDVPWVXrYoFsVCR_c-hJQwgUoGAYDZbQGMvAQAXVGY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});