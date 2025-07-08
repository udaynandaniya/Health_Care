"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { User, Settings, LogOut, ChevronDown, Users, UserCheck, Building2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-hot-toast"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Logged out successfully!")
        window.location.reload()
      } else {
        toast.error("Logout failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  if (!user) return null

  const getRoleIcon = () => {
    if (user.isAdmin) return <Shield className="w-4 h-4" />
    switch (user.role) {
      case "user":
        return <Users className="w-4 h-4" />
      case "doctor":
        return <UserCheck className="w-4 h-4" />
      case "hospital":
        return <Building2 className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = () => {
    if (user.isAdmin) return "from-red-500 to-red-600"
    switch (user.role) {
      case "user":
        return "from-blue-500 to-blue-600"
      case "doctor":
        return "from-green-500 to-green-600"
      case "hospital":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getDashboardLink = () => {
    if (user.isAdmin) return "/admin/dashboard"
    return `/${user.role}/dashboard`
  }

  const getRoleLabel = () => {
    if (user.isAdmin) return "Admin"
    return user.role.charAt(0).toUpperCase() + user.role.slice(1)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-8 h-8 bg-gradient-to-br ${getRoleColor()} rounded-full flex items-center justify-center`}>
          {getRoleIcon()}
        </div>
        <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${getRoleColor()} rounded-full flex items-center justify-center`}
                >
                  {getRoleIcon()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                    {user.isAdmin ? "Platform Administrator" : `${user.role} Account`}
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Link */}
            <div className="py-2">
              <Link href={getDashboardLink()}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {getRoleIcon()}
                  <span>{getRoleLabel()} Dashboard</span>
                </button>
              </Link>

              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Manage Account</span>
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-3 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
