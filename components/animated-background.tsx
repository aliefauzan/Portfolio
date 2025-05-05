"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      // Increase particle count for more visual elements
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.06), 120)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5, // Slightly larger particles
          speedX: (Math.random() - 0.5) * 0.3, // Faster movement
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1, // More varied opacity
        })
      }
    }

    // Draw shining light effect
    const drawShiningLight = () => {
      const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")

      // Center coordinates for the main glow
      const centerX = canvas.width * 0.5
      const centerY = canvas.height * 0.4 // Positioned slightly higher to match the images
      const radius = Math.max(canvas.width, canvas.height) * 0.7

      // Pulsating effect
      const pulseIntensity = 0.03 * Math.sin(time * 0.001) + 0.97

      if (isDark) {
        // Dark mode shining effect - deep blue background
        // Fill with deep blue background
        ctx.fillStyle = "#050814"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Main glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * pulseIntensity)

        gradient.addColorStop(0, "rgba(65, 105, 225, 0.12)") // Royal blue with low opacity
        gradient.addColorStop(0.3, "rgba(65, 105, 225, 0.08)")
        gradient.addColorStop(0.7, "rgba(65, 105, 225, 0.04)")
        gradient.addColorStop(1, "rgba(10, 15, 30, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add a second smaller glow for more depth
        const secondaryGradient = ctx.createRadialGradient(
          centerX + Math.sin(time * 0.0003) * 50,
          centerY + Math.cos(time * 0.0004) * 30,
          0,
          centerX + Math.sin(time * 0.0003) * 50,
          centerY + Math.cos(time * 0.0004) * 30,
          radius * 0.4,
        )

        secondaryGradient.addColorStop(0, "rgba(100, 149, 237, 0.06)") // Cornflower blue
        secondaryGradient.addColorStop(0.5, "rgba(100, 149, 237, 0.03)")
        secondaryGradient.addColorStop(1, "rgba(10, 15, 30, 0)")

        ctx.fillStyle = secondaryGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // Light mode shining effect - white background
        // Fill with white background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Main glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * pulseIntensity)

        // More vibrant blue colors for light mode
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.18)") // Brighter blue with higher opacity
        gradient.addColorStop(0.3, "rgba(79, 140, 255, 0.12)")
        gradient.addColorStop(0.7, "rgba(99, 150, 255, 0.06)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add a second smaller glow for more depth in light mode
        const secondaryGradient = ctx.createRadialGradient(
          centerX + Math.sin(time * 0.0003) * 50,
          centerY + Math.cos(time * 0.0004) * 30,
          0,
          centerX + Math.sin(time * 0.0003) * 50,
          centerY + Math.cos(time * 0.0004) * 30,
          radius * 0.4,
        )

        secondaryGradient.addColorStop(0, "rgba(147, 197, 253, 0.12)") // Brighter lighter blue
        secondaryGradient.addColorStop(0.5, "rgba(147, 197, 253, 0.06)")
        secondaryGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = secondaryGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add a third accent glow with a hint of purple for more color variety
        const accentGradient = ctx.createRadialGradient(
          centerX - 100 + Math.sin(time * 0.0005) * 30,
          centerY + 100 + Math.cos(time * 0.0006) * 20,
          0,
          centerX - 100 + Math.sin(time * 0.0005) * 30,
          centerY + 100 + Math.cos(time * 0.0006) * 20,
          radius * 0.3,
        )

        accentGradient.addColorStop(0, "rgba(139, 92, 246, 0.08)") // Purple accent
        accentGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.04)")
        accentGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = accentGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Animation loop
    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background with shining light effect
      drawShiningLight()

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        let particleColor
        if (theme === "dark") {
          particleColor = `rgba(255, 255, 255, ${particle.opacity * 0.4})`
        } else {
          // Use a mix of blue and purple particles in light mode
          const isBlue = index % 3 !== 0 // 2/3 of particles are blue, 1/3 are purple
          if (isBlue) {
            particleColor = `rgba(59, 130, 246, ${particle.opacity * 0.35})`
          } else {
            particleColor = `rgba(139, 92, 246, ${particle.opacity * 0.3})`
          }
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Connect nearby particles with lines
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Increased connection distance
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)

            if (theme === "dark") {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - distance / 100)})`
            } else {
              // Gradient lines in light mode
              const isBlue = (index + j) % 3 !== 0
              if (isBlue) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - distance / 100)})`
              } else {
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.07 * (1 - distance / 100)})`
              }
            }
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, systemTheme])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}
