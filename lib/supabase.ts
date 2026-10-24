import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://kxhtoolnjeoptkiusuak.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aHRvb2xuamVvcHRraXVzdWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3OTgwNzcsImV4cCI6MjEwODM3NDA3N30.B-d6tDM7jL2oYcxD8YNC4pr4DlOcdzj8ixdwafhmMGU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);