"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ExternalLink, Github, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card"
import GlareHover from "@/components/ui/GlareHover"
import Link from "next/link"
import Image from "next/image"

// Updated projects array with image URLs and detailed information
const projects = [
  {
    title: "Bangkit Project - PeduliPasal",
    date: "December 2024",
    description:
      "A collaborative project developed during the Bangkit Academy program, focusing on legal information accessibility.",
    detailedDescription:
      "PeduliPasal is a legal learning platform designed to make legal information more accessible to the public. The project uses machine learning and natural language processing to interpret legal queries and provide relevant information from legal databases. As part of the Bangkit Academy 2024 program led by Google, Tokopedia, Gojek, & Traveloka, this project demonstrates the application of AI technologies to solve real-world problems.",
    challenges:
      "Processing and understanding legal language, building a comprehensive database of legal information, and creating user-friendly interfaces for complex legal queries.",
    outcomes:
      "Developed a functioning prototype that helps users access and understand legal information more easily. The platform has potential applications in legal education, public legal services, and legal research.",
    technologies: ["Cloud Run", "Firebase", "Vertex AI", "Docker", "GCP", "Flask", "Express.js", "Python", "TensorFlow", "Machine Learning", "NLP", "Jupyter Notebook", "Legal Databases"],
    links: { github: "https://github.com/aliefauzan/Bangkit-Project-PeduliPasal", demo: "#" }, // Example actual demo link
    image: "/peduliPasal.png", // Replace with actual image
    imageAlt: "PeduliPasal interface showing legal information search results",
  },
  {
    title: "KeretaXpress - Web Application",
    date: "June 2025",
    description:
      "A modern web application for train ticket booking and management, built with React and integrated with cloud services.",
    detailedDescription:
      "KeretaXpress Web is a comprehensive train ticket booking platform that provides users with an intuitive interface to search, book, and manage train tickets. The application features real-time train schedules, seat selection, payment integration, and user account management. Built with modern web technologies and deployed on Google Cloud Run for scalability and reliability.",
    challenges:
      "Creating a responsive and user-friendly interface for complex booking flows, implementing real-time data updates for train schedules and availability, and optimizing performance for fast loading times across different devices.",
    outcomes:
      "Successfully deployed a fully functional web application that streamlines the train booking process. The platform provides users with a seamless booking experience and demonstrates proficiency in full-stack web development and cloud deployment.",    
      technologies: ["Cloud Run", "Supabase", "Docker", "Cloud Build", "Laravel", "REST API", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    links: { github: "https://github.com/aliefauzan/KeretaXpress/tree/main/web_version", demo: "https://keretaxpress-frontend-404674793847.asia-southeast2.run.app/" },
    image: "/keretaxpress-web.png",
    imageAlt: "KeretaXpress web application showing train booking interface with purple gradient background, statistics cards, and booking form",
  },
  {
    title: "KeretaXpress - Mobile Application",
    date: "May 2025",
    description:
      "A Flutter-based mobile application for train ticket booking, providing native mobile experience for Android and iOS.",
    detailedDescription:
      "This mobile application was developed as the final project for the Advanced Application Programming course. Built with Flutter/Dart, it demonstrates implementation of modern mobile development practices including state management, API integration, and responsive UI design. The app provides a native mobile experience for train ticket booking with offline capabilities and push notifications.",
    challenges:
      "Implementing complex state management across multiple screens, integrating with backend services, ensuring a consistent user experience across different device sizes and platforms, and optimizing for mobile-specific features like offline functionality.",
    outcomes:
      "Successfully delivered a fully functional mobile application that showcases advanced programming concepts and provides a practical solution for mobile train booking. The app demonstrates expertise in cross-platform mobile development.",
    technologies: ["Cloud Run", "Supabase", "Docker", "Cloud Build", "Laravel", "REST API", "Flutter", "Dart", "State Management", "Mobile Development"],
    links: { github: "https://github.com/aliefauzan/KeretaXpress", demo: "#" },
    image: "/keretaxpress-mobile.png",
    imageAlt: "KeretaXpress mobile application interface showing the main screen",
  },
  {
    title: "Youtube Summarizer and QnA",
    date: "May 2025",
    description:
      "A TypeScript application that summarizes YouTube videos and provides a question and answer interface for video content.",
    detailedDescription:
      "This application allows users to input YouTube video URLs and receive concise summaries of the video content. It also features a Q&A component where users can ask specific questions about the video content. The app uses advanced natural language processing to analyze video transcripts and generate accurate summaries and answers.",
    challenges:
      "Extracting and processing YouTube video transcripts efficiently, implementing NLP algorithms for accurate summarization, and creating a responsive user interface for a seamless experience.",
    outcomes:
      "Created a practical tool that helps users quickly understand YouTube video content without watching the entire video, saving time and improving information accessibility.",
    technologies: ["Vercel", "YouTube API", "NLP", "TypeScript", "Next.js", "React", "Tailwind CSS", "Shadcn UI"],
    links: { github: "https://github.com/aliefauzan/Youtube-Summarizer-and-QnA", demo: "https://v0-youtube-video-summarizer-lovat.vercel.app/" },
    image: "/ytSum.png",
    imageAlt: "Youtube Summarizer and QnA interface showing a video summary and Q&A section",
  },
  {
    title: "Temperature and Humidity Sensor",
    date: "February 2025",
    description:
      "An IoT project using C++ to monitor temperature and humidity with ESP8266 and DHT22 sensors.",
    detailedDescription:
      "This IoT project implements a monitoring system for tracking temperature and humidity using ESP8266 microcontrollers and DHT22 sensors. The system collects environmental data and transmits it to a central server for storage and analysis. The solution is designed for applications requiring environmental monitoring such as smart homes, greenhouses, or laboratory settings.",
    challenges:
      "Ensuring reliable sensor readings, optimizing power consumption for battery-operated deployments, and implementing robust wireless communication protocols for data transmission.",
    outcomes:
      "Created a functional IoT monitoring system capable of long-term environmental data collection with minimal maintenance requirements. The system provides accurate readings and can be easily expanded with additional sensors.",
    technologies: ["Cloud Run", "Go", "ESP8266", "DHT22", "IoT", "Arduino", "Embedded Systems", "PlatformIO"],
    links: { github: "https://github.com/aliefauzan/temperature-and-humidity-sensor", demo: "#" },
    image: "/iot.png", 
    imageAlt: "Temperature and humidity sensor setup showing hardware connections and data readout",
  },
  {
    title: "Machine Learning with Google Cloud",
    date: "December 2024",
    description: 
      "A submission project demonstrating machine learning implementation and deployment using Google Cloud services.",
    detailedDescription:
      "This project showcases the implementation of machine learning models using Google Cloud services. It includes model training, evaluation, and deployment to create practical AI-powered applications. The project demonstrates proficiency in utilizing Google Cloud's machine learning infrastructure for scalable and reliable AI solutions.",
    challenges:
      "Optimizing machine learning models for cloud deployment, managing compute resources efficiently, and implementing secure API endpoints for model inference.",
    outcomes:
      "Successfully deployed machine learning models to Google Cloud, providing accessible AI capabilities through well-designed APIs. The project demonstrates practical implementation of cloud-based machine learning workflows.",
    technologies: ["Google Cloud", "Vertex AI", "Cloud Functions", "TensorFlow", "Machine Learning", "API Development", "JavaScript"],
    links: { github: "https://github.com/aliefauzan/Submission-MachineLearning-GoogleCloud", demo: "#" },
    image: "/placeholder.svg?height=400&width=600", // Replace with actual image
    imageAlt: "Machine learning model architecture diagram showing cloud deployment",
  },
  {
    title: "Backend with Google Cloud",
    date: "November 2024",
    description: 
      "A backend application built with JavaScript and deployed on Google Cloud, showcasing cloud-native development practices.",
    detailedDescription:
      "This project demonstrates the implementation of a backend application using Google Cloud services. It includes RESTful API development, database integration, authentication, and deployment to cloud infrastructure. The application follows modern cloud-native development practices and showcases the effective use of Google Cloud services for scalable backend solutions.",
    challenges:
      "Designing efficient database schemas, implementing secure authentication mechanisms, and optimizing application performance in a cloud environment.",
    outcomes:
      "Created a fully functional backend application that demonstrates proficiency in cloud-native development. The solution provides reliable API endpoints and efficiently manages data persistence and retrieval operations.",
    technologies: ["Google Cloud", "Cloud Run", "NoSQL", "Node.js", "Express", "RESTful API", "Authentication", "JavaScript"],
    links: { github: "https://github.com/aliefauzan/Submission-Backend-Dengan-GoogleCloud", demo: "#" },
    image: "/placeholder.svg?height=400&width=600", // Replace with actual image
    imageAlt: "Backend architecture diagram showing API endpoints and cloud services",
  },
]

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 6 
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
    <section id="projects" className="py-20 bg-gradient-to-r from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="relative inline-block">
              My <span className="rainbow-text">Projects</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            A collection of my work, showcasing a variety of skills and technologies I've utilized in different contexts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayedProjects.map((project, index) => {
              const isDemoAvailable = project.links.demo && project.links.demo !== "#";
              return (                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlareHover
                    glareColor="hsl(var(--primary))"
                    glareOpacity={0.2}
                    glareAngle={-30}
                    glareSize={200}
                    transitionDuration={800}
                    className="h-full"
                  >
                    <Interactive3DCard
                      className="h-full"
                    >
                      <div className="bg-card rounded-lg overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl hover:border-primary/50 border border-transparent transition-all duration-300">
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-1 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.date}</p>
                        <p className="text-sm mb-4 line-clamp-2 h-10">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs cursor-pointer">
                                    +{project.technologies.length - 4}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-[200px] break-words">
                                    {project.technologies.slice(4).join(", ")}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex gap-2">                            <Button variant="outline" size="sm" asChild>
                              <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <span className="flex items-center">
                                  <Github className="mr-2 h-4 w-4" />
                                  View Code
                                </span>
                              </Link>
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Info className="mr-2 h-4 w-4" />
                                  Info
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto p-6">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl sm:text-3xl">{project.title}</DialogTitle>
                                  <DialogDescription className="text-sm text-muted-foreground pt-1">
                                    {project.date}
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="mt-4 space-y-6">
                                  <div className="relative h-52 sm:h-60 md:h-72 w-full overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                      src={project.image || "/placeholder.svg"}
                                      alt={project.imageAlt}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <hr className="border-border/30" />
                                  <div>
                                    <h4 className="text-xl font-semibold mb-2 text-primary">Overview</h4>
                                    <p className="text-sm text-foreground/90">{project.detailedDescription}</p>
                                  </div>
                                  <hr className="border-border/30" />
                                  <div>
                                    <h4 className="text-xl font-semibold mb-2 text-primary">Challenges</h4>
                                    <p className="text-sm text-foreground/90">{project.challenges}</p>
                                  </div>
                                  <hr className="border-border/30" />
                                  <div>
                                    <h4 className="text-xl font-semibold mb-2 text-primary">Outcomes</h4>
                                    <p className="text-sm text-foreground/90">{project.outcomes}</p>
                                  </div>
                                  <hr className="border-border/30" />
                                  <div>
                                    <h4 className="text-xl font-semibold mb-2 text-primary">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {project.technologies.map((tech, i) => (
                                        <Badge key={i} variant="secondary">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-border/30">                                    <Button variant="outline" className="w-full sm:w-auto" asChild>
                                      <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                                        <span className="flex items-center">
                                          <Github className="mr-2 h-4 w-4" />
                                          View Code
                                        </span>
                                      </Link>
                                    </Button>                                    <Button
                                      className={`w-full sm:w-auto bg-purple-600 hover:bg-purple-700 ${!isDemoAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                                      asChild={!!isDemoAvailable} // Ensured boolean value
                                      disabled={!isDemoAvailable}
                                      onClick={(e) => !isDemoAvailable && e.preventDefault()}
                                    >
                                      {isDemoAvailable ? (
                                        <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                          <span className="flex items-center">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live Demo
                                          </span>
                                        </Link>
                                      ) : (
                                        <>
                                          <ExternalLink className="mr-2 h-4 w-4" />
                                          Live Demo
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <TooltipProvider>
                            <Tooltip open={!isDemoAvailable ? undefined : false}>
                              <TooltipTrigger asChild>
                                <span tabIndex={!isDemoAvailable ? 0 : -1}>
                                  <Button
                                    size="sm"
                                    className={`bg-purple-600 hover:bg-purple-700 ${!isDemoAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                                    asChild={!!isDemoAvailable} // Ensured boolean value
                                    disabled={!isDemoAvailable}
                                    onClick={(e) => !isDemoAvailable && e.preventDefault()}
                                  >
                                    {isDemoAvailable ? (
                                      <Link href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Demo
                                      </Link>
                                    ) : (
                                      <span className="flex items-center">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Demo
                                      </span>
                                    )}
                                  </Button>
                                </span>
                              </TooltipTrigger>
                              {!isDemoAvailable && (
                                <TooltipContent>
                                  <p>Demo not available</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>                        </div>
                      </div>
                    </div>
                  </Interactive3DCard>
                  </GlareHover>
                </motion.div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12"> {/* Increased mt */}
              <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0}> {/* Corrected disabled logic */}
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages - 1}> {/* Corrected disabled logic */}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}