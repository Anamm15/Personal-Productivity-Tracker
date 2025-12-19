import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

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

export function verifyToken(token: string): JwtUserPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    throw new Error(`Invalid or expired token: ${error}`);
  }
}

export function getTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) return null;

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return null;

  return token;
}
