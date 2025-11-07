import { supabaseAdmin } from "@/lib/supabase/admin"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

type ParamsType = { params: { id: string } } | { params: Promise<{ id: string }> }

// ✅ GET /api/properties/[id]
export async function GET(request: NextRequest, context: ParamsType) {
  const params = "then" in context.params ? await context.params : context.params

  try {
    const { data, error } = await supabaseAdmin
      .from("properties")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Get property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ PUT /api/properties/[id]
export async function PUT(request: NextRequest, context: ParamsType) {
  const params = "then" in context.params ? await context.params : context.params

  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")?.value

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let admin
    try {
      admin = JSON.parse(session)
    } catch {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    // 🔹 Cek apakah admin valid
    const { data: adminCheck, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id, email")
      .eq("id", admin.id)
      .single()

    if (adminError || !adminCheck) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // 🔹 Ambil data update dari body
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from("properties")
      .update({
        title: body.title,
        description: body.description,
        location: body.location,
        district: body.district,
        property_type: body.property_type,
        price: Number(body.price),
        size_sqm: body.size_sqm ? Number(body.size_sqm) : null,
        bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
        bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
        featured_image_url: body.featured_image_url,
        gallery_images: body.gallery_images || [],
        amenities: Array.isArray(body.amenities)
          ? body.amenities
          : body.amenities
          ? [body.amenities]
          : [],
        contact_phone: body.contact_phone,
        contact_email: body.contact_email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()

    if (error) {
      console.error("Update property error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[v0] Update property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ DELETE /api/properties/[id]
export async function DELETE(request: NextRequest, context: ParamsType) {
  const params = "then" in context.params ? await context.params : context.params

  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")?.value

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let admin
    try {
      admin = JSON.parse(session)
    } catch {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const { data: adminCheck, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id, email")
      .eq("id", admin.id)
      .single()

    if (adminError || !adminCheck) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { error } = await supabaseAdmin
      .from("properties")
      .delete()
      .eq("id", params.id)

    if (error) {
      console.error("Delete property error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
