// // //C:\Users\UDAYN\Downloads\healthcare-platform\app\hospital\dashboard\page.tsx

// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion } from "framer-motion"
// // import {
// //   Building2,
// //   Plus,
// //   AlertTriangle,
// //   MessageSquare,
// //   Bell,
// //   Send,
// //   UserCheck,
// //   Tag,
// //   Calendar,
// //   ThumbsUp,
// //   Eye,
// //   Edit,
// //   Trash2,
// //   MapPin,
// //   Clock,
// //   Shield,
// //   Activity,
// //   Stethoscope,
// //   Award,
// // } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Input } from "@/components/ui/input"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Switch } from "@/components/ui/switch"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // import { useAuth } from "@/hooks/useAuth"
// // import ThemeToggle from "@/components/ThemeToggle"
// // import UserDropdown from "@/components/UserDropdown"
// // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // import { toast } from "react-hot-toast"

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

// // interface Doctor {
// //   _id: string
// //   name: string
// //   email: string
// //   specialty: string
// //   isVerified: boolean
// // }

// // interface EmergencyAlert {
// //   _id: string
// //   userId: {
// //     name: string
// //     email: string
// //     phone: string
// //   }
// //   location: {
// //     lat?: number
// //     lng?: number
// //     address?: string
// //   }
// //   message: string
// //   priority: string
// //   status: string
// //   createdAt: string
// // }

// // export default function HospitalDashboard() {
// //   const { user } = useAuth()
// //   const [ownPosts, setOwnPosts] = useState<Post[]>([])
// //   const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
// //   const [doctors, setDoctors] = useState<Doctor[]>([])
// //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [notifications, setNotifications] = useState(0)
// //   const [isAvailable, setIsAvailable] = useState(true)
// //   const [editingPost, setEditingPost] = useState<Post | null>(null)

// //   // Post creation state
// //   const [newPost, setNewPost] = useState({
// //     title: "",
// //     content: "",
// //     category: "",
// //     tags: "",
// //     mentionedDoctor: "",
// //   })

// //   const categories = [
// //     "emergency-care",
// //     "hospital-services",
// //     "health-tips",
// //     "prevention",
// //     "treatment",
// //     "facilities",
// //     "announcements",
// //     "cardiology",
// //     "neurology",
// //     "pediatrics",
// //   ]

// //   useEffect(() => {
// //     fetchDashboardData()
// //     // Poll for emergency alerts every 30 seconds
// //     const interval = setInterval(fetchEmergencyAlerts, 30000)
// //     return () => clearInterval(interval)
// //   }, [])

// //   const fetchDashboardData = async () => {
// //     try {
// //       const [ownPostsRes, doctorPostsRes, doctorsRes, alertsRes] = await Promise.all([
// //         fetch("/api/hospital/own-posts"),
// //         fetch("/api/hospital/doctor-posts"),
// //         fetch("/api/hospital/doctors"),
// //         fetch("/api/hospital/emergency-alerts"),
// //       ])

// //       if (ownPostsRes.ok) {
// //         const ownPostsData = await ownPostsRes.json()
// //         setOwnPosts(ownPostsData.data || [])
// //       }

// //       if (doctorPostsRes.ok) {
// //         const doctorPostsData = await doctorPostsRes.json()
// //         setDoctorPosts(doctorPostsData.data || [])
// //       }

// //       if (doctorsRes.ok) {
// //         const doctorsData = await doctorsRes.json()
// //         setDoctors(doctorsData.data || [])
// //       }

// //       if (alertsRes.ok) {
// //         const alertsData = await alertsRes.json()
// //         setEmergencyAlerts(alertsData.data || [])
// //         setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching dashboard data:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchEmergencyAlerts = async () => {
// //     try {
// //       const response = await fetch("/api/hospital/emergency-alerts")
// //       if (response.ok) {
// //         const alertsData = await response.json()
// //         setEmergencyAlerts(alertsData.data || [])
// //         setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching emergency alerts:", error)
// //     }
// //   }

// //   const handleCreatePost = async () => {
// //     if (!newPost.title || !newPost.content || !newPost.category) {
// //       toast.error("Please fill in all required fields")
// //       return
// //     }

// //     try {
// //       const response = await fetch("/api/hospital/create-post", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           title: newPost.title,
// //           content: newPost.content,
// //           category: newPost.category,
// //           tags: newPost.tags
// //             .split(",")
// //             .map((tag) => tag.trim())
// //             .filter((tag) => tag),
// //           mentionedDoctor: newPost.mentionedDoctor || null,
// //         }),
// //       })

// //       if (response.ok) {
// //         toast.success("✅ Post created successfully! Awaiting admin approval.")
// //         setNewPost({
// //           title: "",
// //           content: "",
// //           category: "",
// //           tags: "",
// //           mentionedDoctor: "",
// //         })
// //         fetchDashboardData()
// //       } else {
// //         toast.error("Failed to create post")
// //       }
// //     } catch (error) {
// //       toast.error("Error creating post")
// //     }
// //   }

// //   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
// //     try {
// //       const response = await fetch("/api/hospital/edit-post", {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ postId, ...updatedData }),
// //       })

// //       if (response.ok) {
// //         toast.success("✅ Post updated successfully!")
// //         setEditingPost(null)
// //         fetchDashboardData()
// //       } else {
// //         toast.error("Failed to update post")
// //       }
// //     } catch (error) {
// //       toast.error("Error updating post")
// //     }
// //   }

// //   const handleDeletePost = async (postId: string) => {
// //     if (!confirm("Are you sure you want to delete this post?")) return

// //     try {
// //       const response = await fetch("/api/hospital/delete-post", {
// //         method: "DELETE",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ postId }),
// //       })

// //       if (response.ok) {
// //         toast.success("✅ Post deleted successfully")
// //         fetchDashboardData()
// //       } else {
// //         toast.error("Failed to delete post")
// //       }
// //     } catch (error) {
// //       toast.error("Error deleting post")
// //     }
// //   }

// //   const handleAcceptEmergency = async (alertId: string) => {
// //     try {
// //       const response = await fetch("/api/hospital/accept-emergency", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ alertId }),
// //       })

// //       if (response.ok) {
// //         toast.success("✅ Emergency accepted! Patient has been notified.")
// //         fetchEmergencyAlerts()
// //       } else {
// //         const data = await response.json()
// //         toast.error(data.message || "Failed to accept emergency")
// //       }
// //     } catch (error) {
// //       toast.error("Error accepting emergency")
// //     }
// //   }

// //   const handleToggleAvailability = async () => {
// //     try {
// //       const response = await fetch("/api/hospital/toggle-availability", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ isAvailable: !isAvailable }),
// //       })

// //       if (response.ok) {
// //         setIsAvailable(!isAvailable)
// //         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
// //       } else {
// //         toast.error("Failed to update availability")
// //       }
// //     } catch (error) {
// //       toast.error("Error updating availability")
// //     }
// //   }

// //   const handleLikePost = async (postId: string) => {
// //     try {
// //       const response = await fetch("/api/hospital/like-post", {
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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <motion.div
// //             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           />
// //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// //       {/* Header with Animated Icons */}
// //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// //         <AnimatedHealthIcons />
// //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// //           <div className="flex items-center space-x-4">
// //             <motion.div
// //               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
// //               <Building2 className="w-6 h-6 text-white" />
// //             </motion.div>
// //             <div>
// //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">Manage emergency care & health content</p>
// //             </div>
// //           </div>

// //           <div className="flex items-center space-x-4">
// //             <div className="flex items-center space-x-2">
// //               <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
// //               <Switch checked={isAvailable} onCheckedChange={handleToggleAvailability} />
// //             </div>
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
// //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             Manage emergency responses and share important health information with the community.
// //           </p>
// //         </motion.div>

// //         {/* Emergency Alerts Banner */}
// //         {notifications > 0 && (
// //           <motion.div
// //             className="mb-8"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //           >
// //             <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-4">
// //                     <motion.div
// //                       className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// //                       animate={{
// //                         boxShadow: [
// //                           "0 0 0 0 rgba(239, 68, 68, 0.7)",
// //                           "0 0 0 10px rgba(239, 68, 68, 0)",
// //                           "0 0 0 0 rgba(239, 68, 68, 0)",
// //                         ],
// //                       }}
// //                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                     >
// //                       <AlertTriangle className="w-6 h-6 text-white" />
// //                     </motion.div>
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
// //                         {notifications} Pending Emergency Alert{notifications > 1 ? "s" : ""}
// //                       </h3>
// //                       <p className="text-red-600 dark:text-red-300">Patients need immediate assistance</p>
// //                     </div>
// //                   </div>
// //                   <Button
// //                     onClick={() => document.querySelector('[value="emergencies"]')?.click()}
// //                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
// //                   >
// //                     View Alerts
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         )}

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
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
// //                     <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
// //                     <p className="text-xs text-gray-500">{notifications} pending</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       scale: notifications > 0 ? [1, 1.2, 1] : 1,
// //                     }}
// //                     transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
// //                   >
// //                     <AlertTriangle className="w-6 h-6 text-red-600" />
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
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
// //                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
// //                     <p className="text-xs text-gray-500">Published content</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// //                     animate={{ rotate: [0, 360] }}
// //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //                   >
// //                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
// //                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
// //                     <p className="text-xs text-gray-500">Network partners</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       y: [0, -5, 0],
// //                     }}
// //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <UserCheck className="w-6 h-6 text-green-600" />
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
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
// //                     <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
// //                       {isAvailable ? "Available" : "Unavailable"}
// //                     </p>
// //                     <p className="text-xs text-gray-500">Emergency services</p>
// //                   </div>
// //                   <motion.div
// //                     className={`w-12 h-12 ${isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} rounded-full flex items-center justify-center`}
// //                     animate={{
// //                       rotate: [0, 10, -10, 0],
// //                     }}
// //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
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
// //           <Tabs defaultValue="emergencies" className="space-y-6">
// //             <TabsList className="grid w-full grid-cols-5">
// //               <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>
// //               <TabsTrigger value="create">Create Post</TabsTrigger>
// //               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
// //               <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
// //               <TabsTrigger value="analytics">Analytics</TabsTrigger>
// //             </TabsList>

// //             {/* Emergency Alerts Tab */}
// //             <TabsContent value="emergencies" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Shield className="w-5 h-5" />
// //                     <span>Emergency Alerts</span>
// //                     <Badge variant="destructive">{notifications} pending</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {emergencyAlerts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {emergencyAlerts.map((alert, index) => (
// //                         <motion.div
// //                           key={alert._id}
// //                           className={`p-4 border rounded-lg ${
// //                             alert.status === "pending"
// //                               ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
// //                               : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
// //                           }`}
// //                           initial={{ opacity: 0, x: -20 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                         >
// //                           <div className="flex items-start justify-between mb-3">
// //                             <div className="flex items-center space-x-3">
// //                               <div
// //                                 className={`w-3 h-3 rounded-full ${
// //                                   alert.status === "accepted"
// //                                     ? "bg-green-500"
// //                                     : alert.status === "pending"
// //                                       ? "bg-red-500"
// //                                       : "bg-gray-500"
// //                                 }`}
// //                               />
// //                               <div>
// //                                 <p className="font-medium">{alert.userId.name}</p>
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.email}</p>
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.phone}</p>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               <Badge
// //                                 variant={
// //                                   alert.priority === "critical"
// //                                     ? "destructive"
// //                                     : alert.priority === "high"
// //                                       ? "default"
// //                                       : "secondary"
// //                                 }
// //                               >
// //                                 {alert.priority}
// //                               </Badge>
// //                               <Badge variant="outline">{alert.status}</Badge>
// //                             </div>
// //                           </div>

// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                             <div>
// //                               <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
// //                               <p className="flex items-center">
// //                                 <Clock className="w-4 h-4 mr-1" />
// //                                 {new Date(alert.createdAt).toLocaleString()}
// //                               </p>
// //                             </div>
// //                             <div>
// //                               <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
// //                               <p className="flex items-center">
// //                                 <MapPin className="w-4 h-4 mr-1" />
// //                                 {alert.location.lat
// //                                   ? `${alert.location.lat.toFixed(4)}, ${alert.location.lng?.toFixed(4)}`
// //                                   : alert.location.address || "Address provided"}
// //                               </p>
// //                             </div>
// //                           </div>

// //                           {alert.message && (
// //                             <div className="mb-4">
// //                               <p className="text-sm text-gray-600 dark:text-gray-400">Message</p>
// //                               <p className="text-sm">{alert.message}</p>
// //                             </div>
// //                           )}

// //                           {alert.status === "pending" && (
// //                             <div className="flex items-center space-x-2">
// //                               <Button
// //                                 onClick={() => handleAcceptEmergency(alert._id)}
// //                                 className="bg-green-600 hover:bg-green-700"
// //                               >
// //                                 Accept Emergency
// //                               </Button>
// //                               <Button variant="outline">View Details</Button>
// //                             </div>
// //                           )}
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No emergency alerts
// //                       </h3>
// //                       <p className="text-gray-500">Emergency alerts will appear here when patients need help</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Create Post Tab */}
// //             <TabsContent value="create" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Plus className="w-5 h-5" />
// //                     <span>Create New Hospital Post</span>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-6">
// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Post Title *</label>
// //                     <Input
// //                       value={newPost.title}
// //                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
// //                       placeholder="e.g., New Emergency Department Now Open 24/7"
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Content *</label>
// //                     <Textarea
// //                       value={newPost.content}
// //                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
// //                       placeholder="Share hospital updates, health tips, or important announcements..."
// //                       className="w-full min-h-[200px]"
// //                     />
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Category *</label>
// //                       <Select
// //                         value={newPost.category}
// //                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
// //                       >
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select category" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {categories.map((category) => (
// //                             <SelectItem key={category} value={category}>
// //                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Mention Doctor (Optional)</label>
// //                       <Select
// //                         value={newPost.mentionedDoctor}
// //                         onValueChange={(value) => setNewPost({ ...newPost, mentionedDoctor: value })}
// //                       >
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select doctor to mention" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="">No doctor</SelectItem>
// //                           {doctors.map((doctor) => (
// //                             <SelectItem key={doctor._id} value={doctor._id}>
// //                               <div className="flex items-center space-x-2">
// //                                 <Stethoscope className="w-4 h-4" />
// //                                 <span>Dr. {doctor.name}</span>
// //                                 <span className="text-xs text-gray-500">({doctor.specialty})</span>
// //                                 {doctor.isVerified && <Award className="w-3 h-3 text-green-500" />}
// //                               </div>
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
// //                     <Input
// //                       value={newPost.tags}
// //                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
// //                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
// //                       className="w-full"
// //                     />
// //                   </div>

// //                   <Button
// //                     onClick={handleCreatePost}
// //                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
// //                   >
// //                     <Send className="w-4 h-4 mr-2" />
// //                     Create Post
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Own Posts Tab */}
// //             <TabsContent value="own-posts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Building2 className="w-5 h-5 text-purple-600" />
// //                     <span>My Posts</span>
// //                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {ownPosts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {ownPosts.map((post, index) => (
// //                         <motion.div
// //                           key={post._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           whileHover={{ scale: 1.01 }}
// //                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
// //                         >
// //                           <div className="flex items-start justify-between mb-3">
// //                             <div className="flex-1">
// //                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
// //                               <div className="flex items-center space-x-2 mb-2">
// //                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
// //                                 {post.mentionedId && (
// //                                   <Badge variant="secondary">mentioned Dr. {post.mentionedId.name}</Badge>
// //                                 )}
// //                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
// //                                   {post.isApproved ? "Approved" : "Pending"}
// //                                 </Badge>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               <Dialog>
// //                                 <DialogTrigger asChild>
// //                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
// //                                     <Edit className="w-4 h-4" />
// //                                   </Button>
// //                                 </DialogTrigger>
// //                                 <DialogContent className="max-w-2xl">
// //                                   <DialogHeader>
// //                                     <DialogTitle>Edit Post</DialogTitle>
// //                                   </DialogHeader>
// //                                   <div className="space-y-4">
// //                                     <Input
// //                                       defaultValue={post.title}
// //                                       placeholder="Post title"
// //                                       onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
// //                                     />
// //                                     <Textarea
// //                                       defaultValue={post.content}
// //                                       placeholder="Post content"
// //                                       className="min-h-[200px]"
// //                                       onChange={(e) => setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)}
// //                                     />
// //                                     <div className="flex space-x-2">
// //                                       <Button
// //                                         onClick={() => editingPost && handleEditPost(editingPost._id, {
// //                                           title: editingPost.title,
// //                                           content: editingPost.content
// //                                         })}
// //                                         className="bg-purple-600 hover:bg-purple-700"
// //                                       >
// //                                         Save Changes
// //                                       </Button>
// //                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
// //                                         Cancel
// //                                       </Button>
// //                                     </div>
// //                                   </div>
// //                                 </DialogContent>
// //                               </Dialog>
// //                               <Button
// //                                 variant="destructive"
// //                                 size="sm"
// //                                 onClick={() => handleDeletePost(post._id)}
// //                               >
// //                                 <Trash2 className="w-4 h-4" />
// //                               </Button>
// //                             </div>
// //                           </div>

// //                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>

// //                           <div className="flex flex-wrap gap-2 mb-4">
// //                             {post.tags.map((tag, tagIndex) => (
// //                               <Badge key={tagIndex} variant="secondary" className="text-xs">
// //                                 <Tag className="w-3 h-3 mr-1" />
// //                                 {tag}
// //                               </Badge>
// //                             ))}
// //                           </div>

// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center space-x-4">
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <ThumbsUp className="w-4 h-4" />
// //                                 <span className="text-sm">{post.likes.length} likes</span>
// //                               </div>
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <MessageSquare className="w-4 h-4" />
// //                                 <span className="text-sm">{post.comments.length} comments</span>
// //                               </div>
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <Eye className="w-4 h-4" />
// //                                 <span className="text-sm">View details</span>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2 text-xs text-gray-500">
// //                               <Calendar className="w-4 h-4" />
// //                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
// //                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
// //                       <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
// //                         Create Your First Post
// //                       </Button>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Doctor Posts Tab */}
// //             <TabsContent value="doctor-posts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-\


// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   Building2,
//   Plus,
//   AlertTriangle,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   ThumbsUp,
//   Eye,
//   Edit,
//   Trash2,
//   MapPin,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   Award,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { useAuth } from "@/hooks/useAuth"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"

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

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userId: {
//     name: string
//     email: string
//     phone: string
//   }
//   location: {
//     lat?: number
//     lng?: number
//     address?: string
//   }
//   message: string
//   priority: string
//   status: string
//   createdAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [loading, setLoading] = useState(true)
//   const [isHandleEmergency, setIsHandleEmergency] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState(null);
//   const [isAvailable, setIsAvailable] = useState(null)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//     mentionedDoctor: "",
//   })

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   useEffect(() => {
//     fetchDashboardData()
//     // Poll for emergency alerts every 30 seconds
//     const interval = setInterval(fetchEmergencyAlerts, 30000)
//     return () => clearInterval(interval)
//   }, [])

//    useEffect(() => {
//     const fetchHospital = async () => {
//       try {
//         const res = await axios.get('/api/hospital/me');
//         setHospital(res.data);
//         setIsAvailable(res.data.isAvailable); // Optional
//       } catch (err) {
//         console.error('Failed to fetch hospital data:', err);
//       }
//     };

//     fetchHospital();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [ownPostsRes, doctorPostsRes, doctorsRes, alertsRes] = await Promise.all([
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/hospital/doctor-posts"),
//         fetch("/api/hospital/doctors"),
//         fetch("/api/hospital/emergency-alerts"),
//       ])

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }

//       if (doctorPostsRes.ok) {
//         const doctorPostsData = await doctorPostsRes.json()
//         setDoctorPosts(doctorPostsData.data || [])
//       }

//       if (doctorsRes.ok) {
//         const doctorsData = await doctorsRes.json()
//         setDoctors(doctorsData.data || [])
//       }

//       if (alertsRes.ok) {
//         const alertsData = await alertsRes.json()
//         setEmergencyAlerts(alertsData.data || [])
//         setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts")
//       if (response.ok) {
//         const alertsData = await response.json()
//         setEmergencyAlerts(alertsData.data || [])
//         setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
//       }
//     } catch (error) {
//       console.error("Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     try {
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//           mentionedDoctor: newPost.mentionedDoctor || null,
//         }),
//       })

//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//           mentionedDoctor: "",
//         })
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })

//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     if (!confirm("Are you sure you want to delete this post?")) return

//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })

//       if (response.ok) {
//         toast.success("✅ Post deleted successfully")
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to delete post")
//       }
//     } catch (error) {
//       toast.error("Error deleting post")
//     }
//   }

//        console.log("\nC:\Users\UDAYN\Downloads\healthcare-platform\app\hospital\dashboard\page.tsx")


//        console.log("\nisAvlible:", user.isHandleEmergency);

//   const handleAcceptEmergency = async (alertId: string) => {
//     try {
//       const response = await fetch("/api/hospital/accept-emergency", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId }),
//       })

//       if (response.ok) {
//         toast.success("✅ Emergency accepted! Patient has been notified.")
//         fetchEmergencyAlerts()
//       } else {
//         const data = await response.json()
//         toast.error(data.message || "Failed to accept emergency")
//       }
//     } catch (error) {
//       toast.error("Error accepting emergency")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })

//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleLikePost = async (postId: string) => {
//     try {
//       const response = await fetch("/api/hospital/like-post", {
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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Manage emergency care & health content</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {isHandleEmergency && (
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//               <Switch checked={isAvailable} onCheckedChange={handleToggleAvailability} />
//             </div>
//               )}
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
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage emergency responses and share important health information with the community.
//           </p>
//         </motion.div>
       

    


//         {/* Emergency Alerts Banner */}
//         {notifications > 0 && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <motion.div
//                       className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
//                       animate={{
//                         boxShadow: [
//                           "0 0 0 0 rgba(239, 68, 68, 0.7)",
//                           "0 0 0 10px rgba(239, 68, 68, 0)",
//                           "0 0 0 0 rgba(239, 68, 68, 0)",
//                         ],
//                       }}
//                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-white" />
//                     </motion.div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
//                         {notifications} Pending Emergency Alert{notifications > 1 ? "s" : ""}
//                       </h3>
//                       <p className="text-red-600 dark:text-red-300">Patients need immediate assistance</p>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => document.querySelector('[value="emergencies"]')?.click()}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
//                   >
//                     View Alerts
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                     <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                     <p className="text-xs text-gray-500">{notifications} pending</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                     }}
//                     transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                   >
//                     <AlertTriangle className="w-6 h-6 text-red-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                     <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                       {isAvailable ? "Available" : "Unavailable"}
//                     </p>
//                     <p className="text-xs text-gray-500">Emergency services</p>
//                   </div>
//                   <motion.div
//                     className={`w-12 h-12 ${isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} rounded-full flex items-center justify-center`}
//                     animate={{
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
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
//           <Tabs defaultValue="emergencies" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-5">
//               <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
//               <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             </TabsList>

//             {/* Emergency Alerts Tab */}
//             <TabsContent value="emergencies" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Shield className="w-5 h-5" />
//                     <span>Emergency Alerts</span>
//                     <Badge variant="destructive">{notifications} pending</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {emergencyAlerts.length > 0 ? (
//                     <div className="space-y-4">
//                       {emergencyAlerts.map((alert, index) => (
//                         <motion.div
//                           key={alert._id}
//                           className={`p-4 border rounded-lg ${
//                             alert.status === "pending"
//                               ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                               : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
//                           }`}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div
//                                 className={`w-3 h-3 rounded-full ${
//                                   alert.status === "accepted"
//                                     ? "bg-green-500"
//                                     : alert.status === "pending"
//                                       ? "bg-red-500"
//                                       : "bg-gray-500"
//                                 }`}
//                               />
//                               <div>
//                                 <p className="font-medium">{alert.userId.name}</p>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.email}</p>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.phone}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge
//                                 variant={
//                                   alert.priority === "critical"
//                                     ? "destructive"
//                                     : alert.priority === "high"
//                                       ? "default"
//                                       : "secondary"
//                                 }
//                               >
//                                 {alert.priority}
//                               </Badge>
//                               <Badge variant="outline">{alert.status}</Badge>
//                             </div>
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
//                               <p className="flex items-center">
//                                 <Clock className="w-4 h-4 mr-1" />
//                                 {new Date(alert.createdAt).toLocaleString()}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
//                               <p className="flex items-center">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 {alert.location.lat
//                                   ? `${alert.location.lat.toFixed(4)}, ${alert.location.lng?.toFixed(4)}`
//                                   : alert.location.address || "Address provided"}
//                               </p>
//                             </div>
//                           </div>
//                           {alert.message && (
//                             <div className="mb-4">
//                               <p className="text-sm text-gray-600 dark:text-gray-400">Message</p>
//                               <p className="text-sm">{alert.message}</p>
//                             </div>
//                           )}
//                           {alert.status === "pending" && (
//                             <div className="flex items-center space-x-2">
//                               <Button
//                                 onClick={() => handleAcceptEmergency(alert._id)}
//                                 className="bg-green-600 hover:bg-green-700"
//                               >
//                                 Accept Emergency
//                               </Button>
//                               <Button variant="outline">View Details</Button>
//                             </div>
//                           )}
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No emergency alerts
//                       </h3>
//                       <p className="text-gray-500">Emergency alerts will appear here when patients need help</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Mention Doctor (Optional)</label>
//                       <Select
//                         value={newPost.mentionedDoctor}
//                         onValueChange={(value) => setNewPost({ ...newPost, mentionedDoctor: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select doctor to mention" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="none">No doctor</SelectItem>
//                           {doctors.map((doctor) => (
//                             <SelectItem key={doctor._id} value={doctor._id}>
//                               <div className="flex items-center space-x-2">
//                                 <Stethoscope className="w-4 h-4" />
//                                 <span>Dr. {doctor.name}</span>
//                                 <span className="text-xs text-gray-500">({doctor.specialty})</span>
//                                 {doctor.isVerified && <Award className="w-3 h-3 text-green-500" />}
//                               </div>
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 {post.mentionedId && (
//                                   <Badge variant="secondary">mentioned Dr. {post.mentionedId.name}</Badge>
//                                 )}
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <ThumbsUp className="w-4 h-4" />
//                                 <span className="text-sm">{post.likes.length} likes</span>
//                               </div>
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <MessageSquare className="w-4 h-4" />
//                                 <span className="text-sm">{post.comments.length} comments</span>
//                               </div>
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <Eye className="w-4 h-4" />
//                                 <span className="text-sm">View details</span>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
//                         Create Your First Post
//                       </Button>
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
//                                   <p className="text-xs text-purple-600">mentioned {post.mentionedId.name}</p>
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
//                       <p className="text-gray-500">Doctor posts from your network will appear here</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Analytics Tab */}
//             <TabsContent value="analytics" className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Emergency Response</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Total Alerts</span>
//                         <span className="font-semibold">{emergencyAlerts.length}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Pending Alerts</span>
//                         <span className="font-semibold text-red-600">{notifications}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Accepted Alerts</span>
//                         <span className="font-semibold text-green-600">
//                           {emergencyAlerts.filter((alert) => alert.status === "accepted").length}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Response Rate</span>
//                         <span className="font-semibold">
//                           {emergencyAlerts.length > 0
//                             ? Math.round(
//                                 (emergencyAlerts.filter((alert) => alert.status === "accepted").length /
//                                   emergencyAlerts.length) *
//                                   100,
//                               )
//                             : 0}
//                           %
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post Performance</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Total Posts</span>
//                         <span className="font-semibold">{ownPosts.length}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Total Likes</span>
//                         <span className="font-semibold">
//                           {ownPosts.reduce((sum, post) => sum + post.likes.length, 0)}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Total Comments</span>
//                         <span className="font-semibold">
//                           {ownPosts.reduce((sum, post) => sum + post.comments.length, 0)}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Likes per Post</span>
//                         <span className="font-semibold">
//                           {ownPosts.length > 0
//                             ? Math.round(ownPosts.reduce((sum, post) => sum + post.likes.length, 0) / ownPosts.length)
//                             : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Category Breakdown</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       {categories.map((category) => {
//                         const count = ownPosts.filter((post) => post.category === category).length
//                         const percentage = ownPosts.length > 0 ? (count / ownPosts.length) * 100 : 0
//                         return (
//                           <div key={category} className="space-y-1">
//                             <div className="flex items-center justify-between text-sm">
//                               <span className="capitalize">{category.replace("-", " ")}</span>
//                               <span>{count} posts</span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <div
//                                 className="bg-purple-500 h-2 rounded-full transition-all duration-300"
//                                 style={{ width: `${percentage}%` }}
//                               />
//                             </div>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Network Overview</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</span>
//                         <span className="font-semibold">{doctors.length}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Verified Doctors</span>
//                         <span className="font-semibold text-green-600">
//                           {doctors.filter((doctor) => doctor.isVerified).length}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Doctor Posts</span>
//                         <span className="font-semibold">{doctorPosts.length}</span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Status</span>
//                         <span className={`font-semibold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                           {isAvailable ? "Available" : "Unavailable"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
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
import { motion } from "framer-motion"
import {
  Building2,
  Plus,
  AlertTriangle,
  MessageSquare,
  Bell,
  Send,
  UserCheck,
  Tag,
  Calendar,
  ThumbsUp,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Shield,
  Activity,
  Stethoscope,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/hooks/useAuth"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import { toast } from "react-hot-toast"

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

interface Doctor {
  _id: string
  name: string
  email: string
  specialty: string
  isVerified: boolean
}

interface EmergencyAlert {
  _id: string
  userId: {
    name: string
    email: string
    phone: string
  }
  location: {
    lat?: number
    lng?: number
    address?: string
  }
  message: string
  priority: string
  status: string
  createdAt: string
}

interface HospitalData {
  _id: string
  name: string
  email: string
  phone: string
  isAvailable: boolean
  isHandleEmergency: boolean
  isVerified: boolean
  address: any
  location: {
    lat?: number
    lng?: number
  }
}

export default function HospitalDashboard() {
  const { user } = useAuth()
  const [ownPosts, setOwnPosts] = useState<Post[]>([])
  const [doctorPosts, setDoctorPosts] = useState<Post[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(0)
  const [hospital, setHospital] = useState<HospitalData | null>(null)
  const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
  const [isAvailable, setIsAvailable] = useState<boolean>(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Post creation state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    mentionedDoctor: "",
  })

  const categories = [
    "emergency-care",
    "hospital-services",
    "health-tips",
    "prevention",
    "treatment",
    "facilities",
    "announcements",
    "cardiology",
    "neurology",
    "pediatrics",
  ]

  useEffect(() => {
    fetchHospitalData()
    fetchDashboardData()
    // Poll for emergency alerts every 30 seconds
    const interval = setInterval(fetchEmergencyAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchHospitalData = async () => {
    try {
      const response = await fetch("/api/hospital/me")
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setHospital(result.data)
          setIsHandleEmergency(result.data.isHandleEmergency)
          setIsAvailable(result.data.isAvailable)
          console.log("Hospital data:", result.data)
          console.log("isHandleEmergency:", result.data.isHandleEmergency)
        }
      } else {
        console.error("Failed to fetch hospital data")
        toast.error("Failed to load hospital settings")
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error)
      toast.error("Error loading hospital data")
    }
  }

  const fetchDashboardData = async () => {
    try {
      const [ownPostsRes, doctorPostsRes, doctorsRes, alertsRes] = await Promise.all([
        fetch("/api/hospital/own-posts"),
        fetch("/api/hospital/doctor-posts"),
        fetch("/api/hospital/doctors"),
        fetch("/api/hospital/emergency-alerts"),
      ])

      if (ownPostsRes.ok) {
        const ownPostsData = await ownPostsRes.json()
        setOwnPosts(ownPostsData.data || [])
      }

      if (doctorPostsRes.ok) {
        const doctorPostsData = await doctorPostsRes.json()
        setDoctorPosts(doctorPostsData.data || [])
      }

      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json()
        setDoctors(doctorsData.data || [])
      }

      if (alertsRes.ok) {
        const alertsData = await alertsRes.json()
        setEmergencyAlerts(alertsData.data || [])
        setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmergencyAlerts = async () => {
    try {
      const response = await fetch("/api/hospital/emergency-alerts")
      if (response.ok) {
        const alertsData = await response.json()
        setEmergencyAlerts(alertsData.data || [])
        setNotifications(alertsData.data?.filter((alert) => alert.status === "pending").length || 0)
      }
    } catch (error) {
      console.error("Error fetching emergency alerts:", error)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/hospital/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          tags: newPost.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          mentionedDoctor: newPost.mentionedDoctor || null,
        }),
      })

      if (response.ok) {
        toast.success("✅ Post created successfully! Awaiting admin approval.")
        setNewPost({
          title: "",
          content: "",
          category: "",
          tags: "",
          mentionedDoctor: "",
        })
        fetchDashboardData()
      } else {
        toast.error("Failed to create post")
      }
    } catch (error) {
      toast.error("Error creating post")
    }
  }

  const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
    try {
      const response = await fetch("/api/hospital/edit-post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, ...updatedData }),
      })

      if (response.ok) {
        toast.success("✅ Post updated successfully!")
        setEditingPost(null)
        fetchDashboardData()
      } else {
        toast.error("Failed to update post")
      }
    } catch (error) {
      toast.error("Error updating post")
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch("/api/hospital/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        toast.success("✅ Post deleted successfully")
        fetchDashboardData()
      } else {
        toast.error("Failed to delete post")
      }
    } catch (error) {
      toast.error("Error deleting post")
    }
  }

  const handleAcceptEmergency = async (alertId: string) => {
    try {
      const response = await fetch("/api/hospital/accept-emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      })

      if (response.ok) {
        toast.success("✅ Emergency accepted! Patient has been notified.")
        fetchEmergencyAlerts()
      } else {
        const data = await response.json()
        toast.error(data.message || "Failed to accept emergency")
      }
    } catch (error) {
      toast.error("Error accepting emergency")
    }
  }

  const handleToggleAvailability = async () => {
    try {
      const response = await fetch("/api/hospital/toggle-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !isAvailable }),
      })

      if (response.ok) {
        setIsAvailable(!isAvailable)
        toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
      } else {
        toast.error("Failed to update availability")
      }
    } catch (error) {
      toast.error("Error updating availability")
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      const response = await fetch("/api/hospital/like-post", {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Conditionally show emergency toggle only if hospital handles emergencies */}
            {isHandleEmergency && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleToggleAvailability}
                  disabled={!isHandleEmergency}
                />
              </div>
            )}
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {notifications > 0 && isHandleEmergency && (
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isHandleEmergency
              ? "Manage emergency responses and share important health information with the community."
              : "Share important health information and connect with the medical community."}
          </p>
          {/* Debug info - remove in production */}
          <div className="mt-2 text-xs text-gray-500">
            Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
          </div>
        </motion.div>

        {/* Emergency Alerts Banner - Only show if hospital handles emergencies */}
        {notifications > 0 && isHandleEmergency && (
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
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                        {notifications} Pending Emergency Alert{notifications > 1 ? "s" : ""}
                      </h3>
                      <p className="text-red-600 dark:text-red-300">Patients need immediate assistance</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => document.querySelector('[value="emergencies"]')?.click()}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
                  >
                    View Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
          {isHandleEmergency && (
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
                      <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
                      <p className="text-xs text-gray-500">{notifications} pending</p>
                    </div>
                    <motion.div
                      className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
                      animate={{
                        scale: notifications > 0 ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
                    <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
                    <p className="text-xs text-gray-500">Published content</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <MessageSquare className="w-6 h-6 text-purple-600" />
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
                    <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
                    <p className="text-xs text-gray-500">Network partners</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Card - Only show if hospital handles emergencies */}
          {isHandleEmergency && (
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                        {isAvailable ? "Available" : "Unavailable"}
                      </p>
                      <p className="text-xs text-gray-500">Emergency services</p>
                    </div>
                    <motion.div
                      className={`w-12 h-12 ${isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} rounded-full flex items-center justify-center`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue={isHandleEmergency ? "emergencies" : "create"} className="space-y-6">
            <TabsList className={`grid w-full ${isHandleEmergency ? "grid-cols-5" : "grid-cols-4"}`}>
              {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
              <TabsTrigger value="doctor-posts">Doctor Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
            {isHandleEmergency && (
              <TabsContent value="emergencies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Emergency Alerts</span>
                      <Badge variant="destructive">{notifications} pending</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {emergencyAlerts.length > 0 ? (
                      <div className="space-y-4">
                        {emergencyAlerts.map((alert, index) => (
                          <motion.div
                            key={alert._id}
                            className={`p-4 border rounded-lg ${
                              alert.status === "pending"
                                ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                                : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    alert.status === "accepted"
                                      ? "bg-green-500"
                                      : alert.status === "pending"
                                        ? "bg-red-500"
                                        : "bg-gray-500"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium">{alert.userId.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.email}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.phone}</p>
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
                                <Badge variant="outline">{alert.status}</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                                <p className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {new Date(alert.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                <p className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {alert.location.lat
                                    ? `${alert.location.lat.toFixed(4)}, ${alert.location.lng?.toFixed(4)}`
                                    : alert.location.address || "Address provided"}
                                </p>
                              </div>
                            </div>
                            {alert.message && (
                              <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Message</p>
                                <p className="text-sm">{alert.message}</p>
                              </div>
                            )}
                            {alert.status === "pending" && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  onClick={() => handleAcceptEmergency(alert._id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Accept Emergency
                                </Button>
                                <Button variant="outline">View Details</Button>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          No emergency alerts
                        </h3>
                        <p className="text-gray-500">Emergency alerts will appear here when patients need help</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Create Post Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create New Hospital Post</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Post Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="e.g., New Emergency Department Now Open 24/7"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Share hospital updates, health tips, or important announcements..."
                      className="w-full min-h-[200px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Mention Doctor (Optional)</label>
                      <Select
                        value={newPost.mentionedDoctor}
                        onValueChange={(value) => setNewPost({ ...newPost, mentionedDoctor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor to mention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No doctor</SelectItem>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor._id} value={doctor._id}>
                              <div className="flex items-center space-x-2">
                                <Stethoscope className="w-4 h-4" />
                                <span>Dr. {doctor.name}</span>
                                <span className="text-xs text-gray-500">({doctor.specialty})</span>
                                {doctor.isVerified && <Award className="w-3 h-3 text-green-500" />}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Own Posts Tab */}
            <TabsContent value="own-posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span>My Posts</span>
                    <Badge variant="secondary">{ownPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ownPosts.length > 0 ? (
                    <div className="space-y-4">
                      {ownPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
                                {post.mentionedId && (
                                  <Badge variant="secondary">mentioned Dr. {post.mentionedId.name}</Badge>
                                )}
                                <Badge variant={post.isApproved ? "default" : "destructive"}>
                                  {post.isApproved ? "Approved" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Post</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input
                                      defaultValue={post.title}
                                      placeholder="Post title"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                      }
                                    />
                                    <Textarea
                                      defaultValue={post.content}
                                      placeholder="Post content"
                                      className="min-h-[200px]"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
                                      }
                                    />
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() =>
                                          editingPost &&
                                          handleEditPost(editingPost._id, {
                                            title: editingPost.title,
                                            content: editingPost.content,
                                          })
                                        }
                                        className="bg-purple-600 hover:bg-purple-700"
                                      >
                                        Save Changes
                                      </Button>
                                      <Button variant="outline" onClick={() => setEditingPost(null)}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{post.likes.length} likes</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm">{post.comments.length} comments</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">View details</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
                      <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
                      <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
                        Create Your First Post
                      </Button>
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
                                  <p className="text-xs text-purple-600">mentioned {post.mentionedId.name}</p>
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
                      <p className="text-gray-500">Doctor posts from your network will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Alerts</span>
                        <span className="font-semibold">{emergencyAlerts.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Pending Alerts</span>
                        <span className="font-semibold text-red-600">{notifications}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Accepted Alerts</span>
                        <span className="font-semibold text-green-600">
                          {emergencyAlerts.filter((alert) => alert.status === "accepted").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Response Rate</span>
                        <span className="font-semibold">
                          {emergencyAlerts.length > 0
                            ? Math.round(
                                (emergencyAlerts.filter((alert) => alert.status === "accepted").length /
                                  emergencyAlerts.length) *
                                  100,
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Post Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Posts</span>
                        <span className="font-semibold">{ownPosts.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Likes</span>
                        <span className="font-semibold">
                          {ownPosts.reduce((sum, post) => sum + post.likes.length, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Comments</span>
                        <span className="font-semibold">
                          {ownPosts.reduce((sum, post) => sum + post.comments.length, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Likes per Post</span>
                        <span className="font-semibold">
                          {ownPosts.length > 0
                            ? Math.round(ownPosts.reduce((sum, post) => sum + post.likes.length, 0) / ownPosts.length)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.map((category) => {
                        const count = ownPosts.filter((post) => post.category === category).length
                        const percentage = ownPosts.length > 0 ? (count / ownPosts.length) * 100 : 0
                        return (
                          <div key={category} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="capitalize">{category.replace("-", " ")}</span>
                              <span>{count} posts</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Network Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</span>
                        <span className="font-semibold">{doctors.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Verified Doctors</span>
                        <span className="font-semibold text-green-600">
                          {doctors.filter((doctor) => doctor.isVerified).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Doctor Posts</span>
                        <span className="font-semibold">{doctorPosts.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Status</span>
                        <span className={`font-semibold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
