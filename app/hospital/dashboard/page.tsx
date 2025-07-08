"use client"

import ThemeToggle from "@/components/ThemeToggle"
import LogoutButton from "@/components/LogoutButton"
import { useAuth } from "@/hooks/useAuth"
import SessionStatus from "@/components/SessionStatus"

export default function HospitalDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-6 left-6">
        <LogoutButton />
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400">Hospital Dashboard</h1>
        {user && (
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2">
            Welcome back, <span className="font-semibold text-purple-600 dark:text-purple-400">{user.name}</span>!
          </p>
        )}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Manage hospital services and emergency care</p>
      </div>
      <SessionStatus />
    </div>
  )
}
