import jwt from "jsonwebtoken"

export interface DecodedToken {
  userId: string
  email: string
  role: string
  isAdmin: boolean
  exp: number
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwt.decode(token) as DecodedToken
  } catch (error) {
    return null
  }
}

export function isTokenExpired(token: DecodedToken): boolean {
  return Date.now() >= token.exp * 1000
}
