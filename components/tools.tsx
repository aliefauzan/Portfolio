"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb } from "lucide-react"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card"

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
  if (proficiency >= 85) return "bg-gradient-to-r from-green-400 to-green-600"
  if (proficiency >= 75) return "bg-gradient-to-r from-blue-400 to-blue-600"
  if (proficiency >= 65) return "bg-gradient-to-r from-yellow-400 to-yellow-600"
  return "bg-gradient-to-r from-gray-400 to-gray-600"
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
<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center rainbow-text">
        <span className="relative inline-block"> {/* Wrapper for text and underline */}
          Languages & <span className="text-primary">Tools</span>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }} // Make sure 'inView' is correctly set up for this section
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </span>
      </h2>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 holographic-border border-transparent bg-gradient-to-r from-background/80 to-primary/10">
              <TabsTrigger value="technical" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-pink-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">Technical Skills</TabsTrigger>
              <TabsTrigger value="soft" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-pink-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">Soft Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="technical">
              <div className="grid gap-8">
                {toolsData.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold mb-4 text-primary border-b border-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 pb-2">{category.category}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.items.map((tool, toolIndex) => (
                        <motion.div
                          key={toolIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: toolIndex * 0.1 + categoryIndex * 0.2 }}
                          className="floating"
                          style={{ animationDelay: `${(toolIndex * 0.1 + categoryIndex * 0.2)}s` }}
                        >
                          <Interactive3DCard>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex flex-col h-full holographic-border border-transparent bg-gradient-to-br from-background/80 to-primary/10 rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                            >
                              <div className="flex items-center mb-3">
                                <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 rounded-md flex items-center justify-center mr-3 transition-all duration-300 iridescent-glow">
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
                                      <motion.div
                                        className={`h-full ${getProficiencyColor(tool.proficiency)} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${tool.proficiency}%` } : { width: 0 }}
                                        transition={{ duration: 1, delay: toolIndex * 0.1 + categoryIndex * 0.2 + 0.5 }}
                                      ></motion.div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="self-start mt-auto text-xs border-primary/30 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 transition-all duration-300">
                                {getProficiencyLevel(tool.proficiency)}
                              </Badge>
                            </a>
                          </Interactive3DCard>
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
                    className="floating"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Interactive3DCard className="h-full">
                      <div className="holographic-border border-transparent bg-gradient-to-br from-background/80 to-primary/10 rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 h-full group">
                        <div className="flex items-start h-full">
                          <div className="mr-3 mt-1 p-2 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 transition-all duration-300 iridescent-glow">
                            <Lightbulb className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                        </div>
                      </div>
                    </Interactive3DCard>
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
