import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await query("SELECT * FROM properties WHERE id = $1", [params.id])
    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error(" Get property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminSession = request.cookies.get("admin_session")?.value

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      location,
      district,
      property_type,
      price,
      size_sqm,
      bedrooms,
      bathrooms,
      featured_image_url,
      gallery_images,
      amenities,
      contact_phone,
      contact_email,
    } = body

    const result = await query(
      `UPDATE properties SET 
        title = $1, description = $2, location = $3, district = $4, property_type = $5,
        price = $6, size_sqm = $7, bedrooms = $8, bathrooms = $9, 
        featured_image_url = $10, gallery_images = $11, amenities = $12,
        contact_phone = $13, contact_email = $14, updated_at = CURRENT_TIMESTAMP
       WHERE id = $15
       RETURNING *`,
      [
        title,
        description,
        location,
        district,
        property_type,
        price,
        size_sqm,
        bedrooms,
        bathrooms,
        featured_image_url,
        JSON.stringify(gallery_images || []),
        JSON.stringify(amenities || []),
        contact_phone,
        contact_email,
        params.id,
      ],
    )

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error(" Update property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminSession = request.cookies.get("admin_session")?.value

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await query("DELETE FROM properties WHERE id = $1", [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Delete property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
