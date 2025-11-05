import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const district = searchParams.get("district")
    const propertyType = searchParams.get("type")
    const status = searchParams.get("status") || "available"

    let sql = "SELECT * FROM properties WHERE listing_status = $1"
    const params: any[] = [status]

    if (district) {
      sql += ` AND district = $${params.length + 1}`
      params.push(district)
    }

    if (propertyType) {
      sql += ` AND property_type = $${params.length + 1}`
      params.push(propertyType)
    }

    sql += " ORDER BY created_at DESC"

    const result = await query(sql, params)
    return NextResponse.json(result)
  } catch (error) {
    console.error(" Get properties error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminSession = request.cookies.get("admin_session")?.value

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = JSON.parse(adminSession)
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
      `INSERT INTO properties 
        (title, description, location, district, property_type, price, size_sqm, 
         bedrooms, bathrooms, featured_image_url, gallery_images, amenities, 
         contact_phone, contact_email, admin_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
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
        admin.id,
      ],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error(" Create property error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
