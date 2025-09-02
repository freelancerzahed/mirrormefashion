import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/config";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include", // include cookies if backend uses sessions
    });

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const text = await res.text();
      console.error("Backend returned non-JSON response:", text);
      return NextResponse.json({ error: "Backend returned non-JSON response" }, { status: 500 });
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json({ error: "Failed to connect to backend" }, { status: 500 });
  }
}
