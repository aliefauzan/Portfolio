"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useState } from "react"

const certificates = [
  {
    title: "Applied Machine Learning for Cloud Engineer",
    date: "December 2024",
    description:
      "A course designed for students interested in applying machine learning using cloud computing, particularly Google Cloud.",
    link: "#",
  },
  {
    title: "Become a Google Cloud Engineer",
    date: "November 2024",
    description:
      "A course aimed at teaching cloud computing with a focus on Google Cloud. Participants learn to master Google Cloud services.",
    link: "#",
  },
  {
    title: "Learn to Build Back-End Applications with Google Cloud",
    date: "November 2024",
    description:
      "This class is designed for individuals aiming to become Back-End Developers using Google Cloud's global competency standards.",
    link: "#",
  },
  {
    title: "Learn JavaScript Programming Basics",
    date: "November 2024",
    description:
      "A comprehensive course for aspiring Web or Back-End Developers using Node.js technology using industry competency standards.",
    link: "#",
  },
  {
    title: "Learn AI Basics",
    date: "November 2024",
    description: "This beginner-friendly course introduces foundational AI concepts and their applications.",
    link: "#",
  },
  {
    title: "Learn Web Programming Basics",
    date: "September 2024",
    description:
      "This class thoroughly discusses the basics of HTML and CSS as the three foundations of website creation.",
    link: "#",
  },
  {
    title: "Learn Git Basics with GitHub",
    date: "September 2024",
    description:
      "A class for developers to learn code and data management using Git and GitHub, aligned with industry standards.",
    link: "#",
  },
  {
    title: "Introduction to Programming Logic",
    date: "September 2024",
    description: "A beginner-oriented course covering programming logic fundamentals.",
    link: "#",
  },
  {
    title: "Getting Started with Programming Basics",
    date: "September 2024",
    description: "This class introduces programming fundamentals for aspiring software developers.",
    link: "#",
  },
  {
    title: "Cloud Practitioner Essentials",
    date: "April 2024",
    description: "This course is designed for beginners who want to start their career in cloud computing.",
    link: "#",
  },
]

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = 340 // Approximate width of a card + margin

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-primary">Certificates</span> & Achievements
          </h2>

          <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {certificates.map((cert, index) => (
                <div key={index} className="flex-shrink-0 w-80 mx-4 first:ml-0 last:mr-0">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <Award className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                        <CardDescription>{cert.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between h-32">
                      <p className="text-muted-foreground text-sm line-clamp-3">{cert.description}</p>
                      <Button variant="ghost" size="sm" className="self-end mt-2" asChild>
                        <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Scroll indicators that appear on hover */}
            {isHovered && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md rounded-full p-2 backdrop-blur-sm transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md rounded-full p-2 backdrop-blur-sm transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Gradient overlays to indicate scrolling */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>

          {/* Scroll indicator text */}
          <div className="text-center mt-4 text-muted-foreground text-sm">
            <span>Hover and scroll horizontally to see more certificates</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
