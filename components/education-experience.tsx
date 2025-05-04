"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Briefcase, Award, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducationExperience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education-experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Education & <span className="text-primary">Experience</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Experience
                </TabsTrigger>
              </TabsList>

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
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-semibold">Achievements</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Dean's List - 3 consecutive semesters</li>
                        <li>Programming Competition Finalist - 2023</li>
                        <li>Technical Writing Award - 2022</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center my-6">
                  <div className="h-px flex-1 bg-border"></div>
                  <div className="px-4 text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Additional Education</span>
                  </div>
                  <div className="h-px flex-1 bg-border"></div>
                </div>

                <div className="grid gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <CardTitle className="text-lg">Google Cloud Certification</CardTitle>
                            <CardDescription>Google Cloud Platform</CardDescription>
                          </div>
                          <Badge variant="outline">2024</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Completed certification in Google Cloud architecture and services, focusing on cloud
                        infrastructure and deployment strategies.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="rounded-full p-2 bg-primary/10">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <CardTitle className="text-lg">Docker and Kubernetes Fundamentals</CardTitle>
                            <CardDescription>Online Course</CardDescription>
                          </div>
                          <Badge variant="outline">2023</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Mastered containerization with Docker and orchestration with Kubernetes for modern application
                        deployment.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <div className="relative border-l-2 border-primary pl-8 space-y-8">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>

                  <Card className="hover:shadow-md transition-shadow">
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
                        <li>Collaborated with cross-functional teams to deliver a capstone project</li>
                        <li>Received mentorship from industry professionals in cloud architecture</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-xl">Cloud Computing Intern</CardTitle>
                          <CardDescription>Virtual Internship Program • June 2024 – August 2024</CardDescription>
                        </div>
                        <Badge>Tech Company</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Assisted in designing and implementing cloud-based solutions for clients</li>
                        <li>Configured and maintained cloud infrastructure using GCP services</li>
                        <li>Participated in code reviews and contributed to documentation</li>
                        <li>Optimized existing cloud resources for better performance and cost efficiency</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="text-center mt-8">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      Open to New Opportunities
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
