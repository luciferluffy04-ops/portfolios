import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Browser client — use in Client Components
export function createBrowserClient() {
  return createClient(supabaseUrl, supabaseKey)
}

// Types for our database tables
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