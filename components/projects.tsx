"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Updated projects array with image URLs
const projects = [
  {
    title: "IoT-Based Autoclave Monitoring System",
    date: "January 2025 – Present",
    description:
      "Developed an IoT-based monitoring system for tracking temperature and humidity in autoclave machines using ESP8266 and DHT22.",
    technologies: ["Golang", "MySQL", "Google Cloud Run", "Cloud SQL", "IoT", "Docker"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "IoT-Based Autoclave Monitoring System dashboard showing temperature and humidity readings",
  },
  {
    title: "PeduliPasal - Legal Learning Platform",
    date: "September 2024 – Present",
    description:
      "Developed a chatbot application to provide quick legal references using Google Cloud Run, Firestore, and Vertex AI.",
    technologies: ["Google Cloud Run", "Firestore", "Vertex AI", "Docker"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "PeduliPasal legal chatbot interface showing a conversation about legal information",
  },
  {
    title: "Building Machine Learning Applications",
    date: "December 2024",
    description:
      "Developed machine learning applications by creating APIs and deploying backend applications using Compute Engine.",
    technologies: ["Google Compute Engine", "App Engine", "Cloud Storage", "Firestore"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Machine learning application architecture diagram showing Google Cloud components",
  },
  {
    title: "Singgung – Simpan Gudang",
    date: "December 2024",
    description: "Implemented a warehouse storage tracking application using App Engine for backend services.",
    technologies: ["App Engine", "Cloud SQL", "Java", "JDBC"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Singgung warehouse management system showing inventory tracking interface",
  },
  {
    title: "Money Tracker App",
    date: "November 2024",
    description:
      "Deployed a financial tracking application using App Engine and implemented lifecycle management rules on Google Cloud Storage.",
    technologies: ["App Engine", "Cloud Storage", "Cloud SQL"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Money Tracker App showing financial transactions and budget charts",
  },
  {
    title: "Bookshelf API",
    date: "November 2024",
    description: "Designed and deployed a RESTful API backend for a notes application with full CRUD functionality.",
    technologies: ["RESTful API", "CRUD", "Backend Development"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "API documentation interface showing endpoints for the Bookshelf API",
  },
  {
    title: "Healthy Life Website",
    date: "September 2024",
    description:
      "Developed website pages using semantic HTML and modern layout techniques for enhanced user experience.",
    technologies: ["HTML", "CSS", "Semantic Web"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Healthy Life Website homepage showing fitness and nutrition content",
  },
  {
    title: "OPER.INC",
    date: "November 2023 – January 2024",
    description:
      "Led the development of OPER (Online PERpus), an innovative online library management system aimed at modernizing the library experience.",
    technologies: ["Library Management", "Project Management", "Leadership"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "OPER.INC library management system showing book catalog and user interface",
  },
]

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 6 // Show 6 projects per page (3x2 grid)
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const displayedProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-primary">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1 line-clamp-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.date}</p>
                  <p className="text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between mt-auto">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
                      <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevPage} disabled={totalPages <= 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button variant="outline" size="icon" onClick={nextPage} disabled={totalPages <= 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
