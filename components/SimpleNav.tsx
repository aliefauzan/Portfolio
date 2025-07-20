"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SimpleNavItem {
  label: string;
  href: string;
}

interface SimpleNavProps {
  items: SimpleNavItem[];
  onItemClick?: () => void;
  className?: string;
}

export default function SimpleNav({ items, onItemClick, className }: SimpleNavProps) {
  // Get the current hash from the URL
  const [currentHash, setCurrentHash] = useState<string>(typeof window !== "undefined" ? window.location.hash || "#home" : "#home")

  useEffect(() => {
    function updateHash() {
      setCurrentHash(window.location.hash || "#home")
    }
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [])

  const handleClick = (href: string) => {
    if (typeof window !== "undefined") {
      window.location.hash = href
    }
    onItemClick?.()
  }

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {items.map((item, index) => {
        const isActive = item.href === currentHash
        return (
          <Link
            key={index}
            href={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              "text-lg p-3 rounded-lg transition-all duration-200 font-normal",
              "hover:bg-primary/10 hover:text-primary",
              isActive
                ? "bg-primary text-primary-foreground shadow-md font-bold !text-white"
                : "text-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
