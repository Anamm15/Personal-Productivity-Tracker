import jwt, { SignOptions } from "jsonwebtoken";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface JwtUserPayload {
  userId: string;
  email: string;
}

export function generateToken(
  payload: JwtUserPayload,
  options?: SignOptions
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
    ...options,
  });
}

export async function verifyToken(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, encodedSecret);

    // Pastikan data yang kita butuhkan ada
    if (!payload.userId || !payload.email) {
      throw new Error("Payload missing essential data");
    }

    return {
      userId: payload.userId as string,
      email: payload.email as string,
    };
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error("Invalid or expired token");
  }
}

export function getTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}
