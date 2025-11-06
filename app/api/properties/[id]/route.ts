// import { createServerSupabaseClient } from "@/lib/supabase/server"
// import { type NextRequest, NextResponse } from "next/server"

// // Get property by ID
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const supabase = await createServerSupabaseClient()

//     const { data, error } = await supabase
//       .from("properties")
//       .select("*")
//       .eq("id", params.id)
//       .single()

//     if (error) {
//       return NextResponse.json({ error: "Property not found" }, { status: 404 })
//     }

//     return NextResponse.json(data)
//   } catch (error) {
//     console.error("[v0] Get property error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

// // Update property by ID
// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const supabase = await createServerSupabaseClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { data: userProfile } = await supabase
//       .from("users")
//       .select("is_admin")
//       .eq("id", user.id)
//       .single()

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
//       .update({
//         title,
//         description,
//         location,
//         district,
//         property_type,
//         price: Number(price),
//         size_sqm: size_sqm ? Number(size_sqm) : null,
//         bedrooms: bedrooms ? Number(bedrooms) : null,
//         bathrooms: bathrooms ? Number(bathrooms) : null,
//         featured_image_url,
//         amenities,
//         contact_phone,
//         contact_email,
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", params.id)
//       .select()

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 })
//     }

//     return NextResponse.json(data[0])
//   } catch (error) {
//     console.error("[v0] Update property error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

// // Delete property by ID
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const supabase = await createServerSupabaseClient()
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { data: userProfile } = await supabase
//       .from("users")
//       .select("is_admin")
//       .eq("id", user.id)
//       .single()

//     if (!userProfile?.is_admin) {
//       return NextResponse.json({ error: "Admin access required" }, { status: 403 })
//     }

//     const { error } = await supabase.from("properties").delete().eq("id", params.id)

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 400 })
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("[v0] Delete property error:", error)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }

export {}