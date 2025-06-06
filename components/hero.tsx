"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { ArrowDown, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button" // Make sure this path is correct for your project
import Link from "next/link"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const fullTextSubheading = "Backend Developer & Cloud Computing Specialist"
  
  const nameLines = ["Hi, I'm Andi Muhammad", "Alief Fauzan"]; 

  useEffect(() => {
    if (typedText.length < fullTextSubheading.length) {
      setTypingComplete(false)
      const timeout = setTimeout(() => {
        setTypedText(fullTextSubheading.slice(0, typedText.length + 1))
      }, 100) // Typing speed

      return () => clearTimeout(timeout)
    } else {
      setTypingComplete(true) // Typing is complete
    }
  }, [typedText, fullTextSubheading])

  // Variants for word-by-word animation
  const wordContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, 
        delayChildren: 0.5,   
      },
    },
  }

  const wordChildVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            <motion.span 
              className="inline-block" 
              variants={wordContainerVariants}
              initial="hidden"
              animate="visible"
              aria-label={nameLines.join(" ")} 
            >
              {nameLines.map((line, lineIndex) => (
                <span key={lineIndex} className="block"> 
                  {line.split(" ").map((word, wordIndex, arr) => {
                    let textColorClass = "";
                    if (lineIndex === 0) { 
                      if (wordIndex < 2) { 
                        textColorClass = "text-foreground"; // Use theme-aware foreground color instead of text-white
                      } else {
                        textColorClass = "text-primary"; 
                      }
                    } else { 
                      textColorClass = "text-primary";
                    }

                    return (
                      <motion.span
                        key={`${lineIndex}-${wordIndex}`}
                        className={`inline-block ${textColorClass} ${wordIndex < arr.length -1 ? "mr-[0.2em]" : ""}`}
                        variants={wordChildVariants}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </motion.span>
          </h1>

          <div className="relative inline-block mb-6"> 
            <h2 className="text-xl md:text-2xl h-8"> 
              {typedText}
              {!typingComplete && <span className="animate-blink">|</span>}
            </h2>
            {typingComplete && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" // Gradient underline
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "circOut", delay: 0.2 }}
              />
            )}
          </div>

          <p className="text-muted-foreground mb-8 text-lg">
            Passionate about building scalable solutions with Google Cloud Platform and Docker
          </p>

          {/* Buttons section with "View Projects" explicitly styled */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="#contact">
              {/* Primary button - assuming default variant is your main filled style */}
              <Button size="lg" className="rounded-full">
                Contact Me
              </Button>
            </Link>
            <Link href="#projects">
              <Button 
                size="lg" 
                variant="outline" 
                // Added classes to ensure primary color for text/border and a subtle hover
                className="rounded-full text-primary border-primary hover:bg-primary/10" 
              >
                View Projects
              </Button>
            </Link>
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              {/* Secondary button - style depends on your theme's secondary variant */}
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
              href="https://www.linkedin.com/in/alief-fauzan1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/aliefauzan"
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