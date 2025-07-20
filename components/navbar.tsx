"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import GooeyNav from "./GooeyNav"
import SimpleNav from "./SimpleNav"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience & Education", href: "#experience-education" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
]

// Convert to GooeyNav format
const gooeyNavItems = navItems.map(item => ({
  label: item.name,
  href: item.href
}))

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, isMobile])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border/40",
        scrolled ? "shadow-lg bg-background/98" : "",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#home" className="text-xl font-bold">
          <span className="text-primary">Alief</span> Fauzan
        </Link>        {/* Desktop Navigation with Gooey Effect */}
        <div className="hidden md:flex items-center space-x-6">          <GooeyNav
            items={gooeyNavItems}
            particleCount={8}
            particleDistances={[60, 5]}
            particleR={50}
            animationTime={400}
            timeVariance={150}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            initialActiveIndex={0}
          />
          <div className="flex items-center space-x-4 ml-6">
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>      {/* Mobile Navigation Menu */}
      {isOpen && isMobile && (
        <>
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[99] p-4 flex flex-col border-t border-border/40 overflow-y-auto min-h-screen">
            <SimpleNav 
              items={gooeyNavItems}
              onItemClick={() => setIsOpen(false)}
              className="mb-6"
            />
            <div className="border-t border-border/40 pt-4">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center text-lg font-medium p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Download className="mr-3 h-5 w-5" />
                Download Resume
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
