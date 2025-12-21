import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeader, verifyToken } from "@/utils/jwt";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authentication token missing" },
      { status: 401 }
    );
  }

  const token = getTokenFromHeader(authHeader);
  if (!token) {
    return NextResponse.json(
      { error: "Authentication token missing" },
      { status: 401 }
    );
  }

  try {
    const user = await verifyToken(token);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", user.userId);
    requestHeaders.set("x-user-email", user.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/tasks",
    "/api/tasks/:id*",
    "/api/goals",
    "/api/goals/:id*",
    "/api/milestones",
    "/api/milestones/:id*",
    "/api/subscribe",
  ],
};
