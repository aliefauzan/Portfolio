"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code2, Database, Cloud, Server, Languages, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card"
import GlareHover from "@/components/ui/GlareHover"

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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="relative inline-block rainbow-text">
              My Skills
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
            </span>
          </h2>
          
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and soft skills developed through education, professional experience, and continuous learning.
          </p>          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Interactive3DCard>
              <GlareHover
                glareColor="#3b82f6"
                glareOpacity={0.15}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={800}
                background="transparent"
                borderColor="transparent"
                className="w-full h-full"
              >
                <Card className="holographic-border border-transparent bg-gradient-to-br from-background/80 to-primary/10 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code2 className="mr-2 h-5 w-5 text-primary" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {technicalSkills.map((skill, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-primary font-bold">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </GlareHover>
            </Interactive3DCard>

            <Interactive3DCard>
              <GlareHover
                glareColor="#8b5cf6"
                glareOpacity={0.15}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={800}
                background="transparent"
                borderColor="transparent"
                className="w-full h-full"
              >
                <Card className="holographic-border border-transparent bg-gradient-to-br from-background/80 to-primary/10 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {softSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center p-3 rounded-md bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-blue-500/20 transition-all duration-300 cursor-pointer group"
                        >
                          <span className="font-medium group-hover:text-primary transition-colors">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </GlareHover>
            </Interactive3DCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Database,
                title: "Backend Development",
                description: "Experienced in building robust backend systems with Golang and JavaScript"
              },
              {
                icon: Cloud,
                title: "Cloud Computing",
                description: "Proficient in Google Cloud Platform services and architecture"
              },
              {
                icon: Server,
                title: "DevOps",
                description: "Skilled in Docker, containerization, and deployment workflows"
              },
              {
                icon: Languages,
                title: "Languages",
                description: "Fluent in English and Bahasa Indonesia for effective communication"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <Interactive3DCard className="h-full">
                  <GlareHover
                    glareColor="#06b6d4"
                    glareOpacity={0.12}
                    glareAngle={-30}
                    glareSize={180}
                    transitionDuration={700}
                    background="transparent"
                    borderColor="transparent"
                    className="w-full h-full"
                  >
                    <Card className="holographic-border border-transparent bg-gradient-to-br from-background/80 to-primary/10 hover:shadow-xl transition-all duration-300 h-full group">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 transition-all duration-300 mb-4 iridescent-glow">
                          <item.icon className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-muted-foreground flex-grow">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </GlareHover>
                </Interactive3DCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
