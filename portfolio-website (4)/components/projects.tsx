"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Updated projects array with image URLs
const projects = [
  {
    title: "IoT-Based Autoclave Monitoring System",
    date: "January 2025 – Present",
    description: [
      "Developed an IoT-based monitoring system for tracking temperature and humidity in autoclave machines using ESP8266 and DHT22.",
      "Implemented a Golang backend with MySQL database, deployed on Google Cloud Run and Cloud SQL.",
      "Designed a real-time dashboard using JavaScript, Chart.js, JustGage.",
      "Integrated Docker for containerized deployment and Google Cloud Logging for system monitoring.",
    ],
    technologies: ["Golang", "MySQL", "Google Cloud Run", "Cloud SQL", "IoT", "Docker", "JavaScript"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "IoT-Based Autoclave Monitoring System dashboard showing temperature and humidity readings",
  },
  {
    title: "PeduliPasal - Legal Learning Platform",
    date: "September 2024 – Present",
    description: [
      "Developed a chatbot application to provide quick legal references using Google Cloud Run, Firestore, and Vertex AI.",
      "Deployed the application using Docker to ensure scalability and maintainability.",
      "Served as Team Leader, managing project workflows, repository maintenance, and ensuring API stability.",
    ],
    technologies: ["Google Cloud Run", "Firestore", "Vertex AI", "Docker", "Team Leadership"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "PeduliPasal legal chatbot interface showing a conversation about legal information",
  },
  {
    title: "Building Machine Learning Applications with Google Cloud",
    date: "December 2024",
    description: [
      "Developed machine learning applications by creating APIs and deploying backend applications using Compute Engine.",
      "Deployed frontend applications using App Engine and utilized Cloud Storage for storing machine learning models.",
      "Used Firestore as a database to store prediction results and managed web servers with static external IP addresses.",
    ],
    technologies: ["Google Compute Engine", "App Engine", "Cloud Storage", "Firestore", "Machine Learning"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Machine learning application architecture diagram showing Google Cloud components",
  },
  {
    title: "Singgung – Simpan Gudang",
    date: "December 2024",
    description: [
      "Implemented a warehouse storage tracking application using App Engine for backend services.",
      "Utilized Cloud SQL for database management, ensuring reliability and scalability.",
      "Developed the backend using Java (JDBC) for efficient data handling and integration.",
    ],
    technologies: ["App Engine", "Cloud SQL", "Java", "JDBC"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Singgung warehouse management system showing inventory tracking interface",
  },
  {
    title: "Money Tracker App",
    date: "November 2024",
    description: [
      "Deployed a financial tracking application using App Engine and implemented lifecycle management rules on Google Cloud Storage to automate object management.",
      "Used Cloud SQL instances for database management to ensure reliability and scalability.",
    ],
    technologies: ["App Engine", "Cloud Storage", "Cloud SQL"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Money Tracker App showing financial transactions and budget charts",
  },
  {
    title: "Bookshelf API",
    date: "November 2024",
    description: ["Designed and deployed a RESTful API backend for a notes application with full CRUD functionality."],
    technologies: ["RESTful API", "CRUD", "Backend Development"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "API documentation interface showing endpoints for the Bookshelf API",
  },
  {
    title: "Healthy Life Website",
    date: "September 2024",
    description: [
      "Developed website pages using semantic HTML and modern layout techniques for enhanced user experience.",
    ],
    technologies: ["HTML", "CSS", "Semantic Web"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Healthy Life Website homepage showing fitness and nutrition content",
  },
  {
    title: "OPER.INC",
    date: "November 2023 – January 2024",
    description: [
      "Led the development of OPER (Online PERpus), an innovative online library management system aimed at modernizing the library experience.",
      "Demonstrated strong leadership skills and project management abilities, resulting in the successful delivery of a user-centric solution that makes libraries more accessible and convenient in today's digital era.",
    ],
    technologies: ["Library Management", "Project Management", "Leadership"],
    links: { github: "#", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "OPER.INC library management system showing book catalog and user interface",
  },
]

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 3
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

          <div className="grid gap-8 mb-8">
            {displayedProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-full min-h-[250px] overflow-hidden bg-muted">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <CardHeader className="p-0 pb-4">
                        <CardTitle className="text-xl hidden md:block">{project.title}</CardTitle>
                        <CardDescription className="hidden md:block">{project.date}</CardDescription>
                      </CardHeader>

                      <CardContent className="p-0">
                        <ul className="list-disc pl-5 space-y-2 mb-4 text-sm">
                          {project.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>

                    <CardFooter className="p-0 mt-auto flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4">
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
        </motion.div>
      </div>
    </section>
  )
}
