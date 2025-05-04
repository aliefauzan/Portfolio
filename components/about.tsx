"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Andi Muhammad Alief Fauzan"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg mb-4">
                    As an undergraduate student in Informatics at Telkom University, I am passionate about Backend
                    Development and Cloud Computing, with hands-on experience in deploying scalable solutions using
                    Google Cloud Platform (GCP) and Docker.
                  </p>
                  <p className="text-lg mb-4">
                    As a participant in the Bangkit Academy 2024 Cloud Computing Path, I enhanced my technical expertise
                    and leadership skills through industry-aligned training, certifications, and a capstone project.
                  </p>
                  <p className="text-lg">
                    My goal is to contribute to innovative technology solutions by leveraging my cloud computing and
                    DevOps expertise.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
