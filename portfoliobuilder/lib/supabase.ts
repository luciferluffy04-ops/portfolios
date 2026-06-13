import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://josrhzyubkdbxefppdwu.supabase.co'

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3Joenl1YmtkYnhlZnBwZHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDc2ODksImV4cCI6MjA5NjcyMzY4OX0.e-2ohTNUs29XZreWUvFWWPNfWlTcLR5C8YoHUvM-Hhc'

let client: SupabaseClient | null = null

export function createBrowserClient(): SupabaseClient {
  if (client) return client
  client = createClient(SUPABASE_URL, SUPABASE_KEY)
  return client
}

export type Profile = {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

export type Portfolio = {
  id: string
  user_id: string
  slug: string
  html: string
  role: string
  template: string
  name: string
  published: boolean
  plan: 'free' | 'pro' | 'premium'
  created_at: string
  updated_at: string
}
