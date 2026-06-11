import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Single shared instance — created once, reused everywhere
let client: SupabaseClient | null = null

export function createBrowserClient(): SupabaseClient {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }

  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

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
  created_at: string
  updated_at: string
}