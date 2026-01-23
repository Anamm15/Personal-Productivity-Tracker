import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export interface JwtUserPayload {
  userId: string;
  email: string;
}

export async function generateToken(payload: JwtUserPayload): Promise<string> {
  return await new SignJWT({
    userId: payload.userId,
    email: payload.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<JwtUserPayload> {
  const { payload } = await jwtVerify(token, encodedSecret, {
    algorithms: ["HS256"],
  });

  if (!payload.userId || !payload.email) {
    throw new Error("Invalid JWT payload");
  }

  return {
    userId: payload.userId as string,
    email: payload.email as string,
  };
}

export function getTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader) return null;

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}
