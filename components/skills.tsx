"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code2, Database, Cloud, Server, Languages, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const technicalSkills = [
  { name: "Golang", level: 85 },
  { name: "C++", level: 75 },
  { name: "Javascript", level: 80 },
  { name: "Google Cloud", level: 90 },
  { name: "Docker", level: 85 },
  { name: "Firebase", level: 80 },
  { name: "Vertex AI", level: 75 },
  { name: "Git", level: 85 },
  { name: "Postman", level: 80 },
]

const softSkills = [
  "Leadership",
  "Growth Mindset",
  "Critical Thinking",
  "Information Sharing",
  "Problem-solving",
  "Teamwork",
  "Effective Communication",
  "Time Management",
  "Project Management",
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gradient-to-r from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-primary">Skills</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code2 className="mr-2 h-5 w-5 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {softSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 rounded-md bg-muted/50 hover:bg-primary/10 transition-colors"
                    >
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Database className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                <p className="text-muted-foreground">
                  Experienced in building robust backend systems with Golang and JavaScript
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Cloud className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cloud Computing</h3>
                <p className="text-muted-foreground">Proficient in Google Cloud Platform services and architecture</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Server className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">DevOps</h3>
                <p className="text-muted-foreground">Skilled in Docker, containerization, and deployment workflows</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Languages className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Languages</h3>
                <p className="text-muted-foreground">
                  Fluent in English and Bahasa Indonesia for effective communication
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
