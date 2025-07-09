// "use client"

// import ThemeToggle from "@/components/ThemeToggle"
// import LogoutButton from "@/components/LogoutButton"
// import { useAuth } from "@/hooks/useAuth"
// import SessionStatus from "@/components/SessionStatus"

// export default function DoctorDashboard() {
//   const { user } = useAuth()

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <div className="absolute top-6 left-6">
//         <LogoutButton />
//       </div>

//       <div className="absolute top-6 right-6">
//         <ThemeToggle />
//       </div>

//       <div className="container mx-auto px-4 py-16">
//         <h1 className="text-4xl font-bold text-center text-green-600 dark:text-green-400">Doctor Dashboard</h1>
//         {user && (
//           <p className="text-center text-lg text-gray-700 dark:text-gray-300 mt-2">
//             Welcome back, <span className="font-semibold text-green-600 dark:text-green-400">Dr. {user.name}</span>!
//           </p>
//         )}
//         <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Manage your patients and medical services</p>
//       </div>
//       <SessionStatus />
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Stethoscope,
  Plus,
  Users,
  MessageSquare,
  Heart,
  Bell,
  Send,
  Building2,
  Tag,
  Calendar,
  ThumbsUp,
  Eye,
  Edit,
  Trash2,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Hospital {
  _id: string
  name: string
  email: string
  isVerified: boolean
  specialties: string[]
}

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [ownPosts, setOwnPosts] = useState<Post[]>([])
  const [hospitalPosts, setHospitalPosts] = useState<Post[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(0)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Post creation state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    mentionedHospital: "",
  })

  const categories = [
    "mental-health",
    "physical-health",
    "emergency",
    "prevention",
    "lifestyle",
    "symptoms",
    "treatment",
    "cardiology",
    "neurology",
    "pediatrics",
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [ownPostsRes, hospitalPostsRes, hospitalsRes] = await Promise.all([
        fetch("/api/doctor/own-posts"),
        fetch("/api/doctor/hospital-posts"),
        fetch("/api/doctor/hospitals"),
      ])

      if (ownPostsRes.ok) {
        const ownPostsData = await ownPostsRes.json()
        setOwnPosts(ownPostsData.data || [])
      }

      if (hospitalPostsRes.ok) {
        const hospitalPostsData = await hospitalPostsRes.json()
        setHospitalPosts(hospitalPostsData.data || [])
      }

      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json()
        setHospitals(hospitalsData.data || [])
      }

      setNotifications(hospitalPosts.length)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/doctor/create-post", {
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
          mentionedHospital: newPost.mentionedHospital || null,
        }),
      })

      if (response.ok) {
        toast.success("✅ Post created successfully! Awaiting admin approval.")
        setNewPost({
          title: "",
          content: "",
          category: "",
          tags: "",
          mentionedHospital: "",
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
      const response = await fetch("/api/doctor/edit-post", {
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
      const response = await fetch("/api/doctor/delete-post", {
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

  const handleLikePost = async (postId: string) => {
    try {
      const response = await fetch("/api/doctor/like-post", {
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading doctor dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
              <Stethoscope className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share your medical expertise</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {notifications > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, Dr. {user?.name}! 👨‍⚕️</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your medical knowledge and connect with hospitals in your network.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
                    <p className="text-2xl font-bold text-green-600">{ownPosts.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Published content</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <MessageSquare className="w-6 h-6 text-green-600" />
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
                    <p className="text-2xl font-bold text-red-600">
                      {ownPosts.reduce((sum, post) => sum + post.likes.length, 0)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Community appreciation</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="w-6 h-6 text-red-600" />
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {ownPosts.reduce((sum, post) => sum + post.comments.length, 0)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Engagement</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Users className="w-6 h-6 text-blue-600" />
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connected Hospitals</p>
                    <p className="text-2xl font-bold text-purple-600">{hospitals.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Network partners</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Building2 className="w-6 h-6 text-purple-600" />
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
              <TabsTrigger value="hospital-posts">Hospital Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Create Post Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create New Medical Post</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Post Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="e.g., 5 Early Signs of Heart Disease You Shouldn't Ignore"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Share your medical expertise, tips, or health advice..."
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
                      <label className="block text-sm font-medium mb-2">Mention Hospital (Optional)</label>
                      <Select
                        value={newPost.mentionedHospital}
                        onValueChange={(value) => setNewPost({ ...newPost, mentionedHospital: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital to mention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No hospital</SelectItem>
                          {hospitals.map((hospital) => (
                            <SelectItem key={hospital._id} value={hospital._id}>
                              <div className="flex items-center space-x-2">
                                <Building2 className="w-4 h-4" />
                                <span>{hospital.name}</span>
                                {hospital.isVerified && <Award className="w-3 h-3 text-green-500" />}
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
                      placeholder="e.g., cardiology, prevention, symptoms, health-tips"
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={handleCreatePost}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
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
                    <Stethoscope className="w-5 h-5 text-green-600" />
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
                                  <Badge variant="secondary">mentioned {post.mentionedId.name}</Badge>
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
                                        className="bg-green-600 hover:bg-green-700"
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
                      <p className="text-gray-500 mb-4">Start sharing your medical expertise with the community</p>
                      <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
                        Create Your First Post
                      </Button>
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
                      <p className="text-gray-500">Hospital posts from your network will appear here</p>
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
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
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
