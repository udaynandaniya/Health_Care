// // // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\user\dashboard\page.tsx

// // // // "use client"

// // // // import ThemeToggle from "@/components/ThemeToggle"
// // // // import LogoutButton from "@/components/LogoutButton"
// // // // import { useAuth } from "@/hooks/useAuth"
// // // // import SessionStatus from "@/components/SessionStatus"

// // // // export default function UserDashboard() {
// // // //   const { user } = useAuth()

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // // //       <div className="absolute top-6 left-6">
// // // //         <LogoutButton />
// // // //       </div>

// // // //       <div className="absolute top-6 right-6">
// // // //         <ThemeToggle />
// // // //       </div>

// // // //       <div className="container mx-auto px-4 py-16">
// // // //         <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">User Dashboard</h1>
// // // //         {user && (
// // // //           <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2">
// // // //             Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.name}</span>!
// // // //           </p>
// // // //         )}
// // // //         <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Welcome to your healthcare dashboard</p>
// // // //       </div>
// // // //       <SessionStatus />
// // // //     </div>
// // // //   )
// // // // }



// // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\user\dashboard\page.tsx
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { motion } from "framer-motion"
// // // import {
// // //   Heart,
// // //   AlertTriangle,
// // //   Shield,
// // //   Brain,
// // //   Target,
// // //   Zap,
// // //   Moon,
// // //   Smile,
// // //   Frown,
// // //   Meh,
// // //   Plus,
// // //   BarChart3,
// // //   TrendingUp,
// // //   Calendar,
// // //   Clock,
// // //   Bell,
// // //   MessageSquare,
// // //   ThumbsUp,
// // //   Building2,
// // //   Stethoscope,
// // //   MapPin,
// // //   Phone,
// // //   Mail,
// // //   Award,
// // // } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Progress } from "@/components/ui/progress"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // // import { useAuth } from "@/hooks/useAuth"
// // // import ThemeToggle from "@/components/ThemeToggle"
// // // import UserDropdown from "@/components/UserDropdown"
// // // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // // import { toast } from "react-hot-toast"

// // // interface MoodData {
// // //   date: string
// // //   mood: number
// // //   energy: number
// // //   anxiety: number
// // //   sleep: number
// // //   notes?: string
// // // }

// // // interface EmergencyAlert {
// // //   _id: string
// // //   status: string
// // //   priority: string
// // //   createdAt: string
// // //   acceptedBy?: {
// // //     name: string
// // //   }
// // // }

// // // interface Post {
// // //   _id: string
// // //   title: string
// // //   content: string
// // //   category: string
// // //   tags: string[]
// // //   authorId: {
// // //     _id: string
// // //     name: string
// // //   }
// // //   authorType: string
// // //   mentionedId?: {
// // //     _id: string
// // //     name: string
// // //   }
// // //   mentionedType?: string
// // //   likes: string[]
// // //   comments: Array<{
// // //     userId: string
// // //     userName: string
// // //     content: string
// // //     createdAt: string
// // //   }>
// // //   createdAt: string
// // //   isApproved: boolean
// // // }

// // // interface Hospital {
// // //   _id: string
// // //   name: string
// // //   email: string
// // //   phone: string
// // //   address: string
// // //   specialties: string[]
// // //   isVerified: boolean
// // //   isAvailable: boolean
// // //   emergencyServices: boolean
// // //   createdAt: string
// // // }

// // // export default function UserDashboard() {
// // //   const { user } = useAuth()
// // //   const [moodData, setMoodData] = useState<MoodData[]>([])
// // //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// // //   const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
// // //   const [hospitalPosts, setHospitalPosts] = useState<Post[]>([])
// // //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// // //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// // //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// // //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [notifications, setNotifications] = useState(0)
// // //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)

// // //   // Mood tracking state
// // //   const [currentMood, setCurrentMood] = useState(5)
// // //   const [currentEnergy, setCurrentEnergy] = useState(5)
// // //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// // //   const [currentSleep, setCurrentSleep] = useState(8)
// // //   const [moodNotes, setMoodNotes] = useState("")

// // //   useEffect(() => {
// // //     fetchDashboardData()
// // //     requestLocation()
// // //   }, [])

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       const [moodRes, alertsRes, doctorPostsRes, hospitalPostsRes, hospitalsRes] = await Promise.all([
// // //         fetch("/api/user/mood-data"),
// // //         fetch("/api/user/emergency-alerts"),
// // //         fetch("/api/user/doctor-posts"),
// // //         fetch("/api/user/hospital-posts"),
// // //         fetch("/api/user/hospitals"),
// // //       ])

// // //       if (moodRes.ok) {
// // //         const moodData = await moodRes.json()
// // //         setMoodData(moodData.data || [])
// // //         setTodayMood(moodData.today || null)
// // //       }

// // //       if (alertsRes.ok) {
// // //         const alertsData = await alertsRes.json()
// // //         setEmergencyAlerts(alertsData.data || [])
// // //       }

// // //       if (doctorPostsRes.ok) {
// // //         const doctorPostsData = await doctorPostsRes.json()
// // //         setDoctorPosts(doctorPostsData.data || [])
// // //       }

// // //       if (hospitalPostsRes.ok) {
// // //         const hospitalPostsData = await hospitalPostsRes.json()
// // //         setHospitalPosts(hospitalPostsData.data || [])
// // //       }

// // //       if (hospitalsRes.ok) {
// // //         const hospitalsData = await hospitalsRes.json()
// // //         setHospitals(hospitalsData.data || [])
// // //       }

// // //       setNotifications(
// // //         (doctorPostsRes.ok ? (await doctorPostsRes.json()).data?.length || 0 : 0) +
// // //           (hospitalPostsRes.ok ? (await hospitalPostsRes.json()).data?.length || 0 : 0),
// // //       )
// // //     } catch (error) {
// // //       console.error("Error fetching dashboard data:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const requestLocation = () => {
// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         (position) => {
// // //           setLocation({
// // //             lat: position.coords.latitude,
// // //             lng: position.coords.longitude,
// // //           })
// // //         },
// // //         (error) => {
// // //           console.log("Location access denied:", error)
// // //         },
// // //       )
// // //     }
// // //   }

// // //   const handleEmergencySOS = async () => {
// // //     if (isEmergencyActive) return

// // //     setIsEmergencyActive(true)

// // //     try {
// // //       const response = await fetch("/api/user/emergency-alert", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           location: location,
// // //           message: "Emergency assistance needed - sent from dashboard",
// // //         }),
// // //       })

// // //       if (response.ok) {
// // //         toast.success("🚨 Emergency alert sent! Help is on the way.")
// // //         setTimeout(() => setIsEmergencyActive(false), 180000) // 3 minutes
// // //       } else {
// // //         toast.error("Failed to send emergency alert")
// // //         setIsEmergencyActive(false)
// // //       }
// // //     } catch (error) {
// // //       toast.error("Emergency system error")
// // //       setIsEmergencyActive(false)
// // //     }
// // //   }

// // //   const saveMoodEntry = async () => {
// // //     try {
// // //       const response = await fetch("/api/user/mood-entry", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           mood: currentMood,
// // //           energy: currentEnergy,
// // //           anxiety: currentAnxiety,
// // //           sleep: currentSleep,
// // //           notes: moodNotes,
// // //         }),
// // //       })

// // //       if (response.ok) {
// // //         toast.success("✅ Mood entry saved!")
// // //         fetchDashboardData()
// // //         setMoodNotes("")
// // //       } else {
// // //         toast.error("Failed to save mood entry")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Error saving mood entry")
// // //     }
// // //   }

// // //   const handleLikePost = async (postId: string) => {
// // //     try {
// // //       const response = await fetch("/api/user/like-post", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ postId }),
// // //       })

// // //       if (response.ok) {
// // //         fetchDashboardData()
// // //         toast.success("👍 Post liked!")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error liking post:", error)
// // //     }
// // //   }

// // //   const getMoodIcon = (mood: number) => {
// // //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// // //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// // //     return <Frown className="w-6 h-6 text-red-500" />
// // //   }

// // //   const getMoodColor = (mood: number) => {
// // //     if (mood >= 8) return "text-green-600"
// // //     if (mood >= 6) return "text-yellow-600"
// // //     return "text-red-600"
// // //   }

// // //   const getWellnessScore = () => {
// // //     if (!todayMood) return 0
// // //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// // //     return Math.round(score * 10)
// // //   }

// // //   const getWeeklyAverage = () => {
// // //     if (moodData.length === 0) return 0
// // //     const recentData = moodData.slice(-7)
// // //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// // //     return Math.round(avgMood * 10) / 10
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <motion.div
// // //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// // //             animate={{ rotate: 360 }}
// // //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // //           />
// // //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // //       {/* Header with Animated Icons */}
// // //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// // //         <AnimatedHealthIcons />
// // //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// // //           <div className="flex items-center space-x-4">
// // //             <motion.div
// // //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// // //               animate={{
// // //                 scale: [1, 1.1, 1],
// // //                 rotate: [0, 5, -5, 0],
// // //               }}
// // //               transition={{
// // //                 duration: 3,
// // //                 repeat: Number.POSITIVE_INFINITY,
// // //                 ease: "easeInOut",
// // //               }}
// // //             >
// // //               <Heart className="w-6 h-6 text-white" />
// // //             </motion.div>
// // //             <div>
// // //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// // //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center space-x-4">
// // //             {/* Hospital Info Button */}
// // //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// // //               <DialogTrigger asChild>
// // //                 <motion.button
// // //                   whileHover={{ scale: 1.05 }}
// // //                   whileTap={{ scale: 0.95 }}
// // //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// // //                 >
// // //                   <Building2 className="w-4 h-4" />
// // //                   <span className="text-sm font-medium">Hospital Info</span>
// // //                 </motion.button>
// // //               </DialogTrigger>
// // //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// // //                 <DialogHeader>
// // //                   <DialogTitle className="flex items-center space-x-2">
// // //                     <Building2 className="w-5 h-5 text-purple-600" />
// // //                     <span>Connected Hospitals</span>
// // //                   </DialogTitle>
// // //                 </DialogHeader>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// // //                   {hospitals.map((hospital) => (
// // //                     <motion.div
// // //                       key={hospital._id}
// // //                       initial={{ opacity: 0, y: 20 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// // //                     >
// // //                       <div className="flex items-start justify-between mb-3">
// // //                         <div className="flex items-center space-x-2">
// // //                           <Building2 className="w-5 h-5 text-purple-600" />
// // //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// // //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// // //                         </div>
// // //                         <div className="flex items-center space-x-2">
// // //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// // //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// // //                           </Badge>
// // //                           {hospital.emergencyServices && (
// // //                             <Badge variant="destructive" className="text-xs">
// // //                               Emergency 24/7
// // //                             </Badge>
// // //                           )}
// // //                         </div>
// // //                       </div>

// // //                       <div className="space-y-2 text-sm">
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <Mail className="w-4 h-4" />
// // //                           <span>{hospital.email}</span>
// // //                         </div>
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <Phone className="w-4 h-4" />
// // //                           <span>{hospital.phone}</span>
// // //                         </div>
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <MapPin className="w-4 h-4" />
// // //                           <span>{hospital.address}</span>
// // //                         </div>
// // //                       </div>

// // //                       <div className="mt-3">
// // //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// // //                         <div className="flex flex-wrap gap-1">
// // //                           {hospital.specialties.map((specialty, index) => (
// // //                             <Badge key={index} variant="outline" className="text-xs">
// // //                               {specialty}
// // //                             </Badge>
// // //                           ))}
// // //                         </div>
// // //                       </div>

// // //                       <div className="mt-3 pt-3 border-t">
// // //                         <p className="text-xs text-gray-500">
// // //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// // //                         </p>
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>
// // //               </DialogContent>
// // //             </Dialog>

// // //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// // //               {notifications > 0 && (
// // //                 <motion.span
// // //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// // //                   animate={{ scale: [1, 1.2, 1] }}
// // //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// // //                 >
// // //                   {notifications}
// // //                 </motion.span>
// // //               )}
// // //             </motion.div>
// // //             <ThemeToggle />
// // //             <UserDropdown />
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-6 py-8">
// // //         {/* Welcome Section */}
// // //         <motion.div
// // //           className="mb-8"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //         >
// // //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// // //           </p>
// // //         </motion.div>

// // //         {/* Emergency SOS Button */}
// // //         <motion.div
// // //           className="mb-8"
// // //           initial={{ opacity: 0, scale: 0.9 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ duration: 0.6, delay: 0.1 }}
// // //         >
// // //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// // //             <CardContent className="p-6">
// // //               <div className="flex items-center justify-between">
// // //                 <div className="flex items-center space-x-4">
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// // //                     animate={{
// // //                       boxShadow: [
// // //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// // //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// // //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// // //                       ],
// // //                     }}
// // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <AlertTriangle className="w-6 h-6 text-white" />
// // //                   </motion.div>
// // //                   <div>
// // //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Support</h3>
// // //                     <p className="text-red-600 dark:text-red-300">Need immediate help? We're here 24/7</p>
// // //                   </div>
// // //                 </div>
// // //                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// // //                   <Button
// // //                     onClick={handleEmergencySOS}
// // //                     disabled={isEmergencyActive}
// // //                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
// // //                   >
// // //                     {isEmergencyActive ? "🚨 Alert Sent..." : "🆘 SOS Emergency"}
// // //                   </Button>
// // //                 </motion.div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </motion.div>

// // //         {/* Quick Stats */}
// // //         <motion.div
// // //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, delay: 0.2 }}
// // //         >
// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// // //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// // //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// // //                     animate={{ rotate: [0, 360] }}
// // //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // //                   >
// // //                     <Target className="w-6 h-6 text-blue-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>

// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// // //                     <div className="flex items-center space-x-2">
// // //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// // //                       <span
// // //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// // //                       >
// // //                         {todayMood?.mood || "Not set"}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       scale: [1, 1.1, 1],
// // //                       rotate: [0, 10, -10, 0],
// // //                     }}
// // //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Brain className="w-6 h-6 text-green-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>

// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// // //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// // //                     <p className="text-xs text-gray-500 mt-1">
// // //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// // //                     </p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       y: [0, -5, 0],
// // //                       opacity: [1, 0.7, 1],
// // //                     }}
// // //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Moon className="w-6 h-6 text-purple-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>

// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// // //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// // //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       scale: [1, 1.2, 1],
// // //                       rotate: [0, 180, 360],
// // //                     }}
// // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Zap className="w-6 h-6 text-orange-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //         </motion.div>

// // //         {/* Main Content Tabs */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, delay: 0.3 }}
// // //         >
// // //           <Tabs defaultValue="mood" className="space-y-6">
// // //             <TabsList className="grid w-full grid-cols-5">
// // //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// // //               <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
// // //               <TabsTrigger value="hospital-posts">Hospital Posts</TabsTrigger>
// // //               <TabsTrigger value="emergency">Emergency History</TabsTrigger>
// // //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// // //             </TabsList>

// // //             {/* Mood Tracking Tab */}
// // //             <TabsContent value="mood" className="space-y-6">
// // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //                 {/* Today's Mood Entry */}
// // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center space-x-2">
// // //                       <Plus className="w-5 h-5" />
// // //                       <span>Log Today's Mood</span>
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-6">
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentMood}
// // //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           {getMoodIcon(currentMood)}
// // //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentEnergy}
// // //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <Zap className="w-5 h-5 text-orange-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentAnxiety}
// // //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="0"
// // //                           max="12"
// // //                           value={currentSleep}
// // //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <Moon className="w-5 h-5 text-purple-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// // //                       <Textarea
// // //                         value={moodNotes}
// // //                         onChange={(e) => setMoodNotes(e.target.value)}
// // //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// // //                         className="w-full"
// // //                         rows={3}
// // //                       />
// // //                     </div>

// // //                     <Button
// // //                       onClick={saveMoodEntry}
// // //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// // //                     >
// // //                       Save Mood Entry
// // //                     </Button>
// // //                   </CardContent>
// // //                 </Card>

// // //                 {/* Mood Chart */}
// // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center space-x-2">
// // //                       <BarChart3 className="w-5 h-5" />
// // //                       <span>7-Day Mood Trend</span>
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     {moodData.length > 0 ? (
// // //                       <div className="space-y-4">
// // //                         {moodData.slice(-7).map((entry, index) => (
// // //                           <motion.div
// // //                             key={index}
// // //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// // //                             initial={{ opacity: 0, x: -20 }}
// // //                             animate={{ opacity: 1, x: 0 }}
// // //                             transition={{ delay: index * 0.1 }}
// // //                           >
// // //                             <div className="flex items-center space-x-3">
// // //                               <Calendar className="w-4 h-4 text-gray-500" />
// // //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// // //                                 {new Date(entry.date).toLocaleDateString()}
// // //                               </span>
// // //                             </div>
// // //                             <div className="flex items-center space-x-3">
// // //                               {getMoodIcon(entry.mood)}
// // //                               <Progress value={entry.mood * 10} className="w-20" />
// // //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// // //                             </div>
// // //                           </motion.div>
// // //                         ))}
// // //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// // //                           <div className="flex items-center justify-between">
// // //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// // //                             <div className="flex items-center space-x-2">
// // //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// // //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ) : (
// // //                       <div className="text-center py-8">
// // //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// // //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// // //                       </div>
// // //                     )}
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </TabsContent>

// // //             {/* Doctor Posts Tab */}
// // //             <TabsContent value="doctor-posts" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <Stethoscope className="w-5 h-5 text-green-600" />
// // //                     <span>Doctor Posts</span>
// // //                     <Badge variant="secondary">{doctorPosts.length} posts</Badge>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {doctorPosts.length > 0 ? (
// // //                     <div className="space-y-4">
// // //                       {doctorPosts.map((post, index) => (
// // //                         <motion.div
// // //                           key={post._id}
// // //                           initial={{ opacity: 0, y: 20 }}
// // //                           animate={{ opacity: 1, y: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                           whileHover={{ scale: 1.01 }}
// // //                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
// // //                         >
// // //                           <div className="flex items-start justify-between mb-3">
// // //                             <div className="flex items-center space-x-3">
// // //                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
// // //                                 <Stethoscope className="w-5 h-5 text-green-600" />
// // //                               </div>
// // //                               <div>
// // //                                 <p className="font-semibold">Dr. {post.authorId.name}</p>
// // //                                 <p className="text-sm text-gray-500">Doctor</p>
// // //                                 {post.mentionedId && (
// // //                                   <p className="text-xs text-blue-600">mentioned {post.mentionedId.name}</p>
// // //                                 )}
// // //                               </div>
// // //                             </div>
// // //                             <div className="flex items-center space-x-2">
// // //                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
// // //                               <span className="text-xs text-gray-500">
// // //                                 {new Date(post.createdAt).toLocaleDateString()}
// // //                               </span>
// // //                             </div>
// // //                           </div>

// // //                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
// // //                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

// // //                           <div className="flex flex-wrap gap-2 mb-4">
// // //                             {post.tags.map((tag, tagIndex) => (
// // //                               <Badge key={tagIndex} variant="secondary" className="text-xs">
// // //                                 #{tag}
// // //                               </Badge>
// // //                             ))}
// // //                           </div>

// // //                           <div className="flex items-center justify-between">
// // //                             <div className="flex items-center space-x-4">
// // //                               <motion.button
// // //                                 whileHover={{ scale: 1.1 }}
// // //                                 whileTap={{ scale: 0.9 }}
// // //                                 onClick={() => handleLikePost(post._id)}
// // //                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// // //                               >
// // //                                 <ThumbsUp className="w-4 h-4" />
// // //                                 <span className="text-sm">{post.likes.length}</span>
// // //                               </motion.button>
// // //                               <div className="flex items-center space-x-2 text-gray-600">
// // //                                 <MessageSquare className="w-4 h-4" />
// // //                                 <span className="text-sm">{post.comments.length}</span>
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12">
// // //                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // //                         No doctor posts yet
// // //                       </h3>
// // //                       <p className="text-gray-500">Doctor posts will appear here when available</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>

// // //             {/* Hospital Posts Tab */}
// // //             <TabsContent value="hospital-posts" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <Building2 className="w-5 h-5 text-purple-600" />
// // //                     <span>Hospital Posts</span>
// // //                     <Badge variant="secondary">{hospitalPosts.length} posts</Badge>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {hospitalPosts.length > 0 ? (
// // //                     <div className="space-y-4">
// // //                       {hospitalPosts.map((post, index) => (
// // //                         <motion.div
// // //                           key={post._id}
// // //                           initial={{ opacity: 0, y: 20 }}
// // //                           animate={{ opacity: 1, y: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                           whileHover={{ scale: 1.01 }}
// // //                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
// // //                         >
// // //                           <div className="flex items-start justify-between mb-3">
// // //                             <div className="flex items-center space-x-3">
// // //                               <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// // //                                 <Building2 className="w-5 h-5 text-purple-600" />
// // //                               </div>
// // //                               <div>
// // //                                 <p className="font-semibold">{post.authorId.name}</p>
// // //                                 <p className="text-sm text-gray-500">Hospital</p>
// // //                                 {post.mentionedId && (
// // //                                   <p className="text-xs text-blue-600">mentioned Dr. {post.mentionedId.name}</p>
// // //                                 )}
// // //                               </div>
// // //                             </div>
// // //                             <div className="flex items-center space-x-2">
// // //                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
// // //                               <span className="text-xs text-gray-500">
// // //                                 {new Date(post.createdAt).toLocaleDateString()}
// // //                               </span>
// // //                             </div>
// // //                           </div>

// // //                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
// // //                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

// // //                           <div className="flex flex-wrap gap-2 mb-4">
// // //                             {post.tags.map((tag, tagIndex) => (
// // //                               <Badge key={tagIndex} variant="secondary" className="text-xs">
// // //                                 #{tag}
// // //                               </Badge>
// // //                             ))}
// // //                           </div>

// // //                           <div className="flex items-center justify-between">
// // //                             <div className="flex items-center space-x-4">
// // //                               <motion.button
// // //                                 whileHover={{ scale: 1.1 }}
// // //                                 whileTap={{ scale: 0.9 }}
// // //                                 onClick={() => handleLikePost(post._id)}
// // //                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// // //                               >
// // //                                 <ThumbsUp className="w-4 h-4" />
// // //                                 <span className="text-sm">{post.likes.length}</span>
// // //                               </motion.button>
// // //                               <div className="flex items-center space-x-2 text-gray-600">
// // //                                 <MessageSquare className="w-4 h-4" />
// // //                                 <span className="text-sm">{post.comments.length}</span>
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12">
// // //                       <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // //                         No hospital posts yet
// // //                       </h3>
// // //                       <p className="text-gray-500">Hospital posts will appear here when available</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>

// // //             {/* Emergency History Tab */}
// // //             <TabsContent value="emergency" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <Shield className="w-5 h-5" />
// // //                     <span>Emergency Alert History</span>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {emergencyAlerts.length > 0 ? (
// // //                     <div className="space-y-4">
// // //                       {emergencyAlerts.map((alert, index) => (
// // //                         <motion.div
// // //                           key={alert._id}
// // //                           className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
// // //                           initial={{ opacity: 0, x: -20 }}
// // //                           animate={{ opacity: 1, x: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                         >
// // //                           <div className="flex items-center space-x-4">
// // //                             <div
// // //                               className={`w-3 h-3 rounded-full ${
// // //                                 alert.status === "accepted"
// // //                                   ? "bg-green-500"
// // //                                   : alert.status === "pending"
// // //                                     ? "bg-yellow-500"
// // //                                     : alert.status === "completed"
// // //                                       ? "bg-blue-500"
// // //                                       : "bg-gray-500"
// // //                               }`}
// // //                             />
// // //                             <div>
// // //                               <p className="font-medium">Emergency Alert</p>
// // //                               <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
// // //                                 <Clock className="w-4 h-4 mr-1" />
// // //                                 {new Date(alert.createdAt).toLocaleString()}
// // //                               </p>
// // //                               {alert.acceptedBy && (
// // //                                 <p className="text-sm text-green-600 dark:text-green-400">
// // //                                   Handled by: {alert.acceptedBy.name}
// // //                                 </p>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                           <div className="flex items-center space-x-2">
// // //                             <Badge
// // //                               variant={
// // //                                 alert.priority === "critical"
// // //                                   ? "destructive"
// // //                                   : alert.priority === "high"
// // //                                     ? "default"
// // //                                     : "secondary"
// // //                               }
// // //                             >
// // //                               {alert.priority}
// // //                             </Badge>
// // //                             <Badge
// // //                               variant={
// // //                                 alert.status === "accepted"
// // //                                   ? "default"
// // //                                   : alert.status === "pending"
// // //                                     ? "secondary"
// // //                                     : "outline"
// // //                               }
// // //                             >
// // //                               {alert.status}
// // //                             </Badge>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-8">
// // //                       <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // //                       <p className="text-gray-600 dark:text-gray-400">No emergency alerts</p>
// // //                       <p className="text-sm text-gray-500">Your emergency history will appear here</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>

// // //             {/* Self Assessment Tab */}
// // //             <TabsContent value="assessment" className="space-y-6">
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 {[
// // //                   {
// // //                     icon: Brain,
// // //                     title: "Depression Assessment (PHQ-9)",
// // //                     desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// // //                     color: "blue",
// // //                   },
// // //                   {
// // //                     icon: AlertTriangle,
// // //                     title: "Anxiety Assessment (GAD-7)",
// // //                     desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// // //                     color: "yellow",
// // //                   },
// // //                   {
// // //                     icon: Zap,
// // //                     title: "Stress Level Check",
// // //                     desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// // //                     color: "red",
// // //                   },
// // //                   {
// // //                     icon: Heart,
// // //                     title: "General Wellness Check",
// // //                     desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// // //                     color: "green",
// // //                   },
// // //                 ].map((assessment, index) => (
// // //                   <motion.div
// // //                     key={index}
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ delay: index * 0.1 }}
// // //                     whileHover={{ scale: 1.02, y: -5 }}
// // //                   >
// // //                     <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
// // //                       <CardHeader>
// // //                         <CardTitle className="flex items-center space-x-2">
// // //                           <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// // //                           <span>{assessment.title}</span>
// // //                         </CardTitle>
// // //                       </CardHeader>
// // //                       <CardContent>
// // //                         <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// // //                         <Button className={`w-full group-hover:bg-${assessment.color}-600`}>Start Assessment</Button>
// // //                       </CardContent>
// // //                     </Card>
// // //                   </motion.div>
// // //                 ))}
// // //               </div>
// // //             </TabsContent>
// // //           </Tabs>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   )
// // // }


// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import {
// //   Heart,
// //   AlertTriangle,
// //   Shield,
// //   Brain,
// //   Target,
// //   Zap,
// //   Moon,
// //   Smile,
// //   Frown,
// //   Meh,
// //   Plus,
// //   BarChart3,
// //   TrendingUp,
// //   Calendar,
// //   Clock,
// //   Bell,
// //   MessageSquare,
// //   ThumbsUp,
// //   Building2,
// //   Stethoscope,
// //   MapPin,
// //   Phone,
// //   Mail,
// //   Award,
// //   CheckCircle,
// // } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Progress } from "@/components/ui/progress"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { useAuth } from "@/hooks/useAuth"
// // import ThemeToggle from "@/components/ThemeToggle"
// // import UserDropdown from "@/components/UserDropdown"
// // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // import { toast } from "react-hot-toast"

// // interface MoodData {
// //   date: string
// //   mood: number
// //   energy: number
// //   anxiety: number
// //   sleep: number
// //   notes?: string
// // }

// // interface EmergencyAlert {
// //   _id: string
// //   status: string
// //   priority: string
// //   createdAt: string
// //   location?: {
// //     lat?: number
// //     lng?: number
// //     address?: {
// //       street?: string
// //       area?: string
// //       townOrVillage?: string
// //     }
// //   }
// //   acceptedBy?: {
// //     name: string
// //   }
// // }

// // interface Post {
// //   _id: string
// //   title: string
// //   content: string
// //   category: string
// //   tags: string[]
// //   authorId: {
// //     _id: string
// //     name: string
// //   }
// //   authorType: string
// //   mentionedId?: {
// //     _id: string
// //     name: string
// //   }
// //   mentionedType?: string
// //   likes: string[]
// //   comments: Array<{
// //     userId: string
// //     userName: string
// //     content: string
// //     createdAt: string
// //   }>
// //   createdAt: string
// //   isApproved: boolean
// // }

// // interface Hospital {
// //   _id: string
// //   name: string
// //   email: string
// //   phone: string
// //   address: string
// //   specialties: string[]
// //   isVerified: boolean
// //   isAvailable: boolean
// //   emergencyServices: boolean
// //   createdAt: string
// // }

// // export default function UserDashboard() {
// //   const { user } = useAuth()
// //   const [moodData, setMoodData] = useState<MoodData[]>([])
// //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// //   const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
// //   const [hospitalPosts, setHospitalPosts] = useState<Post[]>([])
// //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [notifications, setNotifications] = useState(0)
// //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
// //   const [pendingAlert, setPendingAlert] = useState<EmergencyAlert | null>(null)
// //   const [showAlertNotification, setShowAlertNotification] = useState(false)
// //   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)

// //   // Mood tracking state
// //   const [currentMood, setCurrentMood] = useState(5)
// //   const [currentEnergy, setCurrentEnergy] = useState(5)
// //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// //   const [currentSleep, setCurrentSleep] = useState(8)
// //   const [moodNotes, setMoodNotes] = useState("")

// //   useEffect(() => {
// //     fetchDashboardData()
// //     requestLocation()
// //   }, [])

// //   const fetchDashboardData = async () => {
// //     try {
// //       const [moodRes, alertsRes, doctorPostsRes, hospitalPostsRes, hospitalsRes] = await Promise.all([
// //         fetch("/api/user/mood-data"),
// //         fetch("/api/user/emergency-alerts"),
// //         fetch("/api/user/doctor-posts"),
// //         fetch("/api/user/hospital-posts"),
// //         fetch("/api/user/hospitals"),
// //       ])

// //       if (moodRes.ok) {
// //         const moodData = await moodRes.json()
// //         setMoodData(moodData.data || [])
// //         setTodayMood(moodData.today || null)
// //       }

// //       if (alertsRes.ok) {
// //         const alertsData = await alertsRes.json()
// //         setEmergencyAlerts(alertsData.data || [])

// //         // Check for pending alerts
// //         const pendingAlerts =
// //           alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []

// //         if (pendingAlerts.length > 0) {
// //           setPendingAlert(pendingAlerts[0])
// //         }
// //       }

// //       if (doctorPostsRes.ok) {
// //         const doctorPostsData = await doctorPostsRes.json()
// //         setDoctorPosts(doctorPostsData.data || [])
// //       }

// //       if (hospitalPostsRes.ok) {
// //         const hospitalPostsData = await hospitalPostsRes.json()
// //         setHospitalPosts(hospitalPostsData.data || [])
// //       }

// //       if (hospitalsRes.ok) {
// //         const hospitalsData = await hospitalsRes.json()
// //         setHospitals(hospitalsData.data || [])
// //       }

// //       setNotifications(
// //         (doctorPostsRes.ok ? (await doctorPostsRes.json()).data?.length || 0 : 0) +
// //           (hospitalPostsRes.ok ? (await hospitalPostsRes.json()).data?.length || 0 : 0),
// //       )
// //     } catch (error) {
// //       console.error("Error fetching dashboard data:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const requestLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setLocation({
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           })
// //           console.log("📍 Location obtained:", {
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           })
// //         },
// //         (error) => {
// //           console.log("📍 Location access denied:", error.message)
// //           toast.error("Location access denied. Emergency alerts will use your registered address.")
// //         },
// //       )
// //     } else {
// //       console.log("📍 Geolocation not supported")
// //       toast.error("Geolocation not supported by this browser.")
// //     }
// //   }

// //   const handleEmergencySOS = async () => {
// //     if (isEmergencyActive) return

// //     setIsEmergencyActive(true)

// //     // Request location again if not available
// //     if (!location && navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         async (position) => {
// //           const currentLocation = {
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           }
// //           setLocation(currentLocation)
// //           await sendEmergencyAlert(currentLocation)
// //         },
// //         async (error) => {
// //           console.log("📍 Location denied for emergency:", error.message)
// //           await sendEmergencyAlert(null)
// //         },
// //       )
// //     } else {
// //       await sendEmergencyAlert(location)
// //     }
// //   }

// //   const sendEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
// //     try {
// //      console.log("\nwe are in user dashboard 🚨 Sending emergency alert...")
// //       const response = await fetch("/api/user/emergency-alert", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           location: currentLocation,
// //           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
// //         }),
// //       })

// //       const data = await response.json()

// //       if (response.ok) {
// //         toast.success("🚨 Emergency alert saved to database! Alert ID: " + data.alertId)

// //         // Set 3-minute timer for hospital response check
// //         const timer = setTimeout(() => {
// //           setShowAlertNotification(true)
// //           toast.error("⚠️ Hospitals haven't responded yet. Alert escalated!", {
// //             duration: 10000,
// //           })
// //         }, 180000) // 3 minutes

// //         setAlertTimer(timer)

// //         // Refresh alerts to get the new one
// //         setTimeout(() => {
// //           fetchDashboardData()
// //         }, 1000)

// //         // Reset emergency button after 5 minutes
// //         setTimeout(() => setIsEmergencyActive(false), 300000) // 5 minutes
// //       } else {
// //         toast.error(data.message || "Failed to save emergency alert")
// //         setIsEmergencyActive(false)
// //       }
// //     } catch (error) {
// //       console.error("Emergency alert error:", error)
// //       toast.error("Emergency system error. Please try again.")
// //       setIsEmergencyActive(false)
// //     }
// //   }

// //   const dismissAlert = async () => {
// //     if (!pendingAlert) return

// //     try {
// //       const response = await fetch("/api/user/dismiss-alert", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ alertId: pendingAlert._id }),
// //       })

// //       if (response.ok) {
// //         setShowAlertNotification(false)
// //         setPendingAlert(null)
// //         if (alertTimer) {
// //           clearTimeout(alertTimer)
// //           setAlertTimer(null)
// //         }
// //         toast.success("Alert dismissed")
// //         fetchDashboardData()
// //       }
// //     } catch (error) {
// //       console.error("Error dismissing alert:", error)
// //       toast.error("Failed to dismiss alert")
// //     }
// //   }

// //   const saveMoodEntry = async () => {
// //     try {
// //       const response = await fetch("/api/user/mood-entry", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           mood: currentMood,
// //           energy: currentEnergy,
// //           anxiety: currentAnxiety,
// //           sleep: currentSleep,
// //           notes: moodNotes,
// //         }),
// //       })

// //       if (response.ok) {
// //         toast.success("✅ Mood entry saved!")
// //         fetchDashboardData()
// //         setMoodNotes("")
// //       } else {
// //         toast.error("Failed to save mood entry")
// //       }
// //     } catch (error) {
// //       toast.error("Error saving mood entry")
// //     }
// //   }

// //   const handleLikePost = async (postId: string) => {
// //     try {
// //       const response = await fetch("/api/user/like-post", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ postId }),
// //       })

// //       if (response.ok) {
// //         fetchDashboardData()
// //         toast.success("👍 Post liked!")
// //       }
// //     } catch (error) {
// //       console.error("Error liking post:", error)
// //     }
// //   }

// //   const getMoodIcon = (mood: number) => {
// //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// //     return <Frown className="w-6 h-6 text-red-500" />
// //   }

// //   const getMoodColor = (mood: number) => {
// //     if (mood >= 8) return "text-green-600"
// //     if (mood >= 6) return "text-yellow-600"
// //     return "text-red-600"
// //   }

// //   const getWellnessScore = () => {
// //     if (!todayMood) return 0
// //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// //     return Math.round(score * 10)
// //   }

// //   const getWeeklyAverage = () => {
// //     if (moodData.length === 0) return 0
// //     const recentData = moodData.slice(-7)
// //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// //     return Math.round(avgMood * 10) / 10
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <motion.div
// //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           />
// //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// //       {/* Emergency Alert Notification */}
// //       <AnimatePresence>
// //         {showAlertNotification && pendingAlert && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -100 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -100 }}
// //             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
// //           >
// //             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
// //               <AlertTriangle className="h-4 w-4 text-red-600" />
// //               <AlertDescription className="flex items-center justify-between">
// //                 <div>
// //                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
// //                   <p className="text-red-700 dark:text-red-300 text-sm">
// //                     Your emergency alert is still pending. Consider calling emergency services directly.
// //                   </p>
// //                 </div>
// //                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
// //                   <CheckCircle className="w-4 h-4" />
// //                 </Button>
// //               </AlertDescription>
// //             </Alert>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Header with Animated Icons */}
// //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// //         <AnimatedHealthIcons />
// //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// //           <div className="flex items-center space-x-4">
// //             <motion.div
// //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// //               animate={{
// //                 scale: [1, 1.1, 1],
// //                 rotate: [0, 5, -5, 0],
// //               }}
// //               transition={{
// //                 duration: 3,
// //                 repeat: Number.POSITIVE_INFINITY,
// //                 ease: "easeInOut",
// //               }}
// //             >
// //               <Heart className="w-6 h-6 text-white" />
// //             </motion.div>
// //             <div>
// //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// //             </div>
// //           </div>

// //           <div className="flex items-center space-x-4">
// //             {/* Hospital Info Button */}
// //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// //               <DialogTrigger asChild>
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// //                 >
// //                   <Building2 className="w-4 h-4" />
// //                   <span className="text-sm font-medium">Hospital Info</span>
// //                 </motion.button>
// //               </DialogTrigger>
// //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// //                 <DialogHeader>
// //                   <DialogTitle className="flex items-center space-x-2">
// //                     <Building2 className="w-5 h-5 text-purple-600" />
// //                     <span>Connected Hospitals</span>
// //                   </DialogTitle>
// //                 </DialogHeader>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// //                   {hospitals.map((hospital) => (
// //                     <motion.div
// //                       key={hospital._id}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// //                     >
// //                       <div className="flex items-start justify-between mb-3">
// //                         <div className="flex items-center space-x-2">
// //                           <Building2 className="w-5 h-5 text-purple-600" />
// //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// //                           </Badge>
// //                           {hospital.emergencyServices && (
// //                             <Badge variant="destructive" className="text-xs">
// //                               Emergency 24/7
// //                             </Badge>
// //                           )}
// //                         </div>
// //                       </div>

// //                       <div className="space-y-2 text-sm">
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <Mail className="w-4 h-4" />
// //                           <span>{hospital.email}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <Phone className="w-4 h-4" />
// //                           <span>{hospital.phone}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <MapPin className="w-4 h-4" />
// //                           <span>{hospital.address}</span>
// //                         </div>
// //                       </div>

// //                       <div className="mt-3">
// //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// //                         <div className="flex flex-wrap gap-1">
// //                           {hospital.specialties.map((specialty, index) => (
// //                             <Badge key={index} variant="outline" className="text-xs">
// //                               {specialty}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       <div className="mt-3 pt-3 border-t">
// //                         <p className="text-xs text-gray-500">
// //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// //                         </p>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </DialogContent>
// //             </Dialog>

// //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// //               {notifications > 0 && (
// //                 <motion.span
// //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// //                   animate={{ scale: [1, 1.2, 1] }}
// //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// //                 >
// //                   {notifications}
// //                 </motion.span>
// //               )}
// //             </motion.div>
// //             <ThemeToggle />
// //             <UserDropdown />
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-6 py-8">
// //         {/* Welcome Section */}
// //         <motion.div
// //           className="mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// //           </p>
// //         </motion.div>

// //         {/* Emergency SOS Button */}
// //         <motion.div
// //           className="mb-8"
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.6, delay: 0.1 }}
// //         >
// //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-4">
// //                   <motion.div
// //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// //                     animate={{
// //                       boxShadow: [
// //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// //                       ],
// //                     }}
// //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <AlertTriangle className="w-6 h-6 text-white" />
// //                   </motion.div>
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Support</h3>
// //                     <p className="text-red-600 dark:text-red-300">Need immediate help? We're here 24/7</p>
// //                     {location && (
// //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// //                         📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// //                   <Button
// //                     onClick={handleEmergencySOS}
// //                     disabled={isEmergencyActive}
// //                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
// //                   >
// //                     {isEmergencyActive ? "🚨 Alert Sent..." : "🆘 SOS Emergency"}
// //                   </Button>
// //                 </motion.div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         {/* Quick Stats */}
// //         <motion.div
// //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.2 }}
// //         >
// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// //                     animate={{ rotate: [0, 360] }}
// //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //                   >
// //                     <Target className="w-6 h-6 text-blue-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>

// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// //                     <div className="flex items-center space-x-2">
// //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// //                       <span
// //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// //                       >
// //                         {todayMood?.mood || "Not set"}
// //                       </span>
// //                     </div>
// //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       scale: [1, 1.1, 1],
// //                       rotate: [0, 10, -10, 0],
// //                     }}
// //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Brain className="w-6 h-6 text-green-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>

// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// //                     </p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       y: [0, -5, 0],
// //                       opacity: [1, 0.7, 1],
// //                     }}
// //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Moon className="w-6 h-6 text-purple-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>

// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       scale: [1, 1.2, 1],
// //                       rotate: [0, 180, 360],
// //                     }}
// //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Zap className="w-6 h-6 text-orange-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         </motion.div>

// //         {/* Main Content Tabs */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.3 }}
// //         >
// //           <Tabs defaultValue="mood" className="space-y-6">
// //             <TabsList className="grid w-full grid-cols-5">
// //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// //               <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
// //               <TabsTrigger value="hospital-posts">Hospital Posts</TabsTrigger>
// //               <TabsTrigger value="emergency">Emergency History</TabsTrigger>
// //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// //             </TabsList>

// //             {/* Mood Tracking Tab */}
// //             <TabsContent value="mood" className="space-y-6">
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 {/* Today's Mood Entry */}
// //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center space-x-2">
// //                       <Plus className="w-5 h-5" />
// //                       <span>Log Today's Mood</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="space-y-6">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentMood}
// //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           {getMoodIcon(currentMood)}
// //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentEnergy}
// //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <Zap className="w-5 h-5 text-orange-500" />
// //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentAnxiety}
// //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="0"
// //                           max="12"
// //                           value={currentSleep}
// //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <Moon className="w-5 h-5 text-purple-500" />
// //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// //                       <Textarea
// //                         value={moodNotes}
// //                         onChange={(e) => setMoodNotes(e.target.value)}
// //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// //                         className="w-full"
// //                         rows={3}
// //                       />
// //                     </div>

// //                     <Button
// //                       onClick={saveMoodEntry}
// //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// //                     >
// //                       Save Mood Entry
// //                     </Button>
// //                   </CardContent>
// //                 </Card>

// //                 {/* Mood Chart */}
// //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center space-x-2">
// //                       <BarChart3 className="w-5 h-5" />
// //                       <span>7-Day Mood Trend</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     {moodData.length > 0 ? (
// //                       <div className="space-y-4">
// //                         {moodData.slice(-7).map((entry, index) => (
// //                           <motion.div
// //                             key={index}
// //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// //                             initial={{ opacity: 0, x: -20 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             transition={{ delay: index * 0.1 }}
// //                           >
// //                             <div className="flex items-center space-x-3">
// //                               <Calendar className="w-4 h-4 text-gray-500" />
// //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// //                                 {new Date(entry.date).toLocaleDateString()}
// //                               </span>
// //                             </div>
// //                             <div className="flex items-center space-x-3">
// //                               {getMoodIcon(entry.mood)}
// //                               <Progress value={entry.mood * 10} className="w-20" />
// //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// //                           <div className="flex items-center justify-between">
// //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// //                             <div className="flex items-center space-x-2">
// //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div className="text-center py-8">
// //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </TabsContent>

// //             {/* Emergency History Tab */}
// //             <TabsContent value="emergency" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Shield className="w-5 h-5" />
// //                     <span>Emergency Alert History</span>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {emergencyAlerts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {emergencyAlerts.map((alert, index) => (
// //                         <motion.div
// //                           key={alert._id}
// //                           className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
// //                           initial={{ opacity: 0, x: -20 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                         >
// //                           <div className="flex items-center space-x-4">
// //                             <div
// //                               className={`w-3 h-3 rounded-full ${
// //                                 alert.status === "accepted"
// //                                   ? "bg-green-500"
// //                                   : alert.status === "pending"
// //                                     ? "bg-yellow-500"
// //                                     : alert.status === "completed"
// //                                       ? "bg-blue-500"
// //                                       : "bg-gray-500"
// //                               }`}
// //                             />
// //                             <div>
// //                               <p className="font-medium">Emergency Alert</p>
// //                               <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
// //                                 <Clock className="w-4 h-4 mr-1" />
// //                                 {new Date(alert.createdAt).toLocaleString()}
// //                               </p>
// //                               {alert.location?.lat && alert.location?.lng && (
// //                                 <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
// //                                   <MapPin className="w-3 h-3 mr-1" />
// //                                   {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
// //                                 </p>
// //                               )}
// //                               {alert.acceptedBy && (
// //                                 <p className="text-sm text-green-600 dark:text-green-400">
// //                                   Handled by: {alert.acceptedBy.name}
// //                                 </p>
// //                               )}
// //                             </div>
// //                           </div>
// //                           <div className="flex items-center space-x-2">
// //                             <Badge
// //                               variant={
// //                                 alert.priority === "critical"
// //                                   ? "destructive"
// //                                   : alert.priority === "high"
// //                                     ? "default"
// //                                     : "secondary"
// //                               }
// //                             >
// //                               {alert.priority}
// //                             </Badge>
// //                             <Badge
// //                               variant={
// //                                 alert.status === "accepted"
// //                                   ? "default"
// //                                   : alert.status === "pending"
// //                                     ? "secondary"
// //                                     : "outline"
// //                               }
// //                             >
// //                               {alert.status}
// //                             </Badge>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-8">
// //                       <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                       <p className="text-gray-600 dark:text-gray-400">No emergency alerts</p>
// //                       <p className="text-sm text-gray-500">Your emergency history will appear here</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Other tabs remain the same... */}
// //             {/* Doctor Posts Tab */}
// //             <TabsContent value="doctor-posts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Stethoscope className="w-5 h-5 text-green-600" />
// //                     <span>Doctor Posts</span>
// //                     <Badge variant="secondary">{doctorPosts.length} posts</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {doctorPosts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {doctorPosts.map((post, index) => (
// //                         <motion.div
// //                           key={post._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           whileHover={{ scale: 1.01 }}
// //                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
// //                         >
// //                           <div className="flex items-start justify-between mb-3">
// //                             <div className="flex items-center space-x-3">
// //                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
// //                                 <Stethoscope className="w-5 h-5 text-green-600" />
// //                               </div>
// //                               <div>
// //                                 <p className="font-semibold">Dr. {post.authorId.name}</p>
// //                                 <p className="text-sm text-gray-500">Doctor</p>
// //                                 {post.mentionedId && (
// //                                   <p className="text-xs text-blue-600">mentioned {post.mentionedId.name}</p>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
// //                               <span className="text-xs text-gray-500">
// //                                 {new Date(post.createdAt).toLocaleDateString()}
// //                               </span>
// //                             </div>
// //                           </div>

// //                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
// //                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

// //                           <div className="flex flex-wrap gap-2 mb-4">
// //                             {post.tags.map((tag, tagIndex) => (
// //                               <Badge key={tagIndex} variant="secondary" className="text-xs">
// //                                 #{tag}
// //                               </Badge>
// //                             ))}
// //                           </div>

// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center space-x-4">
// //                               <motion.button
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                                 onClick={() => handleLikePost(post._id)}
// //                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// //                               >
// //                                 <ThumbsUp className="w-4 h-4" />
// //                                 <span className="text-sm">{post.likes.length}</span>
// //                               </motion.button>
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <MessageSquare className="w-4 h-4" />
// //                                 <span className="text-sm">{post.comments.length}</span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No doctor posts yet
// //                       </h3>
// //                       <p className="text-gray-500">Doctor posts will appear here when available</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Hospital Posts Tab */}
// //             <TabsContent value="hospital-posts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Building2 className="w-5 h-5 text-purple-600" />
// //                     <span>Hospital Posts</span>
// //                     <Badge variant="secondary">{hospitalPosts.length} posts</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {hospitalPosts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {hospitalPosts.map((post, index) => (
// //                         <motion.div
// //                           key={post._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           whileHover={{ scale: 1.01 }}
// //                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
// //                         >
// //                           <div className="flex items-start justify-between mb-3">
// //                             <div className="flex items-center space-x-3">
// //                               <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// //                                 <Building2 className="w-5 h-5 text-purple-600" />
// //                               </div>
// //                               <div>
// //                                 <p className="font-semibold">{post.authorId.name}</p>
// //                                 <p className="text-sm text-gray-500">Hospital</p>
// //                                 {post.mentionedId && (
// //                                   <p className="text-xs text-blue-600">mentioned Dr. {post.mentionedId.name}</p>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
// //                               <span className="text-xs text-gray-500">
// //                                 {new Date(post.createdAt).toLocaleDateString()}
// //                               </span>
// //                             </div>
// //                           </div>

// //                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
// //                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

// //                           <div className="flex flex-wrap gap-2 mb-4">
// //                             {post.tags.map((tag, tagIndex) => (
// //                               <Badge key={tagIndex} variant="secondary" className="text-xs">
// //                                 #{tag}
// //                               </Badge>
// //                             ))}
// //                           </div>

// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center space-x-4">
// //                               <motion.button
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                                 onClick={() => handleLikePost(post._id)}
// //                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
// //                               >
// //                                 <ThumbsUp className="w-4 h-4" />
// //                                 <span className="text-sm">{post.likes.length}</span>
// //                               </motion.button>
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <MessageSquare className="w-4 h-4" />
// //                                 <span className="text-sm">{post.comments.length}</span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No hospital posts yet
// //                       </h3>
// //                       <p className="text-gray-500">Hospital posts will appear here when available</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Self Assessment Tab */}
// //             <TabsContent value="assessment" className="space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {[
// //                   {
// //                     icon: Brain,
// //                     title: "Depression Assessment (PHQ-9)",
// //                     desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// //                     color: "blue",
// //                   },
// //                   {
// //                     icon: AlertTriangle,
// //                     title: "Anxiety Assessment (GAD-7)",
// //                     desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// //                     color: "yellow",
// //                   },
// //                   {
// //                     icon: Zap,
// //                     title: "Stress Level Check",
// //                     desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// //                     color: "red",
// //                   },
// //                   {
// //                     icon: Heart,
// //                     title: "General Wellness Check",
// //                     desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// //                     color: "green",
// //                   },
// //                 ].map((assessment, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: index * 0.1 }}
// //                     whileHover={{ scale: 1.02, y: -5 }}
// //                   >
// //                     <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
// //                       <CardHeader>
// //                         <CardTitle className="flex items-center space-x-2">
// //                           <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// //                           <span>{assessment.title}</span>
// //                         </CardTitle>
// //                       </CardHeader>
// //                       <CardContent>
// //                         <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// //                         <Button className={`w-full group-hover:bg-${assessment.color}-600`}>Start Assessment</Button>
// //                       </CardContent>
// //                     </Card>
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </TabsContent>
// //           </Tabs>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Heart,
//   AlertTriangle,
//   Shield,
//   Brain,
//   Target,
//   Zap,
//   Moon,
//   Smile,
//   Frown,
//   Meh,
//   Plus,
//   BarChart3,
//   TrendingUp,
//   Calendar,
//   Clock,
//   Bell,
//   MessageSquare,
//   ThumbsUp,
//   Building2,
//   Stethoscope,
//   MapPin,
//   Phone,
//   Mail,
//   Award,
//   CheckCircle,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useAuth } from "@/hooks/useAuth"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"

// interface MoodData {
//   date: string
//   mood: number
//   energy: number
//   anxiety: number
//   sleep: number
//   notes?: string
// }

// interface EmergencyAlert {
//   _id: string
//   status: string
//   priority: string
//   createdAt: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   location?: {
//     lat?: number
//     lng?: number
//     address?: {
//       street?: string
//       area?: string
//       townOrVillage?: string
//       taluka?: string
//       district?: string
//       pincode?: string
//       geoLocation?: {
//         lat?: number
//         lng?: number
//       }
//     }
//   }
//   acceptedBy?: {
//     name: string
//   }
// }

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorId: {
//     _id: string
//     name: string
//   }
//   authorType: string
//   mentionedId?: {
//     _id: string
//     name: string
//   }
//   mentionedType?: string
//   likes: string[]
//   comments: Array<{
//     userId: string
//     userName: string
//     content: string
//     createdAt: string
//   }>
//   createdAt: string
//   isApproved: boolean
// }

// interface Hospital {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   address: string
//   specialties: string[]
//   isVerified: boolean
//   isAvailable: boolean
//   emergencyServices: boolean
//   createdAt: string
// }

// export default function UserDashboard() {
//   const { user } = useAuth()
//   const [moodData, setMoodData] = useState<MoodData[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
//   const [hospitalPosts, setHospitalPosts] = useState<Post[]>([])
//   const [hospitals, setHospitals] = useState<Hospital[]>([])
//   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
//   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
//   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertNotification, setShowAlertNotification] = useState(false)
//   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
//   const [checkCount, setCheckCount] = useState(0)

//   // Mood tracking state
//   const [currentMood, setCurrentMood] = useState(5)
//   const [currentEnergy, setCurrentEnergy] = useState(5)
//   const [currentAnxiety, setCurrentAnxiety] = useState(5)
//   const [currentSleep, setCurrentSleep] = useState(8)
//   const [moodNotes, setMoodNotes] = useState("")

//   useEffect(() => {
//     fetchDashboardData()
//     requestLocation()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       const [moodRes, alertsRes, doctorPostsRes, hospitalPostsRes, hospitalsRes] = await Promise.all([
//         fetch("/api/user/mood-data"),
//         fetch("/api/user/emergency-alerts"),
//         fetch("/api/user/doctor-posts"),
//         fetch("/api/user/hospital-posts"),
//         fetch("/api/user/hospitals"),
//       ])

//       if (moodRes.ok) {
//         const moodData = await moodRes.json()
//         setMoodData(moodData.data || [])
//         setTodayMood(moodData.today || null)
//       }

//       if (alertsRes.ok) {
//         const alertsData = await alertsRes.json()
//         setEmergencyAlerts(alertsData.data || [])

//         // Check for pending alerts
//         const pendingAlerts =
//           alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []

//         if (pendingAlerts.length > 0) {
//           setCurrentAlert(pendingAlerts[0])
//         }
//       }

//       if (doctorPostsRes.ok) {
//         const doctorPostsData = await doctorPostsRes.json()
//         setDoctorPosts(doctorPostsData.data || [])
//       }

//       if (hospitalPostsRes.ok) {
//         const hospitalPostsData = await hospitalPostsRes.json()
//         setHospitalPosts(hospitalPostsData.data || [])
//       }

//       if (hospitalsRes.ok) {
//         const hospitalsData = await hospitalsRes.json()
//         setHospitals(hospitalsData.data || [])
//       }

//       setNotifications(
//         (doctorPostsRes.ok ? (await doctorPostsRes.json()).data?.length || 0 : 0) +
//           (hospitalPostsRes.ok ? (await hospitalPostsRes.json()).data?.length || 0 : 0),
//       )
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const requestLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           })
//           console.log("📍 Location obtained:", {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           })
//         },
//         (error) => {
//           console.log("📍 Location access denied:", error.message)
//           toast.error("Location access denied. Emergency alerts will use your registered address.")
//         },
//       )
//     } else {
//       console.log("📍 Geolocation not supported")
//       toast.error("Geolocation not supported by this browser.")
//     }
//   }

//   const checkAlertStatus = async (alertId: string) => {
//     try {
//       const response = await fetch("/api/user/check-alert-status", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId }),
//       })

//       const data = await response.json()

//       if (response.ok && data.alert) {
//         console.log("🔍 Alert status check:", data.alert.status)

//         if (data.alert.status !== "pending") {
//           // Status changed - hospital responded!
//           setShowAlertNotification(false)
//           setCurrentAlert(null)
//           if (alertTimer) {
//             clearTimeout(alertTimer)
//             setAlertTimer(null)
//           }

//           toast.success(`🏥 Hospital is coming! Status: ${data.alert.status}`, {
//             duration: 8000,
//           })

//           fetchDashboardData() // Refresh data
//           return true // Status changed
//         }

//         return false // Still pending
//       }
//     } catch (error) {
//       console.error("Error checking alert status:", error)
//     }
//     return false
//   }

//   const startAlertMonitoring = (alertId: string) => {
//     let checkCounter = 0

//     const checkStatus = async () => {
//       checkCounter++
//       console.log(`⏰ Alert check #${checkCounter} for alert ${alertId}`)

//       const statusChanged = await checkAlertStatus(alertId)

//       if (statusChanged) {
//         // Hospital responded - stop monitoring
//         return
//       }

//       if (checkCounter === 1) {
//         // First check (3 minutes) - show notification
//         setShowAlertNotification(true)
//         toast.error("⚠️ Hospitals haven't responded yet. Alert escalated!", {
//           duration: 10000,
//         })

//         // Schedule second check after another 3 minutes
//         setTimeout(checkStatus, 180000) // 3 minutes
//       } else if (checkCounter === 2) {
//         // Second check (6 minutes total) - final check
//         toast.error("🚨 Still no response from hospitals. Please call emergency services directly!", {
//           duration: 15000,
//         })
//       }
//     }

//     // Start first check after 3 minutes
//     const timer = setTimeout(checkStatus, 180000) // 3 minutes
//     setAlertTimer(timer)
//   }

//   const handleEmergencySOS = async () => {
//     if (isEmergencyActive) return

//     setIsEmergencyActive(true)

//     // Request location again if not available
//     if (!location && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           }
//           setLocation(currentLocation)
//           await sendEmergencyAlert(currentLocation)
//         },
//         async (error) => {
//           console.log("📍 Location denied for emergency:", error.message)
//           await sendEmergencyAlert(null)
//         },
//       )
//     } else {
//       await sendEmergencyAlert(location)
//     }
//   }

//   const sendEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
//     try {
//       const response = await fetch("/api/user/emergency-alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           location: currentLocation,
//           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
//         }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         toast.success(`🚨 Emergency alert saved! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)

//         // Start monitoring alert status
//         startAlertMonitoring(data.alertId)

//         // Refresh alerts to get the new one
//         setTimeout(() => {
//           fetchDashboardData()
//         }, 1000)

//         // Reset emergency button after 10 minutes
//         setTimeout(() => setIsEmergencyActive(false), 600000) // 10 minutes
//       } else {
//         toast.error(data.message || "Failed to save emergency alert")
//         setIsEmergencyActive(false)
//       }
//     } catch (error) {
//       console.error("Emergency alert error:", error)
//       toast.error("Emergency system error. Please try again.")
//       setIsEmergencyActive(false)
//     }
//   }

//   const dismissAlert = async () => {
//     if (!currentAlert) return

//     try {
//       const response = await fetch("/api/user/dismiss-alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId: currentAlert._id }),
//       })

//       if (response.ok) {
//         setShowAlertNotification(false)
//         setCurrentAlert(null)
//         if (alertTimer) {
//           clearTimeout(alertTimer)
//           setAlertTimer(null)
//         }
//         toast.success("Alert dismissed")
//         fetchDashboardData()
//       }
//     } catch (error) {
//       console.error("Error dismissing alert:", error)
//       toast.error("Failed to dismiss alert")
//     }
//   }

//   const saveMoodEntry = async () => {
//     try {
//       const response = await fetch("/api/user/mood-entry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mood: currentMood,
//           energy: currentEnergy,
//           anxiety: currentAnxiety,
//           sleep: currentSleep,
//           notes: moodNotes,
//         }),
//       })

//       if (response.ok) {
//         toast.success("✅ Mood entry saved!")
//         fetchDashboardData()
//         setMoodNotes("")
//       } else {
//         toast.error("Failed to save mood entry")
//       }
//     } catch (error) {
//       toast.error("Error saving mood entry")
//     }
//   }

//   const handleLikePost = async (postId: string) => {
//     try {
//       const response = await fetch("/api/user/like-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })

//       if (response.ok) {
//         fetchDashboardData()
//         toast.success("👍 Post liked!")
//       }
//     } catch (error) {
//       console.error("Error liking post:", error)
//     }
//   }

//   const getMoodIcon = (mood: number) => {
//     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
//     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
//     return <Frown className="w-6 h-6 text-red-500" />
//   }

//   const getMoodColor = (mood: number) => {
//     if (mood >= 8) return "text-green-600"
//     if (mood >= 6) return "text-yellow-600"
//     return "text-red-600"
//   }

//   const getWellnessScore = () => {
//     if (!todayMood) return 0
//     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
//     return Math.round(score * 10)
//   }

//   const getWeeklyAverage = () => {
//     if (moodData.length === 0) return 0
//     const recentData = moodData.slice(-7)
//     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
//     return Math.round(avgMood * 10) / 10
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Emergency Alert Notification */}
//       <AnimatePresence>
//         {showAlertNotification && currentAlert && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
//           >
//             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
//               <AlertTriangle className="h-4 w-4 text-red-600" />
//               <AlertDescription className="flex items-center justify-between">
//                 <div>
//                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
//                   <p className="text-red-700 dark:text-red-300 text-sm">
//                     Your emergency alert is still pending. Consider calling emergency services directly.
//                   </p>
//                   <p className="text-xs text-red-600 dark:text-red-400 mt-1">
//                     User: {currentAlert.userInfo.name} | Phone: {currentAlert.userInfo.phone}
//                   </p>
//                 </div>
//                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
//                   <CheckCircle className="w-4 h-4" />
//                 </Button>
//               </AlertDescription>
//             </Alert>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             >
//               <Heart className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* Hospital Info Button */}
//             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
//               <DialogTrigger asChild>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
//                 >
//                   <Building2 className="w-4 h-4" />
//                   <span className="text-sm font-medium">Hospital Info</span>
//                 </motion.button>
//               </DialogTrigger>
//               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//                 <DialogHeader>
//                   <DialogTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>Connected Hospitals</span>
//                   </DialogTitle>
//                 </DialogHeader>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {hospitals.map((hospital) => (
//                     <motion.div
//                       key={hospital._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center space-x-2">
//                           <Building2 className="w-5 h-5 text-purple-600" />
//                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
//                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
//                             {hospital.isAvailable ? "Available" : "Unavailable"}
//                           </Badge>
//                           {hospital.emergencyServices && (
//                             <Badge variant="destructive" className="text-xs">
//                               Emergency 24/7
//                             </Badge>
//                           )}
//                         </div>
//                       </div>

//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <Mail className="w-4 h-4" />
//                           <span>{hospital.email}</span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <Phone className="w-4 h-4" />
//                           <span>{hospital.phone}</span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <MapPin className="w-4 h-4" />
//                           <span>{hospital.address}</span>
//                         </div>
//                       </div>

//                       <div className="mt-3">
//                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {hospital.specialties.map((specialty, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {specialty}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="mt-3 pt-3 border-t">
//                         <p className="text-xs text-gray-500">
//                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </DialogContent>
//             </Dialog>

//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
//                 </motion.span>
//               )}
//             </motion.div>
//             <ThemeToggle />
//             <UserDropdown />
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             How are you feeling today? Let's track your wellness journey and stay healthy together.
//           </p>
//         </motion.div>

//         {/* Emergency SOS Button */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <motion.div
//                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
//                     animate={{
//                       boxShadow: [
//                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
//                         "0 0 0 10px rgba(239, 68, 68, 0)",
//                         "0 0 0 0 rgba(239, 68, 68, 0)",
//                       ],
//                     }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <AlertTriangle className="w-6 h-6 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Support</h3>
//                     <p className="text-red-600 dark:text-red-300">Need immediate help? We're here 24/7</p>
//                     {location && (
//                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//                         📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button
//                     onClick={handleEmergencySOS}
//                     disabled={isEmergencyActive}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//                   >
//                     {isEmergencyActive ? "🚨 Alert Sent..." : "🆘 SOS Emergency"}
//                   </Button>
//                 </motion.div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
//                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
//                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <Target className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
//                     <div className="flex items-center space-x-2">
//                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
//                       <span
//                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
//                       >
//                         {todayMood?.mood || "Not set"}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       scale: [1, 1.1, 1],
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Brain className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
//                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
//                     </p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                       opacity: [1, 0.7, 1],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Moon className="w-6 h-6 text-purple-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
//                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
//                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 180, 360],
//                     }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Zap className="w-6 h-6 text-orange-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs defaultValue="mood" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-5">
//               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
//               <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
//               <TabsTrigger value="hospital-posts">Hospital Posts</TabsTrigger>
//               <TabsTrigger value="emergency">Emergency History</TabsTrigger>
//               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
//             </TabsList>

//             {/* Mood Tracking Tab */}
//             <TabsContent value="mood" className="space-y-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Today's Mood Entry */}
//                 <Card className="hover:shadow-lg transition-shadow duration-300">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Plus className="w-5 h-5" />
//                       <span>Log Today's Mood</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentMood}
//                           onChange={(e) => setCurrentMood(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           {getMoodIcon(currentMood)}
//                           <span className="text-lg font-semibold w-8">{currentMood}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentEnergy}
//                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <Zap className="w-5 h-5 text-orange-500" />
//                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentAnxiety}
//                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-5 h-5 text-red-500" />
//                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="0"
//                           max="12"
//                           value={currentSleep}
//                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <Moon className="w-5 h-5 text-purple-500" />
//                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
//                       <Textarea
//                         value={moodNotes}
//                         onChange={(e) => setMoodNotes(e.target.value)}
//                         placeholder="How are you feeling today? Any specific thoughts or events?"
//                         className="w-full"
//                         rows={3}
//                       />
//                     </div>

//                     <Button
//                       onClick={saveMoodEntry}
//                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
//                     >
//                       Save Mood Entry
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 {/* Mood Chart */}
//                 <Card className="hover:shadow-lg transition-shadow duration-300">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <BarChart3 className="w-5 h-5" />
//                       <span>7-Day Mood Trend</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {moodData.length > 0 ? (
//                       <div className="space-y-4">
//                         {moodData.slice(-7).map((entry, index) => (
//                           <motion.div
//                             key={index}
//                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                           >
//                             <div className="flex items-center space-x-3">
//                               <Calendar className="w-4 h-4 text-gray-500" />
//                               <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 {new Date(entry.date).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                               {getMoodIcon(entry.mood)}
//                               <Progress value={entry.mood * 10} className="w-20" />
//                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
//                             </div>
//                           </motion.div>
//                         ))}
//                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//                           <div className="flex items-center justify-between">
//                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
//                             <div className="flex items-center space-x-2">
//                               <TrendingUp className="w-4 h-4 text-blue-600" />
//                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
//                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             {/* Emergency History Tab */}
//             <TabsContent value="emergency" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Shield className="w-5 h-5" />
//                     <span>Emergency Alert History</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {emergencyAlerts.length > 0 ? (
//                     <div className="space-y-4">
//                       {emergencyAlerts.map((alert, index) => (
//                         <motion.div
//                           key={alert._id}
//                           className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                         >
//                           <div className="flex items-center space-x-4">
//                             <div
//                               className={`w-3 h-3 rounded-full ${
//                                 alert.status === "accepted"
//                                   ? "bg-green-500"
//                                   : alert.status === "pending"
//                                     ? "bg-yellow-500"
//                                     : alert.status === "completed"
//                                       ? "bg-blue-500"
//                                       : "bg-gray-500"
//                               }`}
//                             />
//                             <div>
//                               <p className="font-medium">Emergency Alert</p>
//                               <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
//                                 <Clock className="w-4 h-4 mr-1" />
//                                 {new Date(alert.createdAt).toLocaleString()}
//                               </p>
//                               <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
//                                 <p>👤 {alert.userInfo.name}</p>
//                                 <p>📧 {alert.userInfo.email}</p>
//                                 <p>📞 {alert.userInfo.phone}</p>
//                               </div>
//                               {alert.location?.lat && alert.location?.lng && (
//                                 <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
//                                   <MapPin className="w-3 h-3 mr-1" />
//                                   GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                 </p>
//                               )}
//                               {alert.location?.address && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   📍 {alert.location.address.street}, {alert.location.address.area},{" "}
//                                   {alert.location.address.townOrVillage}
//                                 </p>
//                               )}
//                               {alert.acceptedBy && (
//                                 <p className="text-sm text-green-600 dark:text-green-400">
//                                   Handled by: {alert.acceptedBy.name}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <Badge
//                               variant={
//                                 alert.priority === "critical"
//                                   ? "destructive"
//                                   : alert.priority === "high"
//                                     ? "default"
//                                     : "secondary"
//                               }
//                             >
//                               {alert.priority}
//                             </Badge>
//                             <Badge
//                               variant={
//                                 alert.status === "accepted"
//                                   ? "default"
//                                   : alert.status === "pending"
//                                     ? "secondary"
//                                     : "outline"
//                               }
//                             >
//                               {alert.status}
//                             </Badge>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-600 dark:text-gray-400">No emergency alerts</p>
//                       <p className="text-sm text-gray-500">Your emergency history will appear here</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Doctor Posts Tab */}
//             <TabsContent value="doctor-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>Doctor Posts</span>
//                     <Badge variant="secondary">{doctorPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {doctorPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {doctorPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 <Stethoscope className="w-5 h-5 text-green-600" />
//                               </div>
//                               <div>
//                                 <p className="font-semibold">Dr. {post.authorId.name}</p>
//                                 <p className="text-sm text-gray-500">Doctor</p>
//                                 {post.mentionedId && (
//                                   <p className="text-xs text-blue-600">mentioned {post.mentionedId.name}</p>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>

//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => handleLikePost(post._id)}
//                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
//                               >
//                                 <ThumbsUp className="w-4 h-4" />
//                                 <span className="text-sm">{post.likes.length}</span>
//                               </motion.button>
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <MessageSquare className="w-4 h-4" />
//                                 <span className="text-sm">{post.comments.length}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No doctor posts yet
//                       </h3>
//                       <p className="text-gray-500">Doctor posts will appear here when available</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Hospital Posts Tab */}
//             <TabsContent value="hospital-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>Hospital Posts</span>
//                     <Badge variant="secondary">{hospitalPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {hospitalPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {hospitalPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
//                                 <Building2 className="w-5 h-5 text-purple-600" />
//                               </div>
//                               <div>
//                                 <p className="font-semibold">{post.authorId.name}</p>
//                                 <p className="text-sm text-gray-500">Hospital</p>
//                                 {post.mentionedId && (
//                                   <p className="text-xs text-blue-600">mentioned Dr. {post.mentionedId.name}</p>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>

//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => handleLikePost(post._id)}
//                                 className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
//                               >
//                                 <ThumbsUp className="w-4 h-4" />
//                                 <span className="text-sm">{post.likes.length}</span>
//                               </motion.button>
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <MessageSquare className="w-4 h-4" />
//                                 <span className="text-sm">{post.comments.length}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No hospital posts yet
//                       </h3>
//                       <p className="text-gray-500">Hospital posts will appear here when available</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Self Assessment Tab */}
//             <TabsContent value="assessment" className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                   {
//                     icon: Brain,
//                     title: "Depression Assessment (PHQ-9)",
//                     desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
//                     color: "blue",
//                   },
//                   {
//                     icon: AlertTriangle,
//                     title: "Anxiety Assessment (GAD-7)",
//                     desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
//                     color: "yellow",
//                   },
//                   {
//                     icon: Zap,
//                     title: "Stress Level Check",
//                     desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
//                     color: "red",
//                   },
//                   {
//                     icon: Heart,
//                     title: "General Wellness Check",
//                     desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
//                     color: "green",
//                   },
//                 ].map((assessment, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.02, y: -5 }}
//                   >
//                     <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
//                       <CardHeader>
//                         <CardTitle className="flex items-center space-x-2">
//                           <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
//                           <span>{assessment.title}</span>
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
//                         <Button className={`w-full group-hover:bg-${assessment.color}-600`}>Start Assessment</Button>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  AlertTriangle,
  Shield,
  Brain,
  Target,
  Zap,
  Moon,
  Smile,
  Frown,
  Meh,
  Plus,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Bell,
  MessageSquare,
  ThumbsUp,
  Building2,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import { toast } from "react-hot-toast"

interface MoodData {
  date: string
  mood: number
  energy: number
  anxiety: number
  sleep: number
  notes?: string
}

interface EmergencyAlert {
  _id: string
  status: string
  priority: string
  createdAt: string
  userInfo: {
    name: string
    email: string
    phone: string
  }
  location?: {
    lat?: number
    lng?: number
    address?: {
      street?: string
      area?: string
      townOrVillage?: string
      taluka?: string
      district?: string
      pincode?: string
      geoLocation?: {
        lat?: number
        lng?: number
      }
    }
  }
  acceptedBy?: {
    name: string
  }
}

interface Post {
  _id: string
  title: string
  content: string
  category: string
  tags: string[]
  authorId: {
    _id: string
    name: string
  }
  authorType: string
  mentionedId?: {
    _id: string
    name: string
  }
  mentionedType?: string
  likes: string[]
  comments: Array<{
    userId: string
    userName: string
    content: string
    createdAt: string
  }>
  createdAt: string
  isApproved: boolean
}

interface Hospital {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  specialties: string[]
  isVerified: boolean
  isAvailable: boolean
  emergencyServices: boolean
  createdAt: string
}

export default function UserDashboard() {
  const { user } = useAuth()
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
  const [hospitalPosts, setHospitalPosts] = useState<Post[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [todayMood, setTodayMood] = useState<MoodData | null>(null)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(0)
  const [showHospitalInfo, setShowHospitalInfo] = useState(false)
  const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
  const [showAlertNotification, setShowAlertNotification] = useState(false)
  const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
  const [checkCount, setCheckCount] = useState(0)
  const [userProfile, setUserProfile] = useState<any>(null)

  // Mood tracking state
  const [currentMood, setCurrentMood] = useState(5)
  const [currentEnergy, setCurrentEnergy] = useState(5)
  const [currentAnxiety, setCurrentAnxiety] = useState(5)
  const [currentSleep, setCurrentSleep] = useState(8)
  const [moodNotes, setMoodNotes] = useState("")

  useEffect(() => {
    fetchDashboardData()
    requestLocation()

    // Fetch user profile after 2 seconds
    setTimeout(() => {
      fetchUserProfile()
    }, 2000)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [moodRes, alertsRes, doctorPostsRes, hospitalPostsRes, hospitalsRes] = await Promise.all([
        fetch("/api/user/mood-data"),
        fetch("/api/user/emergency-alerts"),
        fetch("/api/user/doctor-posts"),
        fetch("/api/user/hospital-posts"),
        fetch("/api/user/hospitals"),
      ])

      if (moodRes.ok) {
        const moodData = await moodRes.json()
        setMoodData(moodData.data || [])
        setTodayMood(moodData.today || null)
      }

      if (alertsRes.ok) {
        const alertsData = await alertsRes.json()
        setEmergencyAlerts(alertsData.data || [])

        // Check for pending alerts
        const pendingAlerts =
          alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []

        if (pendingAlerts.length > 0) {
          setCurrentAlert(pendingAlerts[0])
        }
      }

      if (doctorPostsRes.ok) {
        const doctorPostsData = await doctorPostsRes.json()
        setDoctorPosts(doctorPostsData.data || [])
      }

      if (hospitalPostsRes.ok) {
        const hospitalPostsData = await hospitalPostsRes.json()
        setHospitalPosts(hospitalPostsData.data || [])
      }

      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json()
        setHospitals(hospitalsData.data || [])
      }

      setNotifications(
        (doctorPostsRes.ok ? (await doctorPostsRes.json()).data?.length || 0 : 0) +
          (hospitalPostsRes.ok ? (await hospitalPostsRes.json()).data?.length || 0 : 0),
      )
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          console.log("📍 Location obtained:", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("📍 Location access denied:", error.message)
          toast.error("Location access denied. Emergency alerts will use your registered address.")
        },
      )
    } else {
      console.log("📍 Geolocation not supported")
      toast.error("Geolocation not supported by this browser.")
    }
  }

  const checkAlertStatus = async (alertId: string) => {
    try {
      const response = await fetch("/api/user/check-alert-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      })

      const data = await response.json()

      if (response.ok && data.alert) {
        console.log("🔍 Alert status check:", data.alert.status)

        if (data.alert.status !== "pending") {
          // Status changed - hospital responded!
          setShowAlertNotification(false)
          setCurrentAlert(null)
          if (alertTimer) {
            clearTimeout(alertTimer)
            setAlertTimer(null)
          }

          toast.success(`🏥 Hospital is coming! Status: ${data.alert.status}`, {
            duration: 8000,
          })

          fetchDashboardData() // Refresh data
          return true // Status changed
        }

        return false // Still pending
      }
    } catch (error) {
      console.error("Error checking alert status:", error)
    }
    return false
  }

  const startAlertMonitoring = (alertId: string) => {
    let checkCounter = 0

    const checkStatus = async () => {
      checkCounter++
      console.log(`⏰ Alert check #${checkCounter} for alert ${alertId}`)

      const statusChanged = await checkAlertStatus(alertId)

      if (statusChanged) {
        // Hospital responded - stop monitoring
        return
      }

      if (checkCounter === 1) {
        // First check (3 minutes) - show notification
        setShowAlertNotification(true)
        toast.error("⚠️ Hospitals haven't responded yet. Alert escalated!", {
          duration: 10000,
        })

        // Schedule second check after another 3 minutes
        setTimeout(checkStatus, 180000) // 3 minutes
      } else if (checkCounter === 2) {
        // Second check (6 minutes total) - final check
        toast.error("🚨 Still no response from hospitals. Please call emergency services directly!", {
          duration: 15000,
        })
      }
    }

    // Start first check after 3 minutes
    const timer = setTimeout(checkStatus, 180000) // 3 minutes
    setAlertTimer(timer)
  }

  const handleEmergencySOS = async () => {
    if (isEmergencyActive) return

    setIsEmergencyActive(true)

    // Request location again if not available
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(currentLocation)
          await sendEmergencyAlert(currentLocation)
        },
        async (error) => {
          console.log("📍 Location denied for emergency:", error.message)
          await sendEmergencyAlert(null)
        },
      )
    } else {
      await sendEmergencyAlert(location)
    }
  }

  const sendEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
    try {
      const response = await fetch("/api/user/emergency-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: currentLocation,
          message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("🚨 Emergency alert sended to nearby hospital ")

        // Start monitoring alert status
        startAlertMonitoring(data.alertId)

        // Refresh alerts to get the new one
        setTimeout(() => {
          fetchDashboardData()
        }, 1000)

        // Reset emergency button after 10 minutes
        setTimeout(() => setIsEmergencyActive(false), 600000) // 10 minutes
      } else {
        toast.error(data.message || "Failed to save emergency alert")
        setIsEmergencyActive(false)
      }
    } catch (error) {
      console.error("Emergency alert error:", error)
      toast.error("Emergency system error. Please try again.")
      setIsEmergencyActive(false)
    }
  }

  const dismissAlert = async () => {
    if (!currentAlert) return

    try {
      const response = await fetch("/api/user/dismiss-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId: currentAlert._id }),
      })

      if (response.ok) {
        setShowAlertNotification(false)
        setCurrentAlert(null)
        if (alertTimer) {
          clearTimeout(alertTimer)
          setAlertTimer(null)
        }
        toast.success("Alert dismissed")
        fetchDashboardData()
      }
    } catch (error) {
      console.error("Error dismissing alert:", error)
      toast.error("Failed to dismiss alert")
    }
  }

  const saveMoodEntry = async () => {
    try {
      const response = await fetch("/api/user/mood-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: currentMood,
          energy: currentEnergy,
          anxiety: currentAnxiety,
          sleep: currentSleep,
          notes: moodNotes,
        }),
      })

      if (response.ok) {
        toast.success("✅ Mood entry saved!")
        fetchDashboardData()
        setMoodNotes("")
      } else {
        toast.error("Failed to save mood entry")
      }
    } catch (error) {
      toast.error("Error saving mood entry")
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      const response = await fetch("/api/user/like-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        fetchDashboardData()
        toast.success("👍 Post liked!")
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
    if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
    return <Frown className="w-6 h-6 text-red-500" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "text-green-600"
    if (mood >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getWellnessScore = () => {
    if (!todayMood) return 0
    const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
    return Math.round(score * 10)
  }

  const getWeeklyAverage = () => {
    if (moodData.length === 0) return 0
    const recentData = moodData.slice(-7)
    const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
    return Math.round(avgMood * 10) / 10
  }

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      const data = await response.json()

      if (response.ok && data.user) {
        setUserProfile(data.user)
        console.log("👤 User profile loaded:", data.user)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Emergency Alert Notification */}
      <AnimatePresence>
        {showAlertNotification && currentAlert && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          >
            <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Your emergency alert is still pending. Consider calling emergency services directly.
                  </p>
                  {currentAlert && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
                      {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Hospital Info Button */}
            <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Hospital Info</span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span>Connected Hospitals</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {hospitals.map((hospital) => (
                    <motion.div
                      key={hospital._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-5 h-5 text-purple-600" />
                          <h3 className="font-semibold text-lg">{hospital.name}</h3>
                          {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
                            {hospital.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                          {hospital.emergencyServices && (
                            <Badge variant="destructive" className="text-xs">
                              Emergency 24/7
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span>{hospital.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{hospital.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          Joined: {new Date(hospital.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {notifications}
                </motion.span>
              )}
            </motion.div>
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
          <p className="text-gray-600 dark:text-gray-400">
            How are you feeling today? Let's track your wellness journey and stay healthy together.
          </p>
        </motion.div>

        {/* Emergency SOS Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.7)",
                        "0 0 0 10px rgba(239, 68, 68, 0)",
                        "0 0 0 0 rgba(239, 68, 68, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Emergency Support</h3>
                    <p className="text-red-600 dark:text-red-300">Need immediate help? We're here 24/7</p>
                    {location && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleEmergencySOS}
                    disabled={isEmergencyActive}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isEmergencyActive ? "🚨 Alert Sent..." : "🆘 SOS Emergency"}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
                    <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
                    <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Target className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
                    <div className="flex items-center space-x-2">
                      {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
                      <span
                        className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
                      >
                        {todayMood?.mood || "Not set"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Out of 10</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Brain className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
                    <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Moon className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
                    <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
                    <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="w-6 h-6 text-orange-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="mood" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
              <TabsTrigger value="hospital-posts">Hospital Posts</TabsTrigger>
              <TabsTrigger value="emergency">Emergency History</TabsTrigger>
              <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
            </TabsList>

            {/* Mood Tracking Tab */}
            <TabsContent value="mood" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Mood Entry */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Log Today's Mood</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentMood}
                          onChange={(e) => setCurrentMood(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          {getMoodIcon(currentMood)}
                          <span className="text-lg font-semibold w-8">{currentMood}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentEnergy}
                          onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-orange-500" />
                          <span className="text-lg font-semibold w-8">{currentEnergy}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentAnxiety}
                          onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Sleep Hours</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={currentSleep}
                          onChange={(e) => setCurrentSleep(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <Moon className="w-5 h-5 text-purple-500" />
                          <span className="text-lg font-semibold w-8">{currentSleep}h</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                      <Textarea
                        value={moodNotes}
                        onChange={(e) => setMoodNotes(e.target.value)}
                        placeholder="How are you feeling today? Any specific thoughts or events?"
                        className="w-full"
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={saveMoodEntry}
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    >
                      Save Mood Entry
                    </Button>
                  </CardContent>
                </Card>

                {/* Mood Chart */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>7-Day Mood Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {moodData.length > 0 ? (
                      <div className="space-y-4">
                        {moodData.slice(-7).map((entry, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(entry.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getMoodIcon(entry.mood)}
                              <Progress value={entry.mood * 10} className="w-20" />
                              <span className="text-sm font-medium w-12">{entry.mood}/10</span>
                            </div>
                          </motion.div>
                        ))}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
                        <p className="text-sm text-gray-500">Start tracking to see your trends</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Emergency History Tab */}
            <TabsContent value="emergency" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Emergency Alert History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {emergencyAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {emergencyAlerts.map((alert, index) => (
                        <motion.div
                          key={alert._id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                alert.status === "accepted"
                                  ? "bg-green-500"
                                  : alert.status === "pending"
                                    ? "bg-yellow-500"
                                    : alert.status === "completed"
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                              }`}
                            />
                            <div>
                              <p className="font-medium">Emergency Alert</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {new Date(alert.createdAt).toLocaleString()}
                              </p>
                              {alert.userInfo ? (
                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                  <p>👤 {alert.userInfo.name}</p>
                                  <p>📧 {alert.userInfo.email}</p>
                                  <p>📞 {alert.userInfo.phone}</p>
                                </div>
                              ) : userProfile ? (
                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                  <p>👤 {userProfile.name}</p>
                                  <p>📧 {userProfile.email}</p>
                                  <p>📞 {userProfile.phone}</p>
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 mt-1">
                                  <p>👤 User info not available</p>
                                </div>
                              )}
                              {alert.location?.lat && alert.location?.lng && (
                                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                                </p>
                              )}
                              {alert.location?.address && (
                                <p className="text-xs text-gray-500 mt-1">
                                  📍 {alert.location.address.street}, {alert.location.address.area},{" "}
                                  {alert.location.address.townOrVillage}
                                </p>
                              )}
                              {alert.acceptedBy && (
                                <p className="text-sm text-green-600 dark:text-green-400">
                                  Handled by: {alert.acceptedBy.name}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                alert.priority === "critical"
                                  ? "destructive"
                                  : alert.priority === "high"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {alert.priority}
                            </Badge>
                            <Badge
                              variant={
                                alert.status === "accepted"
                                  ? "default"
                                  : alert.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {alert.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No emergency alerts</p>
                      <p className="text-sm text-gray-500">Your emergency history will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Doctor Posts Tab */}
            <TabsContent value="doctor-posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                    <span>Doctor Posts</span>
                    <Badge variant="secondary">{doctorPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {doctorPosts.length > 0 ? (
                    <div className="space-y-4">
                      {doctorPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">Dr. {post.authorId.name}</p>
                                <p className="text-sm text-gray-500">Doctor</p>
                                {post.mentionedId && (
                                  <p className="text-xs text-blue-600">mentioned {post.mentionedId.name}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleLikePost(post._id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{post.likes.length}</span>
                              </motion.button>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm">{post.comments.length}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No doctor posts yet
                      </h3>
                      <p className="text-gray-500">Doctor posts will appear here when available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hospital Posts Tab */}
            <TabsContent value="hospital-posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span>Hospital Posts</span>
                    <Badge variant="secondary">{hospitalPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hospitalPosts.length > 0 ? (
                    <div className="space-y-4">
                      {hospitalPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-semibold">{post.authorId.name}</p>
                                <p className="text-sm text-gray-500">Hospital</p>
                                {post.mentionedId && (
                                  <p className="text-xs text-blue-600">mentioned Dr. {post.mentionedId.name}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleLikePost(post._id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{post.likes.length}</span>
                              </motion.button>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm">{post.comments.length}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No hospital posts yet
                      </h3>
                      <p className="text-gray-500">Hospital posts will appear here when available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Self Assessment Tab */}
            <TabsContent value="assessment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Brain,
                    title: "Depression Assessment (PHQ-9)",
                    desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
                    color: "blue",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Anxiety Assessment (GAD-7)",
                    desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
                    color: "yellow",
                  },
                  {
                    icon: Zap,
                    title: "Stress Level Check",
                    desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
                    color: "red",
                  },
                  {
                    icon: Heart,
                    title: "General Wellness Check",
                    desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
                    color: "green",
                  },
                ].map((assessment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
                          <span>{assessment.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
                        <Button className={`w-full group-hover:bg-${assessment.color}-600`}>Start Assessment</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
