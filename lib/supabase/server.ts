// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!

  if (!supabaseUrl || !supabaseRoleKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createServerClient(supabaseUrl, supabaseRoleKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch {
          
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch {
        }
      },
    },
  })
}
