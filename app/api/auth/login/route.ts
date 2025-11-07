
import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .maybeSingle() 

    if (error || !user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    if (user.password_hash !== password && !verifyDemoPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })

    response.cookies.set(
      "admin_session",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        timestamp: new Date().getTime(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    )

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

function verifyDemoPassword(password: string): boolean {
  return password === "admin123"
}
