import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log("[v0] Upload API called")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] File:", file.name, file.size)

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`
    const buffer = await file.arrayBuffer()

    // Upload to Supabase storage using service role
    const { data, error } = await supabase.storage.from("properties").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

    console.log("[v0] Upload result:", { data, error })

    if (error) {
      console.error("[v0] Upload error:", error)
      return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 400 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("properties").getPublicUrl(data.path)

    console.log("[v0] Public URL:", urlData.publicUrl)

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
    })
  } catch (error) {
    console.error("[v0] Upload server error:", error)
    const errorMsg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: `Server error: ${errorMsg}` }, { status: 500 })
  }
}
