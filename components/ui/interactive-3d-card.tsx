'use client'
import { motion } from "framer-motion"
import { useState } from "react"
import React from 'react'
import { cn } from '@/lib/utils'

// 3D Interactive Card Component
interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}

const Interactive3DCard = ({ children, className = "", glowEffect = false }: Interactive3DCardProps) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const newRotateX = (y - centerY) / 12
    const newRotateY = (centerX - x) / 12
    setRotateX(newRotateX)
    setRotateY(newRotateY)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`card-3d ${glowEffect ? 'iridescent-glow' : ''} ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
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
      {children}
    </motion.div>
  )
}

export { Interactive3DCard }