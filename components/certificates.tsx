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
      "This course is designed for beginners looking to start their career in the AI field. After completing the course, students are expected to be able to analyze various basic concepts in AI along with their applications effectively.",
    courseMaterials: [
      "Getting to Know Artificial Intelligence (AI): Identifying basic concepts about AI. (1 hour 30 minutes)",
      "Data for AI: Explaining basic concepts about data and its utilization in AI development. (1 hour 25 minutes)",
      "Introduction to Machine Learning: Explaining basic concepts of Machine Learning as part of AI along with application examples. (2 hours 30 minutes)",
      "Deep Learning for Everyone: Identifying important concepts in Deep Learning and implementing application examples. (2 hours 25 minutes)"
    ],
    evaluation: ["Final course exam"],
    skills: ["AI Fundamentals", "Machine Learning Basics", "Deep Learning", "Data for AI", "AI Concepts", "Neural Networks"],
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
    date: "November 21, 2024",
    description:
      "A course for students who want to learn cloud computing, specifically Google Cloud, according to industry standards.",
    detailedDescription:
      "This course is aimed at students who want to learn cloud computing, specifically Google Cloud, according to industry standards. By the end of the course, students will be able to master Google Cloud services and use them to create cloud solutions.",
    courseMaterials: [
      "Introduction to Google Cloud: Learning cloud computing concepts and setting up the environment to start developing applications on Google Cloud. (2 hours 35 minutes)",
      "Computing Services on Google Cloud: Learning various computing services on Google Cloud and how to deploy web-based applications. (6 hours)",
      "Data Services on Google Cloud: Learning several services related to data management on Google Cloud. (6 hours)",
      "Networking Services on Google Cloud: Learning various networking services on Google Cloud that enable many services to communicate with each other. (2 hours 25 minutes)",
      "Monitoring and Logging: Learning to use Google Cloud's operations suite to monitor application conditions and receive reports when failures occur. (3 hours 20 minutes)",
      "Identity and Access Management: Learning identity and access management on Google Cloud in developing cloud solutions. (2 hours 33 minutes)",
      "Deploy and Implementation of Cloud Solutions: Learning to use Google Cloud Marketplace for cloud solution development and understanding best practices in developing cloud solutions. (2 hours)"
    ],
    evaluation: ["Final course exam", "Submission (final project) implementing Google Cloud services for a cloud-based application"],
    skills: ["Google Cloud", "Cloud Architecture", "Compute Engine", "Cloud Storage", "Cloud SQL", "IAM", "Cloud Run", "Cloud Solutions", "Google Cloud Marketplace"],
    level: "Intermediate",
    duration: "42 Hours",
    certificateId: "1RXY23013XVM",
    validUntil: "November 21, 2027",
    link: "https://www.dicoding.com/certificates/1RXY23013XVM",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "Building Back-End Applications with Google Cloud for Beginners",
    issuer: "Dicoding Indonesia",
    date: "November 11, 2024",
    description:
      "A course for individuals wanting to become Back-End Developers with Google's international competency standards.",
    detailedDescription:
      "This course is aimed at individuals who want to step into becoming a Back-End Developer with Google's international competency standards. By the end of the course, students can independently create simple RESTful APIs to support application functionality.",
    courseMaterials: [
      "Introduction to Back-End: Explaining the roles of front-end and back-end, how client and server communicate through HTTP protocol, and RESTful API architecture in building web services. (3 hours 5 minutes)",
      "Node.js Fundamentals for Back-End: Getting to know Node.js and understanding its basics such as global and process objects, modularization, Node Package Manager (NPM), eventing, filesystem, and streaming techniques. (8 hours)",
      "Building Web Services Using Node.js: Building web services using native Node.js and through the Hapi framework, as well as building simple RESTful APIs. (9 hours 43 minutes)",
      "Deploy Web Services: Getting to know and using Google Compute Engine, operating Compute Engine instances through SSH, and running RESTful APIs on Compute Engine instances. (3 hours 15 minutes)",
      "Consuming and Testing RESTful APIs Using Postman: Installing Postman, consuming RESTful APIs for testing purposes, and writing automated test scenarios using Postman. (4 hours 40 minutes)"
    ],
    evaluation: ["Submission: Final project in the form of Bookshelf API practice creating a Back-End for a notes application with Create, Read, Update, and Delete functions"],
    skills: ["Back-End Development", "Node.js", "RESTful API", "Hapi Framework", "Google Cloud", "Compute Engine", "HTTP Protocol", "Postman", "API Testing"],
    level: "Beginner",
    duration: "45 Hours",
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
      "A course for individuals wanting to become Web Developer/Back-end developers using Node.js technology with industry standards validated by AWS.",
    detailedDescription:
      "This course is aimed at individuals who want to step into becoming a Web Developer/Back-end developer using Node.js technology with industry competency standards validated by AWS. By the end of the course, students can master JavaScript fundamentals for web application development using Node.js.",
    courseMaterials: [
      "Learning Preparation: Introduction to the course and what will be learned. (45 minutes)",
      "Gateway to the JavaScript World: Using Runtime Environment Browser, Node.js, Bun, or Deno to run JavaScript code locally on computer. (1 hour 5 minutes)",
      "Navigating the Ocean of Syntax: Identifying proper syntax usage for creating variables, determining data types, operators, and comment types in JavaScript. (2 hours 45 minutes)",
      "Playing with Functions: Using functions to abstract JavaScript code to make code reusable. (2 hours 40 minutes)",
      "Not Just Any Data: Using data structures like Object, Array, Map, and Set effectively to manage data within programs. (3 hours 5 minutes)",
      "The Program Controller: Correlating the use of conditional syntax, looping, and error handling to form a program flow. (2 hours 55 minutes)",
      "Harmonious Modularization: Using ECMAScript Module to break code into separate JavaScript files effectively. (2 hours 30 minutes)",
      "Diving into the OOP World: Interpreting programming problems using Object-Oriented Programming paradigm. (3 hours 40 minutes)",
      "Functional Programming: Solving programming problems using Functional Programming paradigm. (3 hours 40 minutes)",
      "Asynchronous Process: Using callback, Promise, and async-await to handle asynchronous processes in JavaScript. (3 hours 45 minutes)",
      "Code Quality: Writing JavaScript code with consistent, secure, and tested writing style. (7 hours 25 minutes)"
    ],
    evaluation: ["Final course exam", "Submission"],
    skills: ["JavaScript", "Node.js", "ES6+", "Asynchronous Programming", "OOP", "Functional Programming", "ECMAScript Module", "Code Quality", "Error Handling"],
    level: "Beginner",
    duration: "46 Hours",
    certificateId: "53XEQK0V9XRN",
    validUntil: "November 3, 2027",
    link: "https://www.dicoding.com/certificates/53XEQK0V9XRN",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "DevOps Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "April 20, 2025",
    description:
      "A course for Developers, IT Operations, or individuals who want to understand the ins and outs of DevOps to improve application development processes.",
    detailedDescription:
      "This course is aimed at Developers, IT Operations, or individuals who want to understand the ins and outs of DevOps as a step to improve the application development processes they have been working on. By the end of the course, students can understand how DevOps culture and practices can improve the technical and business value of companies.",
    courseMaterials: [
      "Introduction to DevOps: Understanding the definition and benefits of DevOps. (2 hours)",
      "DevOps Principles: Understanding the principles underlying DevOps through The Three Ways. (3 hours)",
      "CALMS Framework: Understanding DevOps culture through the CALMS Framework. (2 hours 53 minutes)",
      "DevOps Practices: Understanding DevOps practices by getting to know DevOps Pipeline and DevOps Tools. (2 hours 10 minutes)",
      "DevOps Implementation Stories: Learning about real-world DevOps implementation stories using Amazon as a case study example. (1 hour 50 minutes)"
    ],
    evaluation: ["Final course exam"],
    skills: ["DevOps", "DevOps Culture", "The Three Ways", "CALMS Framework", "DevOps Pipeline", "DevOps Tools", "IT Operations", "Process Improvement"],
    level: "Beginner",
    duration: "15 Hours",
    certificateId: "0LZ0R86D3P65",
    validUntil: "April 20, 2028",
    link: "https://www.dicoding.com/certificates/0LZ0R86D3P65",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "Web Programming Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "September 23, 2024",
    description:
      "This course thoroughly covers HTML and CSS fundamentals as the foundation for website creation.",
    detailedDescription:
      "This course thoroughly covers HTML and CSS fundamentals as the foundation for website creation. These foundations are necessary for those who want to develop their website development skills to a more advanced level. Structured and verified by Dicoding's expert team, the presented material is structured and comprehensive.",
    courseMaterials: [
      "Introduction: Introduction to websites, server and client, website anatomy, and tools needed for website page development. (40 minutes)",
      "Introduction to HTML: Learning the tools used to build website page structure. This module covers HTML, basic structure of HTML documents, etc. (1 hour 10 minutes)",
      "HTML Deep Dive: Deepening the application of HTML in building web page structure more comprehensively. Including various HTML elements, techniques for organizing website content with semantic elements, understanding attributes on elements, generic elements, tables, etc. This module also discusses the difference between inline and block elements. (6 hours 45 minutes)",
      "Introduction to CSS: Learning the tools used to beautify website page appearance. This module covers the role of CSS, how it works, how to write its code, anatomy of CSS rules, etc. (1 hour 50 minutes)",
      "CSS Deep Dive: Deepening the application of CSS in beautifying website page appearance more comprehensively. Including various selectors, styling for fonts and text, understanding foreground color and background color, box model, shadow, positioning, layouting using float, and media queries. (15 hours 20 minutes)",
      "Responsive Layout with Flexbox: Learning layouting techniques using Flexbox in building website page content. This feature is a new technique in CSS for creating responsive layouts that can be combined with media queries for optimal mobile device display. (4 hours 5 minutes)",
      "Conclusion: Implementation of learned techniques in creating and improving a simple website project. (10 hours 15 minutes)"
    ],
    evaluation: ["Final Exam", "Submission: Final assignment creating a website page using semantic HTML and layouting techniques"],
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "Web Semantics", "Web Accessibility", "Media Queries", "CSS Box Model"],
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
      "This class is designed for developers who want to learn code or data management using Git with GitHub.",
    detailedDescription:
      "This class is designed for developers who want to learn code or data management using Git with GitHub to collaborate with other developers according to industry standards. At the end of the class, students can manage their own collections of data or code in GitHub repositories, and can collaborate with other developers on the same repository.",
    courseMaterials: [
      "Git and GitHub: Understanding what Git and GitHub are and their benefits in managing data or code. (1 Hour 45 Minutes)",
      "Git Basics: Understanding the basics of data or code management with Git, such as creating repositories, creating files, git commit, and git checkout. (2 Hours 5 Minutes)",
      "Learning Experience Case Study: Enhancing learning experience on Git basics through a case study. (1 Hour 20 Minutes)",
      "Git Branches: Understanding the concept of branching in Git, including learning about merging and conflict resolution. (2 Hours 10 Minutes)",
      "Team Collaboration: Understanding how to collaborate with other teams on the same repository such as forking, squashing changes, and code reviews. (2 Hours 50 Minutes)",
      "Team Collaboration Case Study: Enhancing knowledge in team collaboration such as creating new repositories, copying repositories, and case study handling pull requests on an active GitHub repository. (1 Hour 15 Minutes)",
      "GitHub as Portfolio: Understanding the use of GitHub as a portfolio with practice creating readme files that can be utilized as a career portfolio. (1 Hour 20 Minutes)"
    ],
    evaluation: ["Final Class Exam"],
    skills: ["Git", "GitHub", "Version Control", "Branching", "Pull Requests", "Code Reviews", "Collaboration", "Repository Management", "Conflict Resolution"],
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
    date: "September 11, 2024",
    description: 
      "This class is designed for beginners who want to start learning logic in the programming field according to industry standards.",
    detailedDescription:
      "This class is designed for beginners who want to start learning logic in the programming field according to industry standards. At the end of the class, students can understand basic programming logic and apply it in solving problems in the Software Developer field.",
    courseMaterials: [
      "Introduction: Introduction to logic and algorithm terms and types of basic programming logic. (1 hour 9 minutes)",
      "Logic Gates: Understanding what logic gates are and their types such as AND, OR, NOT, NAND, NOR, XOR, and XNOR. (1 hour 49 minutes)",
      "Introduction to Computational Thinking Basics: Understanding problem-solving methods using computational thinking methods including decomposition, pattern recognition, abstraction, algorithm writing, and evaluation. (1 hour 24 minutes)",
      "Conclusion: Understanding how the programming logic knowledge learned can be used in real case studies. (1 hour 7 minutes)"
    ],
    evaluation: ["Final class exam"],
    skills: ["Programming Logic", "Algorithms", "Logic Gates", "Computational Thinking", "Problem Solving", "Decomposition", "Pattern Recognition", "Abstraction"],
    level: "Beginner",
    duration: "6 Hours",
    certificateId: "GRX54NYE2P0M",
    validUntil: "September 11, 2027",
    link: "https://www.dicoding.com/certificates/GRX54NYE2P0M",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "Getting Started with Programming to Become a Software Developer",
    issuer: "Dicoding Indonesia",
    date: "September 12, 2024",
    description: 
      "This class is designed for beginners who want to start learning programming to become software developers according to Software Developer occupational standards.",
    detailedDescription:
      "This class is designed for beginners who want to start learning programming to become software developers according to Software Developer occupational standards (KBJI occupation code: 2512.03, Indotask: 2512). At the end of the training, students are able to modify software applications using flowchart guides and programming with HTML, CSS, and JavaScript technologies at a basic level accurately according to application specifications and functionality requirements.",
    courseMaterials: [
      "Understanding Application Requirements: Learning theory and methodology in understanding application requirements from the user side as well as from the technical specifications side of the application. Implementation of skills into case studies creating application requirements from the user side and from the technical specifications side. (49 minutes)",
      "Application Modification Planning: Learning theory and methodology in creating application requirement specifications, in understanding how applications work, and in understanding flowchart guides. Implementation of skills into case studies creating application requirement specifications, understanding how applications run, and creating flowcharts. (1 hour 19 minutes)",
      "Understanding Basic Programming Concepts: Learning programming language syntax theory, variables, data types, computer logic, and JavaScript programming language version ES6. Skill implementation by practicing writing pseudocode and writing first code. (2 hours 20 minutes)",
      "Software Application Modification: Learning HTML markup language version HTML5 and CSS programming language version 3. Skill implementation through case studies modifying a software application interface. (54 minutes)",
      "Programming Documentation and Software Application Development: Learning software archiving theory, creating code writing styles, writing comments in code, and creating technical application documentation. Skill implementation through case studies archiving software, adjusting code writing styles to meet standards, adding comments to code, and practicing creating technical application documentation. (1 hour 31 minutes)"
    ],
    evaluation: ["Final Class Exam", "Competency Graduation Certificate"],
    skills: ["Programming Basics", "Software Development", "HTML5", "CSS3", "JavaScript ES6", "Application Requirements", "Flowcharts", "Software Documentation", "Code Documentation", "Application Modification"],
    level: "Beginner",
    duration: "9 Hours",
    certificateId: "98XW5WQY9PM3",
    validUntil: "September 12, 2027",
    link: "https://www.dicoding.com/certificates/98XW5WQY9PM3",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "Cloud Practitioner Essentials (AWS Cloud Fundamentals)",
    issuer: "Dicoding Indonesia",
    date: "May 17, 2024",
    description: 
      "This class is designed for beginners who want to start their career in cloud computing according to AWS international competency standards.",
    detailedDescription:
      "This class is designed for beginners who want to start their career in cloud computing according to AWS international competency standards. At the end of the class, students can understand AWS Cloud with all types of services, global infrastructure, and pricing.",
    courseMaterials: [
      "Introduction to Amazon Web Services: Explaining preparation before taking the class, benefits of AWS, differences between on-demand delivery and cloud deployment models, and cost models with pay-as-you-go schemes. (45 minutes)",
      "Computing in the Cloud: Discussing cloud computing materials, such as Amazon EC2, Elastic Load Balancing, differences between Amazon SNS and Amazon SQS, and other computing services in AWS. (1 hour 30 minutes)",
      "Global Infrastructure and Reliability: Examining materials related to AWS global infrastructure, basic concepts of Availability Zones, benefits of Amazon CloudFront and Edge locations, and comparing differences in methods for delivering AWS services. (45 minutes)",
      "Networking: Thoroughly exploring basic networking concepts, differences between public and private network resources, virtual private gateway and virtual private network, AWS Direct Connect, benefits of implementing hybrid architecture, security layers used in IT strategies, and services for interacting with AWS global networks. (1 hour 15 minutes)",
      "Storage and Databases: Reviewing basic concepts of storage and databases, benefits of Amazon EBS, Amazon S3, Amazon EFS, variations of storage solutions, Amazon DynamoDB, and finally various database services. (1 hour 15 minutes)",
      "Security: Describing shared responsibility model materials, multi-factor authentication, AWS IAM, security policy basics; AWS Organizations, compliance with AWS, and main AWS security services that are easy. (1 hour 30 minutes)",
      "Monitoring and Analytics: Examining approaches to monitor your AWS environment, benefits of Amazon CloudWatch, AWS CloudTrail, and AWS Trusted Advisor. (45 minutes)",
      "Pricing and Support: Breaking down AWS Free Tier materials, AWS Organizations and consolidated billing, AWS Budgets, AWS Cost Explorer, AWS Pricing Calculator, distinguishing each AWS Support Plan, and finally AWS Marketplace. (1 hour 15 minutes)",
      "Migration and Innovation: Examining materials related to AWS CAF, six main factors of cloud migration strategy, benefits of various data migration solutions, and the broad scope of innovative solutions offered by AWS. (40 minutes)",
      "The Cloud Journey: Explaining the five pillars of the AWS Well-Architected Framework and six benefits of cloud computing. (40 minutes)",
      "AWS Certified Cloud Practitioner Fundamentals: Exploring resources for AWS Certified Cloud Practitioner exam preparation as well as the benefits of becoming an AWS certified person. (1 hour 30 minutes)"
    ],
    evaluation: ["Final class exam"],
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "VPC", "IAM", "CloudWatch", "Cloud Architecture", "AWS Well-Architected Framework", "AWS Certified Cloud Practitioner", "Generative AI"],
    level: "Beginner",
    duration: "13 Hours",
    certificateId: "0LZ06QMGNZ65",
    validUntil: "May 17, 2027",
    link: "https://www.dicoding.com/certificates/0LZ06QMGNZ65",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },  
  {
    title: "Machine Learning Implementation with Google Cloud",
    issuer: "Dicoding Indonesia",
    date: "December 8, 2024",
    description: 
      "This class is designed for students who want to learn machine learning implementation using cloud computing, especially Google Cloud, according to industry standards.",
    detailedDescription:
      "This class is designed for students who want to learn machine learning implementation using cloud computing, especially Google Cloud, according to industry standards. At the end of the class, students are able to build machine learning applications and perform deployment using Google Cloud.",
    courseMaterials: [
      "Managing TensorFlow Models in Production Environment: understanding the management of machine learning models from TensorFlow for various production environments, such as web, server, and other devices like Android. (3 hours 45 minutes)",
      "Training and Deployment of Machine Learning on Google Cloud: You will be guided to understand various applications of machine learning on Google Cloud starting from using Google Cloud CLI as a tool, utilizing Compute Engine for training and deployment of models to App Engine for machine learning application deployment. (9 hours 35 minutes)",
      "Optimizing Data Storage with Google Cloud: understanding in depth the use of data services from Google Cloud including Cloud Storage and Firestore for machine learning application data storage. (4 Hours 20 minutes)",
      "Case Study: Building Machine Learning Applications with Google Cloud: learning how to build machine learning applications with Google Cloud as the environment. This module is packaged with a fictional story from a company called Serta Mulia so you can find real machine learning applications based on a story. (9 hours 55 minutes)",
      "Exploring Machine Learning Through Vertex AI: understanding Google Cloud's special AI service called Vertex AI which offers various tools for machine learning model development, from development to machine learning operations (MLOps). (2 hours 45 minutes)"
    ],
    evaluation: ["Final class exam", "Submission (final project) in the form of implementing Google Cloud services for a cloud-based machine learning application"],
    skills: ["Machine Learning", "Google Cloud", "TensorFlow", "Vertex AI", "Google Cloud CLI", "Compute Engine", "App Engine", "Cloud Storage", "Firestore", "MLOps", "Model Deployment"],
    level: "Advanced",
    duration: "40 Hours",
    certificateId: "NVP74D16GPR0",
    validUntil: "December 8, 2027",
    link: "https://www.dicoding.com/certificates/NVP74D16GPR0",
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
              <span className="rainbow-text">Certificates & Achievements</span>
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
                      <Interactive3DCard className="h-full">
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
