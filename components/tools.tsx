"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb } from "lucide-react"

// Define the tools with their icons, names, URLs, and proficiency levels
const toolsData = [
  {
    category: "Programming Languages",
    items: [
      {
        name: "Golang",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
        url: "https://golang.org",
        proficiency: 85,
      },
      {
        name: "C++",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
        url: "https://www.w3schools.com/cpp/",
        proficiency: 75,
      },
      {
        name: "JavaScript",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        proficiency: 80,
      },
      {
        name: "Python",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        url: "https://www.python.org",
        proficiency: 70,
      },
      {
        name: "Java",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        url: "https://www.java.com",
        proficiency: 65,
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      {
        name: "Google Cloud",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
        url: "https://cloud.google.com",
        proficiency: 90,
      },
      {
        name: "Docker",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg",
        url: "https://www.docker.com/",
        proficiency: 85,
      },
      {
        name: "Firebase",
        icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        url: "https://firebase.google.com/",
        proficiency: 80,
      },
      {
        name: "Git",
        icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
        url: "https://git-scm.com/",
        proficiency: 85,
      },
    ],
  },
  {
    category: "Frameworks & Services",
    items: [
      {
        name: "Node.js",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
        url: "https://nodejs.org",
        proficiency: 75,
      },
      {
        name: "Express",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
        url: "https://expressjs.com",
        proficiency: 70,
      },
      {
        name: "Flask",
        icon: "https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg",
        url: "https://flask.palletsprojects.com/",
        proficiency: 65,
      },
      {
        name: "Vertex AI",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
        url: "https://cloud.google.com/vertex-ai",
        proficiency: 75,
      },
    ],
  },
  {
    category: "Tools & Utilities",
    items: [
      {
        name: "Postman",
        icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        url: "https://postman.com",
        proficiency: 80,
      },
      {
        name: "MySQL",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
        url: "https://www.mysql.com/",
        proficiency: 75,
      },
      {
        name: "Cloud SQL",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
        url: "https://cloud.google.com/sql",
        proficiency: 80,
      },
      {
        name: "Cloud Run",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
        url: "https://cloud.google.com/run",
        proficiency: 85,
      },
    ],
  },
]

// Soft skills data
const softSkills = [
  {
    name: "Leadership",
    description: "Leading teams and projects to successful outcomes",
  },
  {
    name: "Growth Mindset",
    description: "Embracing challenges and continuous learning",
  },
  {
    name: "Critical Thinking",
    description: "Analyzing problems and finding effective solutions",
  },
  {
    name: "Information Sharing",
    description: "Effectively communicating complex technical concepts",
  },
  {
    name: "Problem-solving",
    description: "Identifying issues and implementing solutions",
  },
  {
    name: "Teamwork",
    description: "Collaborating effectively in diverse teams",
  },
  {
    name: "Effective Communication",
    description: "Clear and concise verbal and written communication",
  },
  {
    name: "Time Management",
    description: "Prioritizing tasks and meeting deadlines",
  },
  {
    name: "Project Management",
    description: "Planning, executing, and closing projects successfully",
  },
]

// Function to determine the proficiency level text
const getProficiencyLevel = (proficiency: number) => {
  if (proficiency >= 85) return "Expert"
  if (proficiency >= 75) return "Advanced"
  if (proficiency >= 65) return "Intermediate"
  return "Beginner"
}

// Function to determine the proficiency level color
const getProficiencyColor = (proficiency: number) => {
  if (proficiency >= 85) return "bg-green-500"
  if (proficiency >= 75) return "bg-blue-500"
  if (proficiency >= 65) return "bg-yellow-500"
  return "bg-gray-500"
}

export default function Tools() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="tools" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Languages & <span className="text-primary">Tools</span>
          </h2>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="technical">
              <div className="grid gap-8">
                {toolsData.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold mb-4 text-primary border-b pb-2">{category.category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.items.map((tool, toolIndex) => (
                        <motion.div
                          key={toolIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: toolIndex * 0.1 + categoryIndex * 0.2 }}
                        >
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-col h-full bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary/5 group"
                          >
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 flex-shrink-0 bg-muted/50 rounded-md flex items-center justify-center mr-3">
                                <Image
                                  src={tool.icon || "/placeholder.svg"}
                                  alt={tool.name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                  {tool.name}
                                </h4>
                                <div className="flex items-center mt-1">
                                  <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${getProficiencyColor(tool.proficiency)} rounded-full`}
                                      style={{ width: `${tool.proficiency}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="self-start mt-auto text-xs">
                              {getProficiencyLevel(tool.proficiency)}
                            </Badge>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="soft">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
