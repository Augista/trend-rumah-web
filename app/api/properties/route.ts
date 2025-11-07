import { supabase } from "@/lib/db"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// 🔹 GET — ambil semua properti
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const district = searchParams.get("district")
    const propertyType = searchParams.get("type")

    let query = supabaseAdmin
      .from("properties")
      .select("*")
      .eq("listing_status", "available")
      .order("created_at", { ascending: false })

    if (district) query = query.eq("district", district)
    if (propertyType) query = query.eq("property_type", propertyType)

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Get properties error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// 🔹 POST — tambah properti baru
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const session = (await cookieStore).get("admin_session")?.value

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

    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from("properties")
      .insert([
        {
          admin_id: adminCheck.id, // ✅ gunakan ini
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
          listing_status: "available",
        },
      ])
      .select()

    if (error) {
      console.error("Insert property error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Create property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

