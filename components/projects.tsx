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
import Link from "next/link"
import Image from "next/image"

// Updated projects array with image URLs and detailed information
const projects = [
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
    technologies: ["TypeScript", "Next.js", "Natural Language Processing", "YouTube API", "React", "Tailwind CSS"],
    links: { github: "https://github.com/aliefauzan/Youtube-Summarizer-and-QnA", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Youtube Summarizer and QnA interface showing a video summary and Q&A section",
  },
  {
    title: "TubesABP - Mobile Application",
    date: "May 2025",
    description:
      "A Dart-based mobile application developed as a course project for Advanced Application Programming.",
    detailedDescription:
      "This mobile application was developed as the final project for the Advanced Application Programming course. Built with Flutter/Dart, it demonstrates implementation of modern mobile development practices including state management, API integration, and responsive UI design.",
    challenges:
      "Implementing complex state management across multiple screens, integrating with backend services, and ensuring a consistent user experience across different device sizes and platforms.",
    outcomes:
      "Successfully delivered a fully functional mobile application that showcases advanced programming concepts and provides a practical solution to real-world problems.",
    technologies: ["Dart", "Flutter", "Firebase", "REST API", "State Management", "Mobile Development"],
    links: { github: "https://github.com/aliefauzan/TubesABP", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "TubesABP mobile application interface showing the main screen",
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
    technologies: ["C++", "ESP8266", "DHT22", "IoT", "MQTT", "Arduino", "Embedded Systems"],
    links: { github: "https://github.com/aliefauzan/temperature-and-humidity-sensor", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Temperature and humidity sensor setup showing hardware connections and data readout",
  },
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
    technologies: ["Jupyter Notebook", "Machine Learning", "NLP", "Python", "TensorFlow", "Legal Databases"],
    links: { github: "https://github.com/aliefauzan/Bangkit-Project-PeduliPasal", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "PeduliPasal interface showing legal information search results",
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
    technologies: ["JavaScript", "Google Cloud", "Machine Learning", "TensorFlow", "API Development", "Cloud Functions"],
    links: { github: "https://github.com/aliefauzan/Submission-MachineLearning-GoogleCloud", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
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
    technologies: ["JavaScript", "Node.js", "Express", "Google Cloud", "RESTful API", "NoSQL", "Authentication"],
    links: { github: "https://github.com/aliefauzan/Submission-Backend-Dengan-GoogleCloud", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Backend architecture diagram showing API endpoints and cloud services",
  },
  {
    title: "Mini Games Collection",
    date: "May 2024",
    description:
      "A collection of mini-games implemented in C++, showcasing fundamental programming concepts and game development.",
    detailedDescription:
      "This project includes multiple mini-games implemented in C++, such as Tic-Tac-Toe, Number Guessing, and Simple RPG battles. The games demonstrate core programming concepts including conditional logic, loops, functions, and basic data structures. The collection serves as both an educational project for learning C++ and a showcase of game development fundamentals.",
    challenges:
      "Implementing engaging gameplay mechanics, designing intuitive user interfaces in a console environment, and creating efficient algorithms for game logic.",
    outcomes:
      "Developed a collection of functional games that demonstrate proficiency in C++ programming and fundamental game development concepts. The project serves as both entertainment and an educational resource.",
    technologies: ["C++", "Game Development", "Console Applications", "Algorithms", "Data Structures"],
    links: { github: "https://github.com/aliefauzan/Mini-Games", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "Console interface showing a mini-game in action",
  },
  {
    title: "To-Do List Application",
    date: "April 2024",
    description:
      "A C++ console application for managing tasks and to-do items with basic CRUD operations.",
    detailedDescription:
      "This To-Do List application allows users to create, read, update, and delete tasks through a command-line interface. Built in C++, it demonstrates implementation of fundamental data structures and file I/O operations. The application includes features such as task prioritization, due dates, and category management.",
    challenges:
      "Designing an intuitive command-line interface, implementing efficient data storage and retrieval, and ensuring data persistence between application sessions.",
    outcomes:
      "Created a practical task management tool that helps users organize their activities. The application demonstrates proper implementation of CRUD operations and effective use of file-based data storage.",
    technologies: ["C++", "Data Structures", "File I/O", "Console Application", "CRUD Operations"],
    links: { github: "https://github.com/aliefauzan/To-Do-List", demo: "#" },
    image: "/placeholder.svg?height=400&width=600",
    imageAlt: "To-Do List application showing task management interface",
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
    <section id="projects" className="py-20 bg-gradient-to-r from-background to-muted/20">
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
                className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="relative h-48 overflow-hidden bg-muted border-t-4 border-t-primary/10 group-hover:border-t-primary/80 transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 transition-opacity duration-300 pointer-events-none z-10"></div>
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
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Info className="mr-2 h-4 w-4" />
                            Info
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                              {project.date}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="mt-4 space-y-4">
                            <div className="relative h-60 w-full overflow-hidden rounded-lg">
                              <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.imageAlt}
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Overview</h4>
                              <p className="text-sm">{project.detailedDescription}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                              <p className="text-sm">{project.challenges}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Outcomes</h4>
                              <p className="text-sm">{project.outcomes}</p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between pt-4 border-t">
                              <Button variant="outline" asChild>
                                <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" />
                                  View Code
                                </Link>
                              </Button>
                              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                                <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Live Demo
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

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
