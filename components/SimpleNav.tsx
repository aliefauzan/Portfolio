"use client"

import { useState } from "react"
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
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (index: number) => {
    setActiveIndex(index)
    onItemClick?.()
  }

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={() => handleClick(index)}
          className={cn(
            "text-lg font-medium p-3 rounded-lg transition-all duration-200",
            "hover:bg-primary/10 hover:text-primary",
            activeIndex === index 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
