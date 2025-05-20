"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Calendar, ChevronLeft, ChevronRight, ExternalLink, Filter, Info, MousePointer, School, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

const certificates = [
  {
    title: "Learning AI Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "November 26, 2024",
    description:
      "A course designed for beginners looking to start their career in the AI field.",
    detailedDescription:
      "This course is designed for beginners looking to start their career in the AI field. After completing the course, students are expected to be able to understand various basic concepts in AI along with their applications. The material covers AI fundamentals, data concepts for AI, machine learning, and deep learning.",
    courseMaterials: [
      "Introduction to Artificial Intelligence: Identifying basic AI concepts. (1 hour 30 minutes)",
      "Data for AI: Understanding basic data concepts and their use in AI development. (1 hour 25 minutes)",
      "Introduction to Machine Learning: Explaining basic concepts of Machine Learning as part of AI with application examples. (2 hours 30 minutes)",
      "Deep Learning for Everyone: Identifying important concepts in Deep Learning and implementing practical examples. (2 hours 25 minutes)"
    ],
    evaluation: ["Final course exam"],
    skills: ["AI Fundamentals", "Machine Learning Basics", "Deep Learning", "Data for AI", "AI Ethics", "Neural Networks"],
    level: "Beginner",
    duration: "10 Hours",
    certificateId: "1OP84ER61ZQK",
    validUntil: "November 26, 2027",
    link: "https://www.dicoding.com/certificates/1OP84ER61ZQK",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Becoming a Google Cloud Engineer",
    issuer: "Dicoding Indonesia",
    date: "December 21, 2024",
    description:
      "A course to learn cloud computing with a focus on Google Cloud infrastructure.",
    detailedDescription:
      "This course teaches cloud computing with a focus on Google Cloud infrastructure. Students will learn best practices for building, testing, and deploying applications on Google Cloud, as well as understanding the key services and features of the Google Cloud Platform.",
    courseMaterials: [
      "Introduction to Google Cloud Platform: Understanding Google Cloud components and infrastructure. (3 hours)",
      "Computing on Google Cloud Platform: Learning about Compute Engine, Cloud Run, and App Engine. (5 hours)",
      "Storage and Databases on Google Cloud: Cloud Storage, Cloud SQL, and Firestore. (4 hours)",
      "Networking on Google Cloud: Cloud VPC, Cloud CDN, and Cloud Armor. (3 hours)",
      "Security and Identity Management: IAM, Secret Manager, and Key Management Service. (3 hours)",
      "Monitoring and Logging: Cloud Monitoring, Cloud Logging, and Error Reporting. (2 hours)"
    ],
    skills: ["Google Cloud", "Cloud Architecture", "Compute Engine", "Cloud Storage", "Cloud SQL", "IAM", "Cloud Run"],
    level: "Intermediate to Advanced",
    duration: "20 Hours",
    certificateId: "GRX54NYE2P0M",
    validUntil: "December 21, 2027",
    link: "https://www.dicoding.com/certificates/GRX54NYE2P0M",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Building Back-End Applications with Google Cloud for Beginners",
    issuer: "Dicoding Indonesia",
    date: "November 11, 2024",
    description:
      "A course for individuals wanting to become Back-End Developers using Google Cloud.",
    detailedDescription:
      "This course is aimed at individuals who want to become Back-End Developers using Google Cloud's global competency standards. Students will learn to build RESTful APIs with Express.js and integrate them with Google Cloud services for back-end application deployment.",
    courseMaterials: [
      "Introduction to Back-End: Understanding the roles and responsibilities of a Back-End Developer. (2 hours)",
      "Node.js Fundamentals: Learning Node.js for Back-End development. (3 hours)",
      "Building Web Services with Node.js: Creating REST APIs with Express.js. (4 hours)",
      "Deployment to Google App Engine: The process of deploying applications to Google Cloud. (3 hours)",
      "Data Storage with Cloud SQL: Integrating databases with Back-End applications. (3 hours)"
    ],
    skills: ["Back-End Development", "Node.js", "Express.js", "RESTful API", "Google Cloud", "App Engine", "Cloud SQL"],
    level: "Beginner",
    duration: "15 Hours",
    certificateId: "JLX14KDGJX72",
    validUntil: "November 11, 2027",
    link: "https://www.dicoding.com/certificates/JLX14KDGJX72",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "JavaScript Programming Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "November 3, 2024",
    description:
      "A comprehensive course for Web or Back-End Developers using Node.js technology.",
    detailedDescription:
      "A comprehensive course for Web or Back-End Developers using Node.js technology. It covers fundamental JavaScript concepts such as syntax, data structures, functions, Object-Oriented Programming, and asynchronous programming.",
    courseMaterials: [
      "Introduction to JavaScript: History and evolution of JavaScript. (1 hour)",
      "JavaScript Fundamentals: Variables, data types, and operators. (3 hours)",
      "Data Structures: Arrays, Objects, Maps, and Sets. (3 hours)",
      "Functions and Object-Oriented Programming: OOP concepts in JavaScript. (4 hours)",
      "Asynchronous Programming: Callbacks, Promises, and Async/Await. (4 hours)",
      "Error Handling: Managing errors in JavaScript applications. (2 hours)"
    ],
    skills: ["JavaScript", "ES6+", "Asynchronous Programming", "OOP", "DOM Manipulation", "Error Handling"],
    level: "Beginner",
    duration: "17 Hours",
    certificateId: "0LZ0R86D3P65",
    validUntil: "November 3, 2027",
    link: "https://www.dicoding.com/certificates/0LZ0R86D3P65",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "DevOps Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "April 20, 2025",
    description:
      "A comprehensive introduction to DevOps practices, principles, and tools for modern software development.",
    detailedDescription:
      "This course covers core DevOps concepts, methodologies, and tools used in modern DevOps practices. Students will understand how to bridge the gap between development and operations, automate processes, and implement CI/CD pipelines.",
    courseMaterials: [
      "Introduction to DevOps: Philosophy, principles, and benefits of DevOps. (2 hours)",
      "Continuous Integration and Continuous Delivery: Concepts and implementation. (3 hours)",
      "Infrastructure as Code: Managing infrastructure using code. (3 hours)",
      "Containerization with Docker: Docker concepts and practices. (4 hours)",
      "Orchestration with Kubernetes: Managing containers at scale. (4 hours)",
      "Monitoring and Logging: Tools and best practices. (2 hours)"
    ],
    skills: ["DevOps", "CI/CD", "Docker", "Kubernetes", "Infrastructure as Code", "Git", "Monitoring"],
    level: "Intermediate",
    duration: "18 Hours",
    certificateId: "98XW5WQY9PM3",
    validUntil: "April 20, 2028",
    link: "https://www.dicoding.com/certificates/98XW5WQY9PM3",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Web Programming Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "September 23, 2024",
    description:
      "This course thoroughly covers HTML and CSS fundamentals as the three foundations of website creation.",
    detailedDescription:
      "This course thoroughly covers HTML and CSS fundamentals as the three foundations of website creation. These foundations are necessary for those who want to develop their website development skills to a more advanced level. Structured and verified by Dicoding's expert team, the presented material is structured and comprehensive.",
    courseMaterials: [
      "Introduction: Overview of websites, server and client, website anatomy, and tools needed for website page development. (40 minutes)",
      "HTML Basics: Learning the tools used to build website page structure. (1 hour 10 minutes)",
      "Advanced HTML: Deepening the application of HTML in building web page structure. (6 hours 45 minutes)",
      "CSS Basics: Learning tools used to beautify website appearance. (1 hour 50 minutes)",
      "Advanced CSS: Deepening the application of CSS in enhancing website appearance. (15 hours 20 minutes)",
      "Responsive Layout with Flexbox: Learning layouting techniques using Flexbox in building website content. (4 hours 5 minutes)",
      "Conclusion: Implementation of learned techniques in creating and improving a simple website project. (10 hours 15 minutes)"
    ],
    evaluation: ["Final Exam", "Submission: Final project creating a webpage using semantic HTML and layouting techniques"],
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Web Semantics", "Web Accessibility"],
    level: "Beginner",
    duration: "41 Hours",
    certificateId: "0LZ04ONNNP65",
    validUntil: "September 23, 2027",
    link: "https://www.dicoding.com/certificates/0LZ04ONNNP65",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Git and GitHub Basics",
    issuer: "Dicoding Indonesia",
    date: "September 16, 2024",
    description:
      "This course is aimed at developers who want to learn code or data management using Git with GitHub.",
    detailedDescription:
      "This course is aimed at developers who want to learn code or data management using Git with GitHub to collaborate with other developers according to industry standards. By the end of the course, students can manage their own data or code in a GitHub repository, and can collaborate with other developers on the same repository.",
    courseMaterials: [
      "Git and GitHub: Understanding what Git and GitHub are and their benefits in managing data or code. (1 Hour 45 Minutes)",
      "Git Basics: Understanding the basics of data or code management with Git, such as creating repositories, creating files, git commit, and git checkout. (2 Hours 5 Minutes)",
      "Learning Experience Case Study: Enhancing learning experience about Git basics through a case study. (1 Hour 20 Minutes)",
      "Git Branches: Understanding branching concepts in Git, learning about merging and resolving conflicts. (2 Hours 10 Minutes)",
      "Team Collaboration: Understanding how to collaborate with other teams on the same repository such as forking, squashing changes, and code reviews. (2 Hours 50 Minutes)",
      "Team Collaboration Case Study: Enhancing knowledge in team collaboration such as creating new repositories, copying repositories, and case studies of handling pull requests on an active GitHub repository. (1 hour 15 Minutes)",
      "GitHub as a Portfolio: Understanding the use of GitHub as a portfolio with exercises in creating readmes that can be used as a portfolio in a career. (1 Hour 20 Minutes)"
    ],
    evaluation: ["Final Course Exam"],
    skills: ["Git", "GitHub", "Version Control", "Branching", "Pull Requests", "Code Reviews", "Collaboration"],
    level: "Beginner",
    duration: "15 Hours",
    certificateId: "MRZMY5RONZYQ",
    validUntil: "September 16, 2027",
    link: "https://www.dicoding.com/certificates/MRZMY5RONZYQ",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Introduction to Programming Logic",
    issuer: "Dicoding Indonesia",
    date: "September 23, 2024",
    description: 
      "A fundamental course covering programming logic concepts and computational thinking.",
    detailedDescription:
      "A foundational course teaching programming logic and computational thinking as the basis before learning programming languages. Material includes algorithms, flowcharts, pseudocode, and programming logic fundamentals that can be applied across various languages.",
    courseMaterials: [
      "Introduction to Programming Logic: Basic concepts of logical thinking in programming. (2 hours)",
      "Computational Thinking: Problem-solving approach with computational thinking. (2 hours)",
      "Algorithms: Learning to create and analyze simple algorithms. (3 hours)",
      "Pseudocode: Writing algorithms in pseudocode form. (2 hours)",
      "Flowcharts: Creating flow diagrams for algorithm visualization. (2 hours)",
      "Basic Programming Structures: Introduction to sequence, selection, and repetition. (3 hours)"
    ],
    skills: ["Programming Logic", "Algorithms", "Pseudocode", "Flowcharts", "Problem Solving", "Computational Thinking"],
    level: "Beginner",
    duration: "14 Hours",
    certificateId: "53XEQK0V9XRN",
    validUntil: "September 23, 2027",
    link: "https://www.dicoding.com/certificates/53XEQK0V9XRN",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Getting Started with Programming to Become a Software Developer",
    issuer: "Dicoding Indonesia",
    date: "September 23, 2024",
    description: 
      "An introductory course to begin your journey as a software developer.",
    detailedDescription:
      "An introductory course providing understanding of programming basics and software development processes. Material covers introduction to programming languages, development tools, and development processes needed to become a software developer.",
    courseMaterials: [
      "Introduction to the Programming World: Understanding what programming is and its role in software development. (2 hours)",
      "Introduction to Programming Languages: Discussing various programming languages and their uses. (2 hours)",
      "Software Development Tools: IDEs, text editors, and other supporting tools. (2 hours)",
      "Software Development Life Cycle: Understanding the software development process comprehensively. (3 hours)",
      "Basic Programming Concepts: Variables, data types, and control structures. (3 hours)",
      "Introduction to Data Structures and Algorithms: Basic concepts of data structures and algorithms. (2 hours)"
    ],
    skills: ["Programming Basics", "Software Development", "Development Tools", "SDLC", "Problem Solving"],
    level: "Beginner",
    duration: "14 Hours",
    certificateId: "NVP74D16GPR0",
    validUntil: "September 23, 2027",
    link: "https://www.dicoding.com/certificates/NVP74D16GPR0",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Cloud Practitioner Essentials (AWS Cloud Fundamentals)",
    issuer: "Dicoding Indonesia",
    date: "January 7, 2025",
    description: 
      "An introductory course to learn the basic concepts of AWS cloud services.",
    detailedDescription:
      "This course is designed for beginners who want to start a career in cloud computing with a focus on AWS. Material covers basic cloud concepts, core AWS services, architecture, security, and best practices for using AWS.",
    courseMaterials: [
      "Introduction to Cloud Computing: Basic cloud concepts and benefits. (2 hours)",
      "Core AWS Services: EC2, S3, RDS, and other core services. (4 hours)",
      "AWS Architecture: Understanding AWS infrastructure and global architecture. (3 hours)",
      "Security and Identity: IAM, Security Groups, and security practices in AWS. (3 hours)",
      "Pricing and Support: AWS pricing models and support services. (2 hours)",
      "Best Practices: Designing cloud solutions that meet business needs. (3 hours)"
    ],
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "RDS", "IAM", "Cloud Architecture", "Security"],
    level: "Beginner",
    duration: "17 Hours",
    certificateId: "0LZ06QMGNZ65",
    validUntil: "January 7, 2028",
    link: "https://www.dicoding.com/certificates/0LZ06QMGNZ65",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Machine Learning Implementation with Google Cloud",
    issuer: "Dicoding Indonesia",
    date: "December 8, 2024",
    description: 
      "A comprehensive course to learn implementing machine learning models using Google Cloud.",
    detailedDescription:
      "This course is designed for learners who want to explore machine learning implementation using Google Cloud services. Students will learn how to train, evaluate, and deploy machine learning models with various GCP services such as Vertex AI, BigQuery ML, and AutoML.",
    courseMaterials: [
      "Introduction to Machine Learning on Google Cloud: Understanding the ML ecosystem on GCP. (2 hours)",
      "Data Processing for ML: Using BigQuery and Dataflow for data preparation. (3 hours)",
      "Vertex AI: Unified platform for ML model development and deployment. (4 hours)",
      "AutoML: Creating ML models without writing code. (3 hours)",
      "ML APIs: Using ML APIs for Vision, Speech, and NLP. (3 hours)",
      "Deployment and Monitoring: Deploying and monitoring ML models in production. (2 hours)",
      "MLOps: DevOps principles and practices for ML. (3 hours)"
    ],
    skills: ["Machine Learning", "Google Cloud", "Vertex AI", "AutoML", "BigQuery ML", "ML APIs", "MLOps"],
    level: "Intermediate",
    duration: "20 Hours",
    certificateId: "1RXY23013XVM",
    validUntil: "December 8, 2027",
    link: "https://www.dicoding.com/certificates/1RXY23013XVM",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

// Extract unique categories from certificates
const allSkills = Array.from(
  new Set(certificates.flatMap((cert) => cert.skills))
).sort()

// Group certificates by technology/skill areas
const categories = [
  "All",
  "Cloud Computing",
  "Backend",
  "Programming",
  "DevOps",
  "Machine Learning",
]

export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")
  const [initialLoad, setInitialLoad] = useState(true)
  const arrowControls = useAnimation()
  const scrollIndicatorControls = useAnimation()
  const [scrollPercentage, setScrollPercentage] = useState(0)

  // Filter certificates based on category
  const filteredCertificates = certificates.filter((cert) => {
    // Filter by category
    const matchesCategory =
      activeCategory === "All" ||
      cert.skills.some((skill) => {
        if (activeCategory === "Cloud Computing") 
          return ["AWS", "Google Cloud", "Cloud", "Cloud Architecture"].some(term => skill.includes(term))
        if (activeCategory === "Backend") 
          return ["Back-End", "Backend", "Node.js", "Express.js", "API", "Server", "Database"].some(term => skill.includes(term))
        if (activeCategory === "Programming") 
          return ["Programming", "JavaScript", "Logic", "Algorithms"].some(term => skill.includes(term))
        if (activeCategory === "DevOps") 
          return ["DevOps", "Docker", "Kubernetes", "CI/CD"].some(term => skill.includes(term))
        if (activeCategory === "Machine Learning") 
          return ["Machine Learning", "AI", "ML", "Deep Learning"].some(term => skill.includes(term))
        return false
      })

    return matchesCategory
  })

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

  // Mouse drag handlers for scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate drag if the click is on the card background or scroll container, not on text elements
    if (
      e.target instanceof Element && 
      !['P', 'SPAN', 'H3', 'H4', 'BUTTON', 'A', 'DIV.badge'].some(selector => 
        e.target instanceof Element && 
        (e.target.tagName === selector || e.target.classList.contains('badge') || 
         e.target.closest('button') || e.target.closest('a'))
      )
    ) {
      setIsDragging(true)
      setStartX(e.pageX - scrollContainerRef.current!.offsetLeft)
      setScrollLeft(scrollContainerRef.current!.scrollLeft)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current!.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovered(false)
  }

  // Automatic scroll detection to show/hide navigation buttons
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollable = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  // Update scroll percentage on scroll
  const updateScrollPercentage = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScrollLeft = scrollWidth - clientWidth
      const percentage = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0
      setScrollPercentage(percentage)
    }
  }

  // Subtle auto-scroll animation on initial load
  useEffect(() => {
    if (inView && initialLoad && scrollContainerRef.current) {
      const container = scrollContainerRef.current

      // Only show the animation if there's content to scroll
      if (container.scrollWidth > container.clientWidth) {
        // Wait a moment after component appears
        const timer = setTimeout(() => {
          // Animate right arrow
          arrowControls.start({
            x: [0, 10, 0],
            opacity: [0.2, 1, 0.2],
            transition: { 
              duration: 1.5,
              repeat: 2,
              repeatType: "reverse" 
            }
          })

          // Subtle scroll hint
          const smallScroll = Math.min(200, container.scrollWidth * 0.1)
          container.scrollTo({ left: smallScroll, behavior: 'smooth' })
          
          // Then scroll back after a delay
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'smooth' })
            setInitialLoad(false)

            // Show "swipe to scroll" indicator
            scrollIndicatorControls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 }
            })

            // Hide indicator after 4 seconds
            setTimeout(() => {
              scrollIndicatorControls.start({
                opacity: 0,
                y: 10,
                transition: { duration: 0.5 }
              })
            }, 4000)
          }, 1000)
        }, 500)
        
        return () => clearTimeout(timer)
      }
    }
  }, [inView, initialLoad, arrowControls, scrollIndicatorControls])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollable()
      container.addEventListener("scroll", () => {
        checkScrollable()
        updateScrollPercentage()
      })
      window.addEventListener("resize", checkScrollable)
      
      return () => {
        container.removeEventListener("scroll", checkScrollable)
        window.removeEventListener("resize", checkScrollable)
      }
    }
  }, [filteredCertificates])

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-background/10 to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-primary">Certificates</span> & Achievements
          </h2>
          
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Professional certifications and achievements that demonstrate my technical expertise and continuous learning
          </p>

          {/* Centered Category Filters */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div 
            className="relative" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={handleMouseLeave}
          >
            {/* Left scroll indicator - always visible */}
            {canScrollLeft && (
              <div
                className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background/80 to-transparent flex items-center justify-start pl-4"
              >
                <button 
                  onClick={() => scroll("left")}
                  className="bg-background/90 hover:bg-background p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Right scroll indicator - always visible */}
            {canScrollRight && (
              <div 
                className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background/80 to-transparent flex items-center justify-end pr-4"
              >
                <button 
                  onClick={() => scroll("right")}
                  className="bg-background/90 hover:bg-background p-2 rounded-full shadow-md transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 scroll-smooth custom-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onScroll={updateScrollPercentage}
            >
              <AnimatePresence>
                {filteredCertificates.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center w-full py-10"
                  >
                    <p className="text-muted-foreground">No certificates match your filters</p>
                  </motion.div>
                ) : (
                  filteredCertificates.map((cert, index) => (
                    <motion.div
                      key={cert.certificateId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex-shrink-0 w-80 mx-4 first:ml-0 last:mr-0"
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <Card className="h-full hover:shadow-md transition-all duration-300 border-t-4 border-t-primary/80 hover:border-t-primary relative flex flex-col">
                        {/* Drag handle with visual indicator on hover */}
                        <div 
                          className="absolute inset-0 z-[5] cursor-grab opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none"
                        >
                          <div className="bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                            <div className="flex items-center gap-2 text-xs text-primary">
                              <MousePointer className="h-3 w-3" />
                              <span>Drag to scroll</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Invisible drag handle that covers the entire card */}
                        <div 
                          className="absolute inset-0 z-[1] cursor-grab"
                          onMouseDown={handleMouseDown}
                        ></div>
                        <CardHeader className="flex flex-row items-start gap-4 pb-4 relative z-[2]">
                          <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                          <div className="space-y-1">
                            <CardTitle className="text-lg line-clamp-2 min-h-[56px]">{cert.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <School className="h-3 w-3" />
                              <span>{cert.issuer}</span>
                            </CardDescription>
                            <CardDescription className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{cert.date}</span>
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow relative z-[2]">
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-3 min-h-[4.5rem]">{cert.description}</p>
                          <div className="flex flex-wrap gap-1 mt-auto min-h-[30px]">
                            {cert.skills.slice(0, 3).map((skill, i) => (
                              <Badge key={i} variant="secondary" className="text-xs h-6 bg-secondary/70">
                                {skill}
                              </Badge>
                            ))}
                            {cert.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs h-6 bg-secondary/40">
                                +{cert.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4 pb-4 relative z-[2] mt-auto border-t border-muted/10">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-[100px] h-10 bg-transparent border-muted/30">
                                <Info className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{cert.title}</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                  {cert.issuer} • {cert.date}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="mt-4 space-y-4">
                                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-muted">
                                  <Image
                                    src={cert.imageUrl || "/placeholder.svg"}
                                    alt={`${cert.title} Certificate`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div>
                                  <h4 className="text-lg font-semibold mb-2">Description</h4>
                                  <p className="text-sm">{cert.detailedDescription}</p>
                                </div>

                                <div>
                                  <h4 className="text-lg font-semibold mb-2">Course Materials</h4>
                                  <ul className="space-y-2 text-sm list-disc pl-5">
                                    {cert.courseMaterials?.map((material, idx) => (
                                      <li key={idx}>{material}</li>
                                    ))}
                                  </ul>
                                </div>

                                {cert.evaluation && (
                                  <div>
                                    <h4 className="text-lg font-semibold mb-2">Evaluation</h4>
                                    <ul className="space-y-2 text-sm list-disc pl-5">
                                      {cert.evaluation.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-lg font-semibold mb-2">Details</h4>
                                    <ul className="space-y-2 text-sm">
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Issuer:</span> {cert.issuer}
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Issued Date:</span> {cert.date}
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Valid Until:</span> {cert.validUntil}
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Certificate ID:</span> {cert.certificateId}
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Level:</span> {cert.level}
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="font-medium">Duration:</span> {cert.duration}
                                      </li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-semibold mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {cert.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t">
                                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                                    <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      View Certificate
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-[100px] h-10" asChild>
                            <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Redesigned gradient overlays - more subtle */}
            <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>

          {/* Custom visible scrollbar */}
          {filteredCertificates.length > 0 && (
            <div className="relative mt-2 mb-6 px-4">
              <div className="h-3 bg-muted/30 rounded-full w-full hover:bg-muted/40 transition-colors">
                <div 
                  className="absolute top-0 left-0 h-3 bg-primary/60 hover:bg-primary/80 rounded-full transition-all duration-100"
                  style={{ width: `${scrollPercentage}%` }}
                ></div>
                
                {/* Draggable thumb */}
                <div 
                  className="absolute top-0 left-0 h-5 w-5 -mt-1 bg-primary hover:bg-primary/80 rounded-full shadow-md cursor-grab active:cursor-grabbing active:scale-110 transition-all"
                  style={{ 
                    left: `calc(${scrollPercentage}% - ${scrollPercentage > 0 ? 10 : 0}px)` 
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      if (scrollContainerRef.current) {
                        const container = scrollContainerRef.current
                        const trackWidth = e.currentTarget.parentElement!.getBoundingClientRect().width
                        const clickPosition = (moveEvent.clientX - e.currentTarget.parentElement!.getBoundingClientRect().left) / trackWidth
                        
                        // Calculate new scroll position
                        const newScrollLeft = clickPosition * (container.scrollWidth - container.clientWidth)
                        container.scrollLeft = newScrollLeft
                      }
                    }
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                    }
                    
                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Click and drag instruction */}
          {filteredCertificates.length > 0 && (
            <div className="flex items-center justify-center gap-3 mb-6 text-muted-foreground text-sm">
              <MousePointer className="h-4 w-4" />
              <span>Click and drag horizontally to scroll</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
