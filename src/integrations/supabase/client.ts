// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pzvcnpqsyjrheaxljicz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dmNucHFzeWpyaGVheGxqaWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MDQ3OTIsImV4cCI6MjA1MTk4MDc5Mn0.hT8tVSQRKhzxw5fFNFfrG4Hb6DOPGIQKIn4BXlzBmgw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);