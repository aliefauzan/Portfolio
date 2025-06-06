'use client'
import { motion } from "framer-motion"
import { useState } from "react"
import React from 'react'
import { cn } from '@/lib/utils'

// Interactive Card Component
interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}

const Interactive3DCard = ({ children, className = "", glowEffect = false }: Interactive3DCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`card-3d ${glowEffect ? 'iridescent-glow' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        scale: { duration: 0.2 }
      }}
    >
      {/* Holographic overlay effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none rounded-lg ${
          isHovered ? 'opacity-10' : 'opacity-0'
        } ${
          glowEffect
            ? 'bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 mix-blend-color-dodge'
            : ''
        }`}
      />
      {/* Pokemon Shine Overlay */}
      <div className="pokemon-shine-overlay" />
      {children}
    </motion.div>
  )
}

export { Interactive3DCard }