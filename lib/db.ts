
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function query(sql: string, params?: any[]) {
  const { data, error } = await supabase.rpc("exec_sql", { sql, params })

  if (error) {
    console.error("Supabase query error:", error)
    throw error
  }

  return data
}
