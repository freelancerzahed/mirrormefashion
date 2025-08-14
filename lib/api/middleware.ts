import { type NextRequest, NextResponse } from "next/server"
import { createErrorResponse, logRequest } from "./utils"

// CORS Middleware
export function corsMiddleware(request: NextRequest, response: NextResponse) {
  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: response.headers })
  }

  return response
}

// Rate Limiting Middleware (Simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimitMiddleware(
  request: NextRequest,
  maxRequests = 100,
  windowMs: number = 15 * 60 * 1000, // 15 minutes
) {
  const clientIp = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()

  const clientData = rateLimitMap.get(clientIp)

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs })
    return null // Allow request
  }

  if (clientData.count >= maxRequests) {
    return createErrorResponse(
      {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests, please try again later",
        statusCode: 429,
      },
      429,
    )
  }

  clientData.count++
  return null // Allow request
}

// Authentication Middleware (Mock implementation)
export async function authMiddleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return createErrorResponse(
      {
        code: "UNAUTHORIZED",
        message: "Missing or invalid authorization header",
        statusCode: 401,
      },
      401,
    )
  }

  const token = authHeader.substring(7)

  // Mock token validation - replace with actual JWT validation
  if (token === "invalid-token") {
    return createErrorResponse(
      {
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
        statusCode: 401,
      },
      401,
    )
  }

  // Mock user data - replace with actual user lookup
  const user = {
    id: "user-123",
    email: "user@example.com",
    username: "testuser",
  }

  // Add user to request context (you'd typically use a custom header or context)
  return user
}

// Request Validation Middleware
export async function validateJsonMiddleware(request: NextRequest) {
  if (request.method === "POST" || request.method === "PUT" || request.method === "PATCH") {
    const contentType = request.headers.get("content-type")

    if (!contentType || !contentType.includes("application/json")) {
      return createErrorResponse(
        {
          code: "INVALID_CONTENT_TYPE",
          message: "Content-Type must be application/json",
          statusCode: 400,
        },
        400,
      )
    }

    try {
      await request.clone().json()
    } catch (error) {
      return createErrorResponse(
        {
          code: "INVALID_JSON",
          message: "Invalid JSON in request body",
          statusCode: 400,
        },
        400,
      )
    }
  }

  return null // Valid request
}

// Combined Middleware Runner
export async function runMiddleware(
  request: NextRequest,
  middlewares: Array<(req: NextRequest) => Promise<any> | any>,
) {
  logRequest(request)

  for (const middleware of middlewares) {
    const result = await middleware(request)
    if (result instanceof NextResponse) {
      return result // Middleware returned an error response
    }
  }

  return null // All middleware passed
}
