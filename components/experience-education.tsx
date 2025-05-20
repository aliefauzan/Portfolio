"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExperienceEducation() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience-education" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Experience and <span className="text-primary">Education</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience">
                <div className="relative border-l-2 border-primary pl-8 pb-8">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>

                  <Card className="mb-8 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-xl">Bangkit Academy Cloud Computing Cohort</CardTitle>
                          <CardDescription>September 2024 – January 2025</CardDescription>
                        </div>
                        <Badge>Google, Gojek, Tokopedia, Traveloka</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Completed an intensive program led by Google, Gojek, Tokopedia, Traveloka</li>
                        <li>
                          Focused on advanced cloud computing topics (GCP), backend integration, DevOps workflows, and
                          project management
                        </li>
                        <li>Gained expertise in deploying applications using Docker, Kubernetes, and Terraform</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      Open to New Opportunities
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-xl">Bachelor of Informatics</CardTitle>
                          <CardDescription>Telkom University</CardDescription>
                        </div>
                        <Badge>2022 - Present</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="font-semibold">GPA:</span> 3.64 / 4.00
                    </div>
                    <div>
                      <span className="font-semibold">Relevant Coursework:</span>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Object-Oriented Programming</li>
                        <li>Data Structures</li>
                        <li>Algorithms</li>
                        <li>Software Analysis and Design</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
