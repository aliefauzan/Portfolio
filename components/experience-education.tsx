"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { GraduationCap, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card"

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
  <span className="relative inline-block"> {/* Wrapper for text and underline */}
    Experience & <span className="rainbow-text">Education</span>
    <motion.div
      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
      initial={{ width: "0%" }}
      animate={inView ? { width: "100%" } : { width: "0%" }}
      transition={{ duration: 0.8, delay: 0.3 }}
    ></motion.div>
  </span>
</h2>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gradient-to-r from-muted to-muted/50">
                <TabsTrigger 
                  value="experience" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <Briefcase className="h-4 w-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <GraduationCap className="h-4 w-4" />
                  Education
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience">
                <div className="relative border-l-2 border-primary pl-8 pb-8">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0 floating-animation"></div>

                  <Interactive3DCard glowEffect={true}>
                    <Card className="mb-8 relative overflow-hidden border-0 shadow-lg">
                      {/* Holographic border wrapper */}
                      <div className="holographic-border">
                        <div className="bg-card rounded-lg">
                          <CardHeader>
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <CardTitle className="text-xl rainbow-text">
                                  <span className="text-primary">Bangkit Academy Cloud Computing Cohort</span>
                                </CardTitle>
                                <CardDescription className="mt-2">September 2024 – January 2025</CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                                Google, Gojek, Tokopedia, Traveloka
                              </Badge>
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
                        </div>
                      </div>
                    </Card>
                  </Interactive3DCard>

                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Badge variant="outline" className="text-lg px-4 py-2 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:text-white transition-all duration-300">
                        Open to New Opportunities
                      </Badge>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <Interactive3DCard glowEffect={true}>
                  <Card className="relative overflow-hidden border-0 shadow-lg">
                    {/* Holographic border wrapper */}
                    <div className="holographic-border">
                      <div className="bg-card rounded-lg">
                        <CardHeader className="flex flex-row items-start gap-4">
                          <motion.div 
                            className="rounded-full p-2 bg-gradient-to-br from-blue-400 to-purple-500"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <GraduationCap className="h-8 w-8 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <CardTitle className="text-xl rainbow-text"><span className="text-primary">Bachelor of Informatics</span></CardTitle>
                                <CardDescription className="mt-2">Telkom University</CardDescription>
                              </div>
                              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                                2022 - Present
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <span className="font-semibold">GPA:</span> 
                            <span className="ml-2 font-bold text-lg bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                              3.64 / 4.00
                            </span>
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
                      </div>
                    </div>
                  </Card>
                </Interactive3DCard>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
