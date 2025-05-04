"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Backend Developer & Cloud Computing Specialist"

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText, fullText])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-primary">Andi Muhammad Alief Fauzan</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-6 h-8">
            {typedText}
            <span className="animate-blink">|</span>
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Passionate about building scalable solutions with Google Cloud Platform and Docker
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="#contact">
              <Button size="lg" className="rounded-full">
                Contact Me
              </Button>
            </Link>
            <Link href="#projects">
              <Button size="lg" variant="outline" className="rounded-full">
                View Projects
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              <Button size="lg" variant="secondary" className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </Link>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <Link href="mailto:afindo.mi01@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
            <Link href="tel:+628114157827" className="hover:text-primary transition-colors">
              <Phone className="h-6 w-6" />
              <span className="sr-only">Phone</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10"
        >
          <Link href="#about" className="animate-bounce block">
            <ArrowDown className="h-8 w-8 text-primary" />
            <span className="sr-only">Scroll Down</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
