// app/api/body-data/route.ts
<<<<<<< HEAD
import { NextResponse } from "next/server"

// Dummy shape keys for testing
const dummyShapeKeys = {"head_size":0.75,"shape_head_oblong":1,"shape_head_round":0,"neck_height":0.75,"neck_width":0.5,"neck_layers":1,"chin_shape":1,"trapezoid":0.5,"shoulder_height":1,"shoulder_width":0.75,"stomach_width_average":0.75,"stomach_width_pouch":0,"stomach_width_spoon":0,"stomach_width_rectangle":0,"stomach_width_pregnant":0,"trimester":0.999,"arm_size":0,"arms_distended":0,"breasts":0.625,"shape_stomach_curvy":0,"shape_stomach_MT":0,"shape_stomach_spoon":0,"shape_stomach_rectangle":0,"shape_stomach_pouch":0,"shape_stomach_pregnant":1,"torso_height":0,"crotch_height":0,"leg_height":0,"leg_size":0,"hips_size":0,"bottom_width":0,"bottom_shape_round":0,"bottom_shape_square":0,"bottom_shape_inverted":0,"bottom_shape_flat":0,"bottom_shape_heart":0,"bottom_shape_dunk":0}
=======
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/config";
>>>>>>> 9098284 (body data update backend added)

// GET /api/body-data
export async function GET() {
  try {
<<<<<<< HEAD
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
=======
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Fetch body data from backend
    const res = await fetch(`${BACKEND_URL}/auth/body-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch body data" },
        { status: 400 }
      );
    }

    // Ensure shape_keys and slider_values are objects
    if (data.data) {
      if (typeof data.data.shape_keys === "string" && data.data.shape_keys) {
        try {
          data.data.shape_keys = JSON.parse(data.data.shape_keys);
        } catch (e) {
          console.error("Error parsing shape_keys:", e);
          data.data.shape_keys = {}; // fallback to empty object
        }
      }
      
      if (typeof data.data.slider_values === "string" && data.data.slider_values) {
        try {
          data.data.slider_values = JSON.parse(data.data.slider_values);
        } catch (e) {
          console.error("Error parsing slider_values:", e);
          data.data.slider_values = {}; // fallback to empty object
        }
      }
      
      // Ensure they are objects even if they were null/undefined
      data.data.shape_keys = data.data.shape_keys || {};
      data.data.slider_values = data.data.slider_values || {};
    }
   
    return NextResponse.json({
      success: true,
      data: data.data,
    });

  } catch (err) {
    console.error("Error fetching /api/body-data:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/body-data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Forward the request to your backend API
    const backendResponse = await fetch(`${BACKEND_URL}/auth/body-data/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // Log response details for debugging
    console.log("Backend response status:", backendResponse.status);
    console.log("Backend response headers:", [...backendResponse.headers.entries()]);
    
    // Get response text first for debugging
    const responseText = await backendResponse.text();
    console.log("Backend raw response text:", responseText);
    
    // If response is empty
    if (!responseText) {
      if (backendResponse.ok) {
        return NextResponse.json({
          success: true,
          message: "Body data updated successfully"
        });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            message: `Server error: ${backendResponse.status} ${backendResponse.statusText}` 
          },
          { status: backendResponse.status }
        );
      }
    }
    
    // Try to parse JSON response
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing backend response:", parseError);
      // If we can't parse but status is OK, return success
      if (backendResponse.ok) {
        return NextResponse.json({
          success: true,
          message: "Body data updated successfully"
        });
      } else {
        // If we can't parse and status is not OK, return error
        return NextResponse.json(
          { 
            success: false, 
            message: `Server returned invalid response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}` 
          },
          { status: backendResponse.status }
        );
      }
    }

    if (backendResponse.ok) {
      return NextResponse.json({
        success: true,
        message: responseData.message || "Body data updated successfully",
        data: responseData.data
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: responseData.message || "Failed to update body data" 
        },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error("Error updating body data:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
>>>>>>> 9098284 (body data update backend added)
