"use client"

import ThemeToggle from "@/components/ThemeToggle"
import LogoutButton from "@/components/LogoutButton"
import { useAuth } from "@/hooks/useAuth"
import SessionStatus from "@/components/SessionStatus"

export default function DoctorDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-6 left-6">
        <LogoutButton />
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-green-600 dark:text-green-400">Doctor Dashboard</h1>
        {user && (
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2">
            Welcome back, <span className="font-semibold text-green-600 dark:text-green-400">Dr. {user.name}</span>!
          </p>
        )}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Manage your patients and medical services</p>
      </div>
      <SessionStatus />
    </div>
  )
}
