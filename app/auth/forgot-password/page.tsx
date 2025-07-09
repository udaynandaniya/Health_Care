// // //C:\Users\UDAYN\Downloads\healthcare-platform\app\auth\forgot-password\page.tsx
// // "use client"

// // import React, { useEffect, useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { ArrowLeft, Heart } from "lucide-react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Label } from "@/components/ui/label"
// // import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// // import ThemeToggle from "@/components/ThemeToggle"
// // import { toast } from "react-hot-toast"
// // import zxcvbn from "zxcvbn"

// // export default function ForgotPasswordPage() {
// //   const router = useRouter()

// //   const [role, setRole] = useState("")
// //   const [email, setEmail] = useState("")
// //   const [otpSent, setOtpSent] = useState(false)
// //   const [otp, setOtp] = useState("")
// //   const [verified, setVerified] = useState(false)
// //   const [newPassword, setNewPassword] = useState("")
// //   const [resendTimer, setResendTimer] = useState(0)
// //   const [loading, setLoading] = useState(false)

// //   useEffect(() => {
// //     if (resendTimer <= 0) return
// //     const interval = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
// //     return () => clearTimeout(interval)
// //   }, [resendTimer])

// //   const handleSendOtp = async () => {
// //     if (!email || !role) {
// //       toast.error("Please select your role and enter your email")
// //       return
// //     }

// //     try {
// //       const res = await fetch("/api/auth/reset-by-otp/send-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       })

// //       const data = await res.json()
// //       if (!res.ok) return toast.error(data.error || "Failed to send OTP")

// //       setOtpSent(true)
// //       setResendTimer(60)
// //       toast.success("OTP sent to your email")
// //     } catch (err) {
// //       toast.error("Something went wrong while sending OTP")
// //     }
// //   }

// //   const handleVerifyOtp = async () => {
// //     if (!otp) {
// //       toast.error("Please enter the OTP")
// //       return
// //     }

// //     try {
// //       const res = await fetch("/api/auth/reset-by-otp/verify-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, otp }),
// //       })

// //       const data = await res.json()
// //       if (!res.ok) return toast.error(data.error || "Invalid OTP")

// //       setVerified(true)
// //       toast.success("OTP verified, now set your new password")
// //     } catch (err) {
// //       toast.error("Verification failed")
// //     }
// //   }

// //   const handleResetPassword = async () => {
// //     if (!zxcvbn(newPassword).score >= 3) {
// //       return toast.error("Password is too weak")
// //     }

// //     setLoading(true)
// //     try {
// //       const res = await fetch("/api/auth/reset-by-otp/reset-password", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, otp, newPassword }),
// //       })

// //       const data = await res.json()
// //       if (!res.ok) return toast.error(data.error || "Reset failed")

// //       toast.success("Password reset! Redirecting to login...")
// //       setTimeout(() => router.push("/login"), 1000)
// //     } catch (err) {
// //       toast.error("Password reset failed")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// //       <div className="absolute top-6 left-6">
// //         <Link href="/">
// //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// //             <ArrowLeft className="w-4 h-4" />
// //             Back to Home
// //           </Button>
// //         </Link>
// //       </div>

// //       <div className="absolute top-6 right-6">
// //         <ThemeToggle />
// //       </div>

// //       <Card className="w-full max-w-md">
// //         <CardHeader className="text-center">
// //           <div className="flex justify-center mb-4">
// //             <Heart className="w-12 h-12 text-red-500" />
// //           </div>
// //           <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
// //           <p className="text-gray-600 dark:text-gray-400">Reset your RuralReach account password</p>
// //         </CardHeader>

// //         <CardContent className="space-y-4">
// //           <div>
// //             <Label>I am a</Label>
// //             <Select value={role} onValueChange={setRole}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select your role" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="user">User</SelectItem>
// //                 <SelectItem value="doctor">Doctor</SelectItem>
// //                 <SelectItem value="hospital">Hospital</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div>
// //             <Label>Email</Label>
// //             <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //           </div>

// //           {!otpSent ? (
// //             <Button onClick={handleSendOtp} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
// //               Send OTP
// //             </Button>
// //           ) : (
// //             <>
// //               <div>
// //                 <Label>OTP</Label>
// //                 <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
// //               </div>
// //               {!verified && (
// //                 <Button onClick={handleVerifyOtp} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
// //                   Verify OTP
// //                 </Button>
// //               )}
// //               {verified && (
// //                 <>
// //                   <div>
// //                     <Label>New Password</Label>
// //                     <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
// //                   </div>
// //                   <Button
// //                     onClick={handleResetPassword}
// //                     className="w-full bg-green-600 hover:bg-green-700 text-white"
// //                     disabled={loading}
// //                   >
// //                     {loading ? "Resetting..." : "Reset Password"}
// //                   </Button>
// //                 </>
// //               )}
// //               <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
// //                 {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : ""}
// //               </p>
// //             </>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
// import { Heart, ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import ThemeToggle from "@/components/ThemeToggle"
// import zxcvbn from "zxcvbn"

// export default function ForgotPasswordPage() {
//   const { toast } = useToast()
//   const [tab, setTab] = useState<"old" | "otp">("old")

//   // Role selection (shared between both tabs)
//   const [role, setRole] = useState("")

//   // old-password flow
//   const [emailOld, setEmailOld] = useState("")
//   const [oldPwd, setOldPwd] = useState("")
//   const [newPwdOld, setNewPwdOld] = useState("")
//   const [loadingOld, setLoadingOld] = useState(false)

//   // otp flow
//   const [emailOtp, setEmailOtp] = useState("")
//   const [otpSent, setOtpSent] = useState(false)
//   const [otpCode, setOtpCode] = useState("")
//   const [otpVerified, setOtpVerified] = useState(false)
//   const [newPwdOtp, setNewPwdOtp] = useState("")
//   const [loadingOtp, setLoadingOtp] = useState(false)
//   const [resendTimer, setResendTimer] = useState(0)

//   // cooldown logic
//   useEffect(() => {
//     if (resendTimer <= 0) return
//     const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
//     return () => clearTimeout(t)
//   }, [resendTimer])

//   const pwdStrong = (pwd: string) => zxcvbn(pwd).score >= 3

//   async function submitOld() {
//     if (!emailOld || !oldPwd || !newPwdOld) {
//       return toast({ title: "Error", description: "All fields required", variant: "destructive" })
//     }
//     if (!pwdStrong(newPwdOld)) {
//       return toast({ title: "Error", description: "New password too weak", variant: "destructive" })
//     }

//     setLoadingOld(true)
//     try {
//       const res = await fetch("/api/auth/reset-by-old", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: emailOld,
//           role: role || undefined, // Send role if selected, otherwise let backend find user
//           oldPassword: oldPwd,
//           newPassword: newPwdOld,
//         }),
//       })
//       const data = await res.json()

//       if (!res.ok) {
//         return toast({ title: "Error", description: data.error, variant: "destructive" })
//       }

//       toast({ title: "Success", description: "Password reset—please login." })
//       setTimeout(() => (window.location.href = "/auth/login"), 800)
//     } catch (error) {
//       toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
//     } finally {
//       setLoadingOld(false)
//     }
//   }

//   async function doSendOtp() {
//     if (!emailOtp) {
//       return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
//     }

//     setLoadingOtp(true)
//     try {
//       const res = await fetch("/api/auth/reset-by-otp/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: emailOtp,
//           role: role || undefined, // Send role if selected
//         }),
//       })
//       const data = await res.json()

//       if (!res.ok) {
//         return toast({ title: "Error", description: data.error, variant: "destructive" })
//       }

//       setOtpSent(true)
//       setResendTimer(60)
//       toast({ title: "OTP Sent", description: "Check your email" })
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to send OTP", variant: "destructive" })
//     } finally {
//       setLoadingOtp(false)
//     }
//   }

//   async function doVerifyOtp() {
//     if (!otpCode) {
//       return toast({ title: "Error", description: "Enter the OTP", variant: "destructive" })
//     }

//     try {
//       const res = await fetch("/api/auth/reset-by-otp/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailOtp, otp: otpCode }),
//       })
//       const data = await res.json()

//       if (!res.ok) {
//         return toast({ title: "Error", description: data.error, variant: "destructive" })
//       }

//       setOtpVerified(true)
//       toast({ title: "OTP Verified", description: "Now enter new password" })
//     } catch (error) {
//       toast({ title: "Error", description: "Verification failed", variant: "destructive" })
//     }
//   }

//   async function doResetOtpPwd() {
//     if (!pwdStrong(newPwdOtp)) {
//       return toast({ title: "Error", description: "Password too weak", variant: "destructive" })
//     }

//     try {
//       const res = await fetch("/api/auth/reset-by-otp/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailOtp, otp: otpCode, newPassword: newPwdOtp }),
//       })
//       const data = await res.json()

//       if (!res.ok) {
//         return toast({ title: "Error", description: data.error, variant: "destructive" })
//       }

//       toast({ title: "Success", description: "Password reset—please login." })
//       setTimeout(() => (window.location.href = "/auth/login"), 800)
//     } catch (error) {
//       toast({ title: "Error", description: "Password reset failed", variant: "destructive" })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <div className="absolute top-6 left-6">
//         <Link href="/">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Button>
//         </Link>
//       </div>

//       <div className="absolute top-6 right-6">
//         <ThemeToggle />
//       </div>

//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <Heart className="w-12 h-12 text-red-500" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
//           <p className="text-gray-600 dark:text-gray-400">Choose your preferred reset method</p>
//         </CardHeader>

//         <CardContent>
//           {/* Role Selection */}
//           <div className="mb-6">
//             <Label>I am a (Optional - helps find your account faster)</Label>
//             <Select value={role} onValueChange={setRole}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select your role (optional)" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="user">User</SelectItem>
//                 <SelectItem value="doctor">Doctor</SelectItem>
//                 <SelectItem value="hospital">Hospital</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs value={tab} onValueChange={setTab}>
//             <TabsList className="bg-purple-200 rounded-lg overflow-hidden w-full">
//               <TabsTrigger value="old" className="w-1/2">
//                 Use Old Password
//               </TabsTrigger>
//               <TabsTrigger value="otp" className="w-1/2">
//                 Reset via OTP
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="old" className="mt-4 space-y-3">
//               <Label>Email</Label>
//               <Input type="email" value={emailOld} onChange={(e) => setEmailOld(e.target.value)} />

//               <Label>Current Password</Label>
//               <Input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />

//               <Label>New Password</Label>
//               <Input type="password" value={newPwdOld} onChange={(e) => setNewPwdOld(e.target.value)} />

//               <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={submitOld} disabled={loadingOld}>
//                 {loadingOld ? "Resetting…" : "Reset Password"}
//               </Button>
//             </TabsContent>

//             <TabsContent value="otp" className="mt-4 space-y-3">
//               <Label>Email</Label>
//               <Input type="email" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} />

//               <Button
//                 className="w-full bg-purple-600 hover:bg-purple-700"
//                 onClick={doSendOtp}
//                 disabled={(otpSent && resendTimer > 0) || loadingOtp}
//               >
//                 {loadingOtp ? "Sending..." : otpSent && resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Send OTP"}
//               </Button>

//               {otpSent && (
//                 <>
//                   <Label>OTP Code</Label>
//                   <Input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
//                   <Button
//                     className="w-full bg-purple-600 hover:bg-purple-700"
//                     onClick={doVerifyOtp}
//                     disabled={otpVerified}
//                   >
//                     {otpVerified ? "OTP Verified ✓" : "Verify OTP"}
//                   </Button>
//                 </>
//               )}

//               {otpVerified && (
//                 <>
//                   <Label>New Password</Label>
//                   <Input type="password" value={newPwdOtp} onChange={(e) => setNewPwdOtp(e.target.value)} />
//                   <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={doResetOtpPwd}>
//                     Reset Password
//                   </Button>
//                 </>
//               )}
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import zxcvbn from "zxcvbn"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [tab, setTab] = useState<"old" | "otp">("old")

  // Role selection (shared between both tabs)
  const [role, setRole] = useState("")

  // old-password flow
  const [emailOld, setEmailOld] = useState("")
  const [oldPwd, setOldPwd] = useState("")
  const [newPwdOld, setNewPwdOld] = useState("")
  const [loadingOld, setLoadingOld] = useState(false)

  // otp flow
  const [emailOtp, setEmailOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)
  const [newPwdOtp, setNewPwdOtp] = useState("")
  const [loadingOtp, setLoadingOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // cooldown logic
  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const pwdStrong = (pwd: string) => zxcvbn(pwd).score >= 3

  async function submitOld() {
    if (!emailOld || !oldPwd || !newPwdOld) {
      return toast({ title: "Error", description: "All fields required", variant: "destructive" })
    }
    if (!pwdStrong(newPwdOld)) {
      return toast({ title: "Error", description: "New password too weak", variant: "destructive" })
    }

    setLoadingOld(true)
    try {
      const res = await fetch("/api/auth/reset-by-old", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOld,
          role: role || undefined,
          oldPassword: oldPwd,
          newPassword: newPwdOld,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        return toast({ title: "Error", description: data.error, variant: "destructive" })
      }

      toast({
        title: "Success",
        description: "Password reset successfully! Please login with your new password.",
        duration: 3000,
      })

      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    } finally {
      setLoadingOld(false)
    }
  }

  async function doSendOtp() {
    if (!emailOtp) {
      return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
    }

    setLoadingOtp(true)
    try {
      const res = await fetch("/api/auth/reset-by-otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailOtp,
          role: role || undefined,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        return toast({ title: "Error", description: data.error, variant: "destructive" })
      }

      setOtpSent(true)
      setResendTimer(60)
      toast({ title: "OTP Sent", description: "Check your email for verification code" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to send OTP", variant: "destructive" })
    } finally {
      setLoadingOtp(false)
    }
  }

  async function doVerifyOtp() {
    if (!otpCode) {
      return toast({ title: "Error", description: "Enter the OTP", variant: "destructive" })
    }

    try {
      const res = await fetch("/api/auth/reset-by-otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOtp, otp: otpCode }),
      })
      const data = await res.json()

      if (!res.ok) {
        return toast({ title: "Error", description: data.error, variant: "destructive" })
      }

      setOtpVerified(true)
      toast({ title: "OTP Verified", description: "Now enter your new password" })
    } catch (error) {
      toast({ title: "Error", description: "Verification failed", variant: "destructive" })
    }
  }

  async function doResetOtpPwd() {
    if (!pwdStrong(newPwdOtp)) {
      return toast({ title: "Error", description: "Password too weak", variant: "destructive" })
    }

    setLoadingOtp(true)
    try {
      const res = await fetch("/api/auth/reset-by-otp/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOtp, otp: otpCode, newPassword: newPwdOtp }),
      })
      const data = await res.json()

      if (!res.ok) {
        return toast({ title: "Error", description: data.error, variant: "destructive" })
      }

      toast({
        title: "Success",
        description: "Password reset successfully! Please login with your new password.",
        duration: 3000,
      })

      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)
    } catch (error) {
      toast({ title: "Error", description: "Password reset failed", variant: "destructive" })
    } finally {
      setLoadingOtp(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Choose your preferred reset method</p>
        </CardHeader>

        <CardContent>
          {/* Role Selection */}
          <div className="mb-6">
            <Label>I am a (Optional - helps find your account faster)</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-purple-200 rounded-lg overflow-hidden w-full">
              <TabsTrigger value="old" className="w-1/2">
                Use Old Password
              </TabsTrigger>
              <TabsTrigger value="otp" className="w-1/2">
                Reset via OTP
              </TabsTrigger>
            </TabsList>

            <TabsContent value="old" className="mt-4 space-y-3">
              <Label>Email</Label>
              <Input
                type="email"
                value={emailOld}
                onChange={(e) => setEmailOld(e.target.value)}
                placeholder="Enter your email address"
              />

              <Label>Current Password</Label>
              <Input
                type="password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                placeholder="Enter your current password"
              />

              <Label>New Password</Label>
              <Input
                type="password"
                value={newPwdOld}
                onChange={(e) => setNewPwdOld(e.target.value)}
                placeholder="Enter your new password"
              />

              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={submitOld} disabled={loadingOld}>
                {loadingOld ? "Resetting…" : "Reset Password"}
              </Button>
            </TabsContent>

            <TabsContent value="otp" className="mt-4 space-y-3">
              <Label>Email</Label>
              <Input
                type="email"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                placeholder="Enter your registered email"
              />

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={doSendOtp}
                disabled={(otpSent && resendTimer > 0) || loadingOtp}
              >
                {loadingOtp ? "Sending..." : otpSent && resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Send OTP"}
              </Button>

              {otpSent && (
                <>
                  <Label>OTP Code</Label>
                  <Input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={doVerifyOtp}
                    disabled={otpVerified}
                  >
                    {otpVerified ? "OTP Verified ✓" : "Verify OTP"}
                  </Button>
                </>
              )}

              {otpVerified && (
                <>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPwdOtp}
                    onChange={(e) => setNewPwdOtp(e.target.value)}
                    placeholder="Enter your new password"
                  />
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={doResetOtpPwd}
                    disabled={loadingOtp}
                  >
                    {loadingOtp ? "Resetting..." : "Reset Password"}
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
