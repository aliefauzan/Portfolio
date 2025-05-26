"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Calendar, ChevronLeft, ChevronRight, ExternalLink, FilterX, Info, MousePointer, School, Search } from "lucide-react" // Added FilterX
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // Added DialogFooter for consistency
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import Image from "next/image"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card" // Assuming this path is correct

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
];

const categoryKeywordsMap: Record<string, string[]> = {
  "Cloud Computing": ["AWS", "Google Cloud", "Cloud", "Cloud Architecture", "GCP", "App Engine", "Cloud Run", "Cloud SQL", "Vertex AI", "BigQuery ML", "Cloud Functions"],
  "Backend": ["Back-End", "Backend", "Node.js", "Express.js", "API", "Server", "Database", "RESTful API", "NoSQL", "Authentication"],
  "Programming": ["Programming", "JavaScript", "Logic", "Algorithms", "C++", "Dart", "Python", "ES6+", "OOP", "DOM Manipulation", "Data Structures", "File I/O", "Console Application"],
  "DevOps": ["DevOps", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "Infrastructure as Code", "Version Control", "MLOps"],
  "Machine Learning": ["Machine Learning", "AI", "ML", "Deep Learning", "NLP", "TensorFlow", "Neural Networks", "Data for AI", "AI Ethics", "Vertex AI", "AutoML", "BigQuery ML", "ML APIs"],
};


export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const arrowControls = useAnimation();
  const scrollIndicatorControls = useAnimation();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const filteredCertificates = certificates.filter((cert) => {
    let matchesCategory = activeCategory === "All";
    if (!matchesCategory) {
      const keywordsForCategory = categoryKeywordsMap[activeCategory];
      if (keywordsForCategory) {
        matchesCategory = cert.skills.some(skill => 
          keywordsForCategory.some(term => skill.toLowerCase().includes(term.toLowerCase()))
        );
      }
    }

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === "" || 
      cert.title.toLowerCase().includes(searchLower) ||
      cert.issuer.toLowerCase().includes(searchLower) ||
      cert.description.toLowerCase().includes(searchLower) ||
      (cert.detailedDescription && cert.detailedDescription.toLowerCase().includes(searchLower)) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = container.clientWidth * 0.8 > 340 ? 340 : container.clientWidth * 0.8;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current && e.target instanceof Element &&
        !e.target.closest('button, a, [role="dialog"], [role="slider"], input, label')) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  useEffect(() => {
    const body = document.body;
    const scrollContainer = scrollContainerRef.current;
    if (isDragging) {
      body.classList.add('dragging-scroll');
      if (scrollContainer) scrollContainer.classList.add('dragging-scroll-element');
    } else {
      body.classList.remove('dragging-scroll');
      if (scrollContainer) scrollContainer.classList.remove('dragging-scroll-element');
    }
    return () => {
      body.classList.remove('dragging-scroll');
    };
  }, [isDragging]);


  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasHorizontalScrollbar = container.scrollWidth > container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 5 && hasHorizontalScrollbar);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 5 && hasHorizontalScrollbar);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };
  
  const updateScrollPercentage = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const percentage = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
      setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    if (inView && initialLoad && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (container.scrollWidth > container.clientWidth && filteredCertificates.length > 0) {
        const timer = setTimeout(() => {
          arrowControls.start({
            x: [0, 5, 0, 5, 0], opacity: [0.5, 1, 0.5, 1, 0.5],
            transition: { duration: 1.5, times: [0, 0.2, 0.4, 0.6, 1] }
          });
          const smallScroll = Math.min(150, container.scrollWidth * 0.1);
          container.scrollTo({ left: smallScroll, behavior: 'smooth' });
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'smooth' });
            setInitialLoad(false);
            scrollIndicatorControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
            setTimeout(() => {
              scrollIndicatorControls.start({ opacity: 0, y: 10, transition: { duration: 0.5 } });
            }, 3000);
          }, 800);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setInitialLoad(false);
        scrollIndicatorControls.start({ opacity: 0, y: 10, transition: { duration: 0.1 } });
      }
    }
  }, [inView, initialLoad, arrowControls, scrollIndicatorControls, filteredCertificates.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollable(); 
      updateScrollPercentage(); 
      const handleScrollAndResize = () => {
        checkScrollable();
        updateScrollPercentage();
      };
      container.addEventListener("scroll", handleScrollAndResize);
      window.addEventListener("resize", handleScrollAndResize);
      
      return () => {
        container.removeEventListener("scroll", handleScrollAndResize);
        window.removeEventListener("resize", handleScrollAndResize);
      };
    }
  }, [filteredCertificates, activeCategory, searchTerm]);

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-background/10 to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center rainbow-text">
            <span className="relative inline-block">
              <span className="text-primary">Certificates</span> & Achievements
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
            </span>
          </h2>
          
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Professional certifications and achievements that demonstrate my technical expertise and continuous learning.
          </p>

          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search certificates by title, skill, etc..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base rounded-full shadow-sm focus:ring-primary focus:border-primary border-border"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 bg-muted/30 p-1 rounded-lg shadow">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  size="sm"
                  onClick={() => { setActiveCategory(category); scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' }); }}
                  className={`rounded-md transition-all duration-300 text-xs sm:text-sm px-3 py-2 ${
                    activeCategory === category 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-primary-foreground shadow-md hover:from-blue-600 hover:to-purple-600" 
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div 
            className="relative"
          >
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => scroll("left")}
                  className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground p-2 rounded-full shadow-lg border border-border"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => scroll("right")}
                  className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground p-2 rounded-full shadow-lg border border-border"
                  aria-label="Scroll right"
                >
                  <motion.div animate={arrowControls}>
                    <ChevronRight className="h-6 w-6" />
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-8 pt-2 scroll-smooth custom-scrollbar -mx-4 px-4"
              style={{ WebkitOverflowScrolling: "touch" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onScroll={updateScrollPercentage} 
            >
              <AnimatePresence mode="popLayout">
                {filteredCertificates.length === 0 ? (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center w-full py-10 text-center min-h-[300px]"
                  >
                    <FilterX className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground text-lg">No certificates match your filters.</p>
                    <p className="text-sm text-muted-foreground/80">Try adjusting your search or category selection.</p>
                  </motion.div>
                ) : (
                  filteredCertificates.map((cert, index) => (
                    <motion.div
                      layout 
                      key={cert.certificateId}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="flex-shrink-0 w-[320px] sm:w-[340px] mx-3 first:ml-0 last:mr-0 floating"
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    >
                      <Interactive3DCard intensity="low" className="h-full">
                        <Card className="h-full holographic-border bg-gradient-to-br from-card/90 via-card/80 to-primary/5 backdrop-blur-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 relative flex flex-col group shadow-lg">
                          <CardHeader className="flex flex-row items-start gap-3 pb-3 pt-4 px-4 relative z-[1]">
                            <div className="p-2.5 rounded-lg bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent border border-primary/20 group-hover:scale-105 transition-transform duration-300 iridescent-glow">
                              <Award className="h-6 w-6 text-primary flex-shrink-0" />
                            </div>
                            <div className="space-y-0.5 flex-1">
                              <CardTitle className="text-md sm:text-lg line-clamp-2 min-h-[40px] sm:min-h-[48px] group-hover:text-primary transition-colors leading-tight">{cert.title}</CardTitle>
                              <CardDescription className="flex items-center gap-1.5 text-xs">
                                <School className="h-3.5 w-3.5" />
                                <span>{cert.issuer}</span>
                              </CardDescription>
                              <CardDescription className="flex items-center gap-1.5 text-xs">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{cert.date}</span>
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-grow px-4 pb-3 relative z-[1]">
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-3 min-h-[60px]">{cert.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-auto min-h-[28px]">
                              {cert.skills.slice(0, 3).map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary/90 border border-primary/20">
                                  {skill}
                                </Badge>
                              ))}
                              {cert.skills.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted/50 border-border/50">
                                  +{cert.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center pt-3 pb-4 px-4 relative z-[1] mt-auto border-t border-primary/10">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-9 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                                  <Info className="mr-1.5 h-3.5 w-3.5" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl sm:text-3xl font-semibold">{cert.title}</DialogTitle>
                                  <DialogDescription className="text-sm text-muted-foreground pt-1">
                                    {cert.issuer} • {cert.date} {cert.validUntil ? `(Valid until: ${cert.validUntil})` : ''}
                                  </DialogDescription>
                                </DialogHeader>
                                <hr className="my-4 border-border/30" />
                                <div className="space-y-6 text-sm leading-relaxed">
                                  <div className="relative aspect-video sm:aspect-[2/1] w-full overflow-hidden rounded-md shadow-md bg-muted mb-4">
                                    <Image
                                      src={cert.imageUrl || "/placeholder.svg"} // TODO: Replace placeholder
                                      alt={`${cert.title} Certificate Image`}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  
                                  <section>
                                    <h4 className="text-lg font-semibold mb-2 text-primary">Description</h4>
                                    <p className="text-foreground/90">{cert.detailedDescription}</p>
                                  </section>
                                  <hr className="border-border/20 my-4" />
                                  {cert.courseMaterials && cert.courseMaterials.length > 0 && (
                                    <section>
                                      <h4 className="text-lg font-semibold mb-2 text-primary">Course Materials</h4>
                                      <ul className="space-y-1.5 list-disc pl-5 text-foreground/90">
                                        {cert.courseMaterials.map((material, idx) => <li key={idx}>{material}</li>)}
                                      </ul>
                                    </section>
                                  )}
                                  {cert.evaluation && cert.evaluation.length > 0 && (
                                    <section>
                                      <hr className="border-border/20 my-4" />
                                      <h4 className="text-lg font-semibold mb-2 text-primary">Evaluation</h4>
                                      <ul className="space-y-1.5 list-disc pl-5 text-foreground/90">
                                        {cert.evaluation.map((item, idx) => <li key={idx}>{item}</li>)}
                                      </ul>
                                    </section>
                                  )}
                                  <hr className="border-border/20 my-4" />
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <section>
                                      <h4 className="text-lg font-semibold mb-2 text-primary">Details</h4>
                                      <ul className="space-y-1.5 text-foreground/90">
                                        <li><span className="font-medium">Certificate ID:</span> {cert.certificateId}</li>
                                        <li><span className="font-medium">Level:</span> {cert.level}</li>
                                        <li><span className="font-medium">Duration:</span> {cert.duration}</li>
                                      </ul>
                                    </section>
                                    <section>
                                      <h4 className="text-lg font-semibold mb-2 text-primary">Skills Acquired</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill, i) => (
                                          <Badge key={i} variant="secondary" className="bg-primary/10 text-primary/90 border-primary/20">{skill}</Badge>
                                        ))}
                                      </div>
                                    </section>
                                  </div>
                                </div>
                                <DialogFooter className="pt-6 mt-6 border-t border-border/20">
                                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-primary-foreground" asChild>
                                    <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Verify Certificate
                                    </Link>
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {/* This is the button (line 712 in previous context) that might have caused an error if button.tsx was incorrect */}
                            <Button size="sm" className="text-xs sm:text-sm h-9 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-primary-foreground" asChild>
                              <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                Verify
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </Interactive3DCard>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {filteredCertificates.length > 0 && (
            <div className="relative mt-4 mb-6 px-4">
              <Slider
                value={[scrollPercentage]}
                min={0} max={100} step={0.1}
                onValueChange={(value) => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const maxScrollLeft = container.scrollWidth - container.clientWidth;
                    container.scrollLeft = (value[0] / 100) * maxScrollLeft;
                  }
                }}
                className="py-1 [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-blue-500 [&>span:first-child>span]:to-purple-500"
                aria-label="Scroll certificates"
              />
            </div>
          )}

          {filteredCertificates.length > 0 && (
             <motion.div 
              className="flex items-center justify-center gap-2 mb-6 text-muted-foreground text-xs sm:text-sm"
              initial={{opacity:0, y:10}}
              animate={scrollIndicatorControls}
            >
              <MousePointer className="h-4 w-4" />
              <span>Drag slider or certificates to scroll</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
