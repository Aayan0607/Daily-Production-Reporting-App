import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qkycmeviessuimbishhx.supabase.co";

const supabaseAnonKey =
  "sb_publishable_XcT2O-h2kj8IIFaSBsKAfA_xO0nrYTh";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);