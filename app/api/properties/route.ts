// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { type NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest) {
//   try {
//     const supabase = await createServerSupabaseClient()
//     const { searchParams } = new URL(request.url)
//     const district = searchParams.get("district")
//     const propertyType = searchParams.get("type")

//     let query = supabase
//       .from("properties")
//       .select("*")
//       .eq("listing_status", "available")
//       .order("created_at", { ascending: false })

//     if (district) {
//       query = query.eq("district", district)
//     }

//     if (propertyType) {
//       query = query.eq("property_type", propertyType)
//     }

//     const { data, error } = await query

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 })
//     }

//     return NextResponse.json(data)
//   } catch (error) {
//     console.error("[v0] Get properties error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const supabase = await createServerSupabaseClient()

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // Check if user is admin
//     const { data: userProfile } = await supabase.from("users").select("is_admin").eq("id", user.id).single()

//     if (!userProfile?.is_admin) {
//       return NextResponse.json({ error: "Admin access required" }, { status: 403 })
//     }

//     const body = await request.json()

//     const {
//       title,
//       description,
//       location,
//       district,
//       property_type,
//       price,
//       size_sqm,
//       bedrooms,
//       bathrooms,
//       featured_image_url,
//       amenities,
//       contact_phone,
//       contact_email,
//     } = body

//     const { data, error } = await supabase
//       .from("properties")
//       .insert([
//         {
//           admin_id: user.id,
//           title,
//           description,
//           location,
//           district,
//           property_type,
//           price: Number(price),
//           size_sqm: size_sqm ? Number(size_sqm) : null,
//           bedrooms: bedrooms ? Number(bedrooms) : null,
//           bathrooms: bathrooms ? Number(bathrooms) : null,
//           featured_image_url,
//           amenities: Array.isArray(amenities) ? amenities : [amenities],
//           contact_phone,
//           contact_email,
//         },
//       ])
//       .select()

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 })
//     }

//     return NextResponse.json(data[0], { status: 201 })
//   } catch (error) {
//     console.error("[v0] Create property error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

export {}