// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const supabase = await createServerSupabaseClient()

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Check admin status
//     const { data: userProfile } = await supabase.from("users").select("is_admin").eq("id", user.id).single()

//     if (!userProfile?.is_admin) {
//       return NextResponse.json({ error: "Admin access required" }, { status: 403 })
//     }

//     const formData = await request.formData()
//     const file = formData.get("file") as File

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 })
//     }

//     const fileName = `${Date.now()}-${file.name}`
//     const buffer = await file.arrayBuffer()

//     // Upload to Supabase storage
//     const { data, error } = await supabase.storage.from("properties").upload(fileName, buffer, {
//       contentType: file.type,
//     })

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 })
//     }

//     // Get public URL
//     const { data: urlData } = supabase.storage.from("properties").getPublicUrl(data.path)

//     return NextResponse.json({
//       success: true,
//       url: urlData.publicUrl,
//     })
//   } catch (error) {
//     console.error("[v0] Upload error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

export {}