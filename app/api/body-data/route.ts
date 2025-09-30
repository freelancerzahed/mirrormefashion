// app/api/body-data/route.ts
import { NextResponse } from "next/server"

// Dummy shape keys for testing
const dummyShapeKeys = {"head_size":0.75,"shape_head_oblong":1,"shape_head_round":0,"neck_height":0.75,"neck_width":0.5,"neck_layers":1,"chin_shape":1,"trapezoid":0.5,"shoulder_height":1,"shoulder_width":0.75,"stomach_width_average":0.75,"stomach_width_pouch":0,"stomach_width_spoon":0,"stomach_width_rectangle":0,"stomach_width_pregnant":0,"trimester":0.999,"arm_size":0,"arms_distended":0,"breasts":0.625,"shape_stomach_curvy":0,"shape_stomach_MT":0,"shape_stomach_spoon":0,"shape_stomach_rectangle":0,"shape_stomach_pouch":0,"shape_stomach_pregnant":1,"torso_height":0,"crotch_height":0,"leg_height":0,"leg_size":0,"hips_size":0,"bottom_width":0,"bottom_shape_round":0,"bottom_shape_square":0,"bottom_shape_inverted":0,"bottom_shape_flat":0,"bottom_shape_heart":0,"bottom_shape_dunk":0}

// GET /api/body-data
export async function GET() {
  try {
    // Here you can replace dummyShapeKeys with a fetch from Laravel backend
    // Example: fetch(`https://your-backend.com/api/user/${userId}/shape-keys`)
    
    return NextResponse.json({
      success: true,
      shapeKeys: dummyShapeKeys,
    })
  } catch (err) {
    console.error("Error in /api/body-data:", err)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
