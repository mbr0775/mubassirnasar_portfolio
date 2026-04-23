import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dcumxvrcyregcxkitnap.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdW14dnJjeXJlZ2N4a2l0bmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjQxNDYsImV4cCI6MjA5MjUwMDE0Nn0.3Cx8Wk9pgXXx6fw3VpGD7oKaBz3BsoKroo-6G1ITp7M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_EMAIL = "mubassirnasar@gmail.com";