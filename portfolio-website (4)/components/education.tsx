"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-primary">Education</span>
          </h2>

          <div className="max-w-3xl mx-auto">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
