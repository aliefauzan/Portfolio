"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Work <span className="text-primary">Experience</span>
          </h2>

          <div className="max-w-3xl mx-auto">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
