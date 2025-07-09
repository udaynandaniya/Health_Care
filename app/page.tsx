

// //C:\Users\UDAYN\Downloads\healthcare-platform\app\page.tsx

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import {
//   Heart,
//   Stethoscope,
//   Users,
//   Building2,
//   UserCheck,
//   Activity,
//   Pill,
//   Ambulance,
//   Cross,
//   Brain,
//   Thermometer,
//   Syringe,
//   Clock,
//   MapPin,
//   Phone,
//   ArrowRight,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import { useAuth } from "@/hooks/useAuth"
// import { useRouter } from "next/navigation"

// // Floating icon data with positions and animations
// const floatingIcons = [
//   { Icon: Stethoscope, color: "text-blue-500", size: "w-8 h-8", position: { top: "15%", left: "8%" }, delay: 0 },
//   { Icon: Heart, color: "text-red-500", size: "w-10 h-10", position: { top: "25%", right: "12%" }, delay: 0.5 },
//   { Icon: Activity, color: "text-green-500", size: "w-7 h-7", position: { top: "45%", left: "5%" }, delay: 1 },
//   { Icon: Pill, color: "text-purple-500", size: "w-6 h-6", position: { top: "60%", right: "8%" }, delay: 1.5 },
//   { Icon: Ambulance, color: "text-orange-500", size: "w-9 h-9", position: { top: "35%", right: "25%" }, delay: 2 },
//   { Icon: Cross, color: "text-red-600", size: "w-8 h-8", position: { top: "70%", left: "15%" }, delay: 2.5 },
//   { Icon: Brain, color: "text-pink-500", size: "w-7 h-7", position: { top: "20%", left: "25%" }, delay: 3 },
//   { Icon: Thermometer, color: "text-yellow-500", size: "w-6 h-6", position: { top: "55%", left: "30%" }, delay: 3.5 },
//   { Icon: Syringe, color: "text-indigo-500", size: "w-8 h-8", position: { top: "40%", right: "35%" }, delay: 4 },
// ]

// export default function LandingPage() {
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null)
//   const { isAuthenticated, user, isLoading } = useAuth()
//   const router = useRouter()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Checking your session...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
//       {/* Floating Healthcare Icons */}
//       {floatingIcons.map((item, index) => (
//         <motion.div
//           key={index}
//           className={`absolute ${item.size} ${item.color} opacity-20 dark:opacity-10 hidden lg:block`}
//           style={item.position}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{
//             opacity: [0.1, 0.3, 0.1],
//             scale: [0.8, 1.2, 0.8],
//             x: [0, 10, -10, 0],
//             y: [0, -15, 10, 0],
//           }}
//           transition={{
//             duration: 6,
//             delay: item.delay,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         >
//           <item.Icon className="w-full h-full" />
//         </motion.div>
//       ))}

//       {/* Header */}
//       <header className="relative z-10 flex items-center justify-between p-6 lg:px-12">
//         {/* Logo and Brand */}
//         <motion.div
//           className="flex items-center space-x-3"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="relative">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
//               <Heart className="w-7 h-7 text-white" />
//             </div>
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
//               <Cross className="w-2 h-2 text-white" />
//             </div>
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               RuralReach
//             </h1>
//             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Healthcare Platform</p>
//           </div>
//         </motion.div>

//         {/* Navigation */}
//         <motion.div
//           className="hidden md:flex items-center space-x-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Link
//             href="#"
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
//           >
//             Home
//           </Link>
//           <Link
//             href="#services"
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
//           >
//             Services
//           </Link>
//           <Link
//             href="#about"
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
//           >
//             About
//           </Link>
//           <Link
//             href="#contact"
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
//           >
//             Contact
//           </Link>
//         </motion.div>

//         {/* Right side buttons */}
//         <motion.div
//           className="flex items-center space-x-4"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <ThemeToggle />
//           {!isAuthenticated ? (
//             <>
//               <Link href="/auth/login">
//                 <Button variant="ghost" className="hidden sm:inline-flex font-medium">
//                   Log In
//                 </Button>
//               </Link>
//               <Link href="#roles">
//                 <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-6 rounded-full">
//                   Join For Free
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <UserDropdown />
//           )}
//         </motion.div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
//         <motion.div
//           className="max-w-6xl mx-auto"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//         >
//           {/* Main Headline */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
//             <span className="text-gray-900 dark:text-white">A Platform where </span>
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg transform -rotate-1 inline-block">
//                 Healthcare
//               </span>
//             </span>
//             <span className="text-gray-900 dark:text-white"> and </span>
//             <span className="relative inline-block">
//               <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg transform rotate-1 inline-block">
//                 Emergency
//               </span>
//             </span>
//             <br />
//             <span className="text-gray-900 dark:text-white">Meet Together</span>
//           </h1>

//           {/* Subtitle */}
//           <motion.p
//             className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1 }}
//           >
//             Connect with trusted healthcare providers, track your wellness journey, and access emergency care when you
//             need it most.
//           </motion.p>

//           <motion.p
//             className="text-base text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.2 }}
//           >
//             RuralReach bridges the gap between rural communities and quality healthcare — built for those who deserve
//             better access to medical care.
//           </motion.p>

//           {/* CTA Buttons - Only show if user is not authenticated */}
//           {!isAuthenticated && (
//             <motion.div
//               className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.4 }}
//             >
//               <Link href="#roles">
//                 <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//                   Join For Free
//                 </Button>
//               </Link>
//               <Link href="#services">
//                 <Button
//                   variant="outline"
//                   className="font-semibold px-8 py-3 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
//                 >
//                   Explore Services
//                 </Button>
//               </Link>
//             </motion.div>
//           )}

//           {/* Welcome Back Section for Authenticated Users */}
//           {isAuthenticated && user && (
//             <motion.div
//               className="mb-16"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.4 }}
//             >
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
//                   Welcome back, {user.name}!
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">Ready to continue your healthcare journey?</p>
//                 <Link href={user.isAdmin ? "/admin/dashboard" : `/${user.role}/dashboard`}>
//                   <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//                     Go to {user.isAdmin ? "Admin" : user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </Button>
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Role Selection Cards - Only show if user is not authenticated */}
//         {!isAuthenticated && (
//           <motion.div
//             id="roles"
//             className="max-w-6xl mx-auto w-full mb-20"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.6 }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
//               Choose Your Role
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg">
//               Join our healthcare community as a patient, medical professional, or healthcare facility
//             </p>

//             <div className="grid md:grid-cols-3 gap-8 px-4">
//               {/* Users Card */}
//               <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
//                 <Card
//                   className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//                     hoveredCard === "user"
//                       ? "border-blue-500 shadow-2xl shadow-blue-500/25"
//                       : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-xl"
//                   }`}
//                   onMouseEnter={() => setHoveredCard("user")}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <CardContent className="p-8 text-center">
//                     <motion.div
//                       className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <Users className="w-10 h-10 text-white" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Patients</h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                       Access healthcare resources, track your wellness journey, and connect with medical professionals
//                       in your area.
//                     </p>
//                     <Link href="/user/signup">
//                       <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
//                         Join as Patient
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Doctors Card */}
//               <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
//                 <Card
//                   className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//                     hoveredCard === "doctor"
//                       ? "border-green-500 shadow-2xl shadow-green-500/25"
//                       : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:shadow-xl"
//                   }`}
//                   onMouseEnter={() => setHoveredCard("doctor")}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <CardContent className="p-8 text-center">
//                     <motion.div
//                       className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <UserCheck className="w-10 h-10 text-white" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Doctors</h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                       Provide medical guidance, connect with patients remotely, and share your expertise with rural
//                       communities.
//                     </p>
//                     <Link href="/doctor/signup">
//                       <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
//                         Join as Doctor
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Hospitals Card */}
//               <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
//                 <Card
//                   className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//                     hoveredCard === "hospital"
//                       ? "border-purple-500 shadow-2xl shadow-purple-500/25"
//                       : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-xl"
//                   }`}
//                   onMouseEnter={() => setHoveredCard("hospital")}
//                   onMouseLeave={() => setHoveredCard(null)}
//                 >
//                   <CardContent className="p-8 text-center">
//                     <motion.div
//                       className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <Building2 className="w-10 h-10 text-white" />
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Hospitals</h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                       Manage your services, handle emergency cases, and extend your reach to underserved communities.
//                     </p>
//                     <Link href="/hospital/signup">
//                       <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
//                         Join as Hospital
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>

//             {/* Already have account */}
//             <motion.div
//               className="text-center mt-16"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 2 }}
//             >
//               <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">Already part of our community?</p>
//               <Link href="/auth/login">
//                 <Button
//                   variant="outline"
//                   className="px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border-2 rounded-full bg-transparent"
//                 >
//                   Sign In to Your Account
//                 </Button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* Services Section */}
//         <motion.section
//           id="services"
//           className="max-w-6xl mx-auto w-full py-20"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 2.2 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
//             Our Healthcare Services
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg max-w-3xl mx-auto">
//             Comprehensive healthcare solutions designed to serve rural communities with modern technology and
//             compassionate care.
//           </p>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//             <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="text-center p-0">
//                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Clock className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">24/7 Emergency</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">Round-the-clock emergency medical assistance</p>
//               </CardContent>
//             </Card>

//             <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="text-center p-0">
//                 <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Stethoscope className="w-6 h-6 text-green-600" />
//                 </div>
//                 <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Telemedicine</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">Remote consultations with qualified doctors</p>
//               </CardContent>
//             </Card>

//             <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="text-center p-0">
//                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <MapPin className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Location Services</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">Find nearest healthcare facilities</p>
//               </CardContent>
//             </Card>

//             <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
//               <CardContent className="text-center p-0">
//                 <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <Activity className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Health Tracking</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your health metrics and progress</p>
//               </CardContent>
//             </Card>
//           </div>
//         </motion.section>

//         {/* Stats Section */}
//         <motion.section
//           className="max-w-6xl mx-auto w-full py-20"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 2.4 }}
//         >
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-8">Making Healthcare Accessible</h2>
//             <div className="grid md:grid-cols-4 gap-8">
//               <div>
//                 <div className="text-4xl font-bold mb-2">10K+</div>
//                 <div className="text-blue-100">Patients Served</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">500+</div>
//                 <div className="text-blue-100">Healthcare Providers</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">100+</div>
//                 <div className="text-blue-100">Partner Hospitals</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">24/7</div>
//                 <div className="text-blue-100">Emergency Support</div>
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Contact Section */}
//         <motion.section
//           id="contact"
//           className="max-w-6xl mx-auto w-full py-20"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 2.6 }}
//         >
//           <div className="text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
//               Need Help? We're Here for You
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
//               Our support team is available 24/7 to assist you with any healthcare needs or platform questions.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Emergency Hotline
//               </Button>
//               <Button
//                 variant="outline"
//                 className="font-semibold px-8 py-3 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
//               >
//                 Contact Support
//               </Button>
//             </div>
//           </div>
//         </motion.section>
//       </main>

//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Stethoscope,
  Users,
  Building2,
  UserCheck,
  Activity,
  Pill,
  Ambulance,
  Cross,
  Brain,
  Thermometer,
  Syringe,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

// Floating icon data with positions and animations
const floatingIcons = [
  { Icon: Stethoscope, color: "text-blue-500", size: "w-8 h-8", position: { top: "15%", left: "8%" }, delay: 0 },
  { Icon: Heart, color: "text-red-500", size: "w-10 h-10", position: { top: "25%", right: "12%" }, delay: 0.5 },
  { Icon: Activity, color: "text-green-500", size: "w-7 h-7", position: { top: "45%", left: "5%" }, delay: 1 },
  { Icon: Pill, color: "text-purple-500", size: "w-6 h-6", position: { top: "60%", right: "8%" }, delay: 1.5 },
  { Icon: Ambulance, color: "text-orange-500", size: "w-9 h-9", position: { top: "35%", right: "25%" }, delay: 2 },
  { Icon: Cross, color: "text-red-600", size: "w-8 h-8", position: { top: "70%", left: "15%" }, delay: 2.5 },
  { Icon: Brain, color: "text-pink-500", size: "w-7 h-7", position: { top: "20%", left: "25%" }, delay: 3 },
  { Icon: Thermometer, color: "text-yellow-500", size: "w-6 h-6", position: { top: "55%", left: "30%" }, delay: 3.5 },
  { Icon: Syringe, color: "text-indigo-500", size: "w-8 h-8", position: { top: "40%", right: "35%" }, delay: 4 },
]

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Checking your session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Floating Healthcare Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} ${item.color} opacity-20 dark:opacity-10 hidden lg:block`}
          style={item.position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            x: [0, 10, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <item.Icon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6 lg:px-12">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <Cross className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              RuralReach
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Healthcare Platform</p>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="#"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="#services"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Contact
          </Link>
        </motion.div>

        {/* Right side buttons */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="hidden sm:inline-flex font-medium">
                  Log In
                </Button>
              </Link>
              <Link href="#roles">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-6 rounded-full">
                  Join For Free
                </Button>
              </Link>
            </>
          ) : (
            <UserDropdown />
          )}
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900 dark:text-white">A Platform where </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg transform -rotate-1 inline-block">
                Healthcare
              </span>
            </span>
            <span className="text-gray-900 dark:text-white"> and </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg transform rotate-1 inline-block">
                Emergency
              </span>
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Meet Together</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Connect with trusted healthcare providers, track your wellness journey, and access emergency care when you
            need it most.
          </motion.p>

          <motion.p
            className="text-base text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            RuralReach bridges the gap between rural communities and quality healthcare — built for those who deserve
            better access to medical care.
          </motion.p>

          {/* CTA Buttons - Only show if user is not authenticated */}
          {!isAuthenticated && (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Link href="#roles">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Join For Free
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  variant="outline"
                  className="font-semibold px-8 py-3 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Welcome Back Section for Authenticated Users */}
          {isAuthenticated && user && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Welcome back, {user.name}!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Ready to continue your healthcare journey?</p>
                <Link href={user.isAdmin ? "/admin/dashboard" : `/${user.role}/dashboard`}>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Go to {user.isAdmin ? "Admin" : user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Role Selection Cards - Only show if user is not authenticated */}
        {!isAuthenticated && (
          <motion.div
            id="roles"
            className="max-w-6xl mx-auto w-full mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Choose Your Role
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg">
              Join our healthcare community as a patient, medical professional, or healthcare facility
            </p>

            <div className="grid md:grid-cols-3 gap-8 px-4">
              {/* Users Card */}
              <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    hoveredCard === "user"
                      ? "border-blue-500 shadow-2xl shadow-blue-500/25"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setHoveredCard("user")}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Users className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Patients</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Access healthcare resources, track your wellness journey, and connect with medical professionals
                      in your area.
                    </p>
                    <Link href="/user/signup">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        Join as Patient
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Doctors Card */}
              <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    hoveredCard === "doctor"
                      ? "border-green-500 shadow-2xl shadow-green-500/25"
                      : "border-gray-200 dark:border-gray-700 hover:border-green-300 hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setHoveredCard("doctor")}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <UserCheck className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Doctors</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Provide medical guidance, connect with patients remotely, and share your expertise with rural
                      communities.
                    </p>
                    <Link href="/doctor/signup">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        Join as Doctor
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hospitals Card */}
              <motion.div whileHover={{ scale: 1.05, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  className={`relative overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    hoveredCard === "hospital"
                      ? "border-purple-500 shadow-2xl shadow-purple-500/25"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setHoveredCard("hospital")}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Building2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Hospitals</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Manage your services, handle emergency cases, and extend your reach to underserved communities.
                    </p>
                    <Link href="/hospital/signup">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        Join as Hospital
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Already have account */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">Already part of our community?</p>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border-2 rounded-full bg-transparent"
                >
                  Sign In to Your Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Services Section */}
        <motion.section
          id="services"
          className="max-w-6xl mx-auto w-full py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Our Healthcare Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg max-w-3xl mx-auto">
            Comprehensive healthcare solutions designed to serve rural communities with modern technology and
            compassionate care.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">24/7 Emergency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Round-the-clock emergency medical assistance</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Telemedicine</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Remote consultations with qualified doctors</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Location Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Find nearest healthcare facilities</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="text-center p-0">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Health Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your health metrics and progress</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="max-w-6xl mx-auto w-full py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Making Healthcare Accessible</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Patients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Healthcare Providers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Partner Hospitals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Emergency Support</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="max-w-6xl mx-auto w-full py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Need Help? We're Here for You
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Our support team is available 24/7 to assist you with any healthcare needs or platform questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Hotline
              </Button>
              <Button
                variant="outline"
                className="font-semibold px-8 py-3 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}
