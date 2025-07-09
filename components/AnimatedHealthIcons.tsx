"use client"

import { motion } from "framer-motion"
import {
  Building2,
  UserCheck,
  Heart,
  Truck,
  Stethoscope,
  ShirtIcon,
  Syringe,
  Activity,
  Pill,
  Cross,
} from "lucide-react"

const healthIcons = [
  { Icon: Building2, color: "text-purple-500", delay: 0 },
  { Icon: UserCheck, color: "text-green-500", delay: 0.2 },
  { Icon: Heart, color: "text-red-500", delay: 0.4 },
  { Icon: Truck, color: "text-blue-500", delay: 0.6 },
  { Icon: Stethoscope, color: "text-teal-500", delay: 0.8 },
  { Icon: ShirtIcon, color: "text-indigo-500", delay: 1.0 },
  { Icon: Syringe, color: "text-orange-500", delay: 1.2 },
  { Icon: Activity, color: "text-pink-500", delay: 1.4 },
  { Icon: Pill, color: "text-yellow-500", delay: 1.6 },
  { Icon: Cross, color: "text-emerald-500", delay: 1.8 },
]

export default function AnimatedHealthIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {healthIcons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 200,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [Math.random() * 200, Math.random() * 200, Math.random() * 200],
            rotate: [0, 360, 720],
            scale: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay,
            ease: "linear",
          }}
        >
          <Icon size={24 + Math.random() * 16} />
        </motion.div>
      ))}
    </div>
  )
}
