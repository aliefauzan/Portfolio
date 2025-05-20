"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Code, Server, Database, Cloud } from "lucide-react"
import Link from "next/link"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "API Development",
      description: "Building robust and scalable RESTful APIs",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Backend Architecture",
      description: "Designing clean and efficient backend systems",
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Database Design",
      description: "Optimizing database schemas and performance",
    },
    {
      icon: <Cloud className="h-10 w-10 text-primary" />,
      title: "Cloud Infrastructure",
      description: "Setting up and managing cloud services",
    },
  ]

  return (
    <section id="about" className="py-16 relative overflow-hidden bg-gradient-to-r from-background to-muted/20">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2 relative inline-block">
              About <span className="text-primary">Me</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-center mb-12">
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform -translate-x-2 translate-y-2"></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Andi Muhammad Alief Fauzan"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="mt-4">
                <Button variant="outline" size="sm" className="rounded-full border-primary/50 hover:bg-primary/10">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              </Link>
            </div>

            <div className="md:col-span-3 bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-lg">
              <p className="text-lg mb-3">
                <span className="font-medium">Informatics student at Telkom University</span> specializing in
                <span className="text-primary font-medium"> Backend Development</span> and
                <span className="text-primary font-medium"> Cloud Computing</span>. Experienced with GCP and Docker.
              </p>

              <p className="text-lg mb-3">
                Enhanced technical and leadership skills through the{" "}
                <span className="font-medium">Bangkit Academy 2024 Cloud Computing Path</span>, completing
                industry-aligned training and certifications.
              </p>

              <p className="text-lg font-medium">
                Seeking to drive innovation through cloud computing and DevOps expertise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/80 backdrop-blur-sm p-5 rounded-xl border border-primary/10 shadow-md group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
