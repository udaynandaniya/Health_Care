"use client"

import { useState, useEffect } from "react"
import type { DecodedToken } from "@/lib/auth"

interface AuthState {
  isAuthenticated: boolean
  user: DecodedToken | null
  isLoading: boolean
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.user) {
            setAuthState({
              isAuthenticated: true,
              user: data.user,
              isLoading: false,
            })
          } else {
            setAuthState({
              isAuthenticated: false,
              user: null,
              isLoading: false,
            })
          }
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        })
      }
    }

    checkAuth()
  }, [])

  return authState
}
