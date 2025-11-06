// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { GetServerSidePropsContext } from "next";

export const createServerSupabaseClient = (ctx: GetServerSidePropsContext) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return ctx.req.cookies[name];
      },
      set(name: string, value: string, options: any) {
        ctx.res.setHeader("Set-Cookie", `${name}=${value}; Path=/; HttpOnly`);
      },
      remove(name: string) {
        ctx.res.setHeader("Set-Cookie", `${name}=; Path=/; Max-Age=0`);
      },
    },
  });
};
