"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Code, Server, Database, Cloud } from "lucide-react"
import Link from "next/link"
import { Interactive3DCard } from "@/components/ui/interactive-3d-card"

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

  // Animation variants for coordinated animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.6,
      },
    },
  }

  const profileVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: 0.8,
      },
    },
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.7,
      },
    },
  }

  return (
    <section id="about" className="py-16 relative overflow-hidden bg-gradient-to-r from-background to-muted/20">
      {/* Animated decorative background elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-purple-500/3 blur-2xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            className="text-center mb-10"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-4xl font-bold mb-2 relative inline-block"
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              About <span className="rainbow-text">Me</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-5 gap-6 items-center mb-12"
            variants={containerVariants}
          >
            <motion.div 
              className="md:col-span-2 flex flex-col items-center"
              variants={profileVariants}
            >
              <motion.div 
                className="relative"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform -translate-x-2 translate-y-2"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div 
                  className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl"
                  whileHover={{
                    borderColor: "hsl(var(--primary))",
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                  }}
                >
                  <Image
                    src="/foto_alief.png?height=200&width=200"
                    alt="Andi Muhammad Alief Fauzan"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Button variant="outline" size="sm" className="rounded-full border-primary/50 hover:bg-primary/10">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                    </motion.div>
                    Resume
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="md:col-span-3"
              variants={textVariants}
            >
              <Interactive3DCard className="rounded-xl p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.p 
                    className="text-lg mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="font-medium">Informatics student at Telkom University</span> specializing in
                    <span className="text-primary font-medium"> Backend Development</span> and
                    <span className="text-primary font-medium"> Cloud Computing</span>. Experienced with GCP and Docker.
                  </motion.p>

                  <motion.p 
                    className="text-lg mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Enhanced technical and leadership skills through the{" "}
                    <span className="font-medium">Bangkit Academy 2024 Cloud Computing Path</span>, completing
                    industry-aligned training and certifications.
                  </motion.p>

                  <motion.p 
                    className="text-lg font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Seeking to drive innovation through cloud computing and DevOps expertise.
                  </motion.p>
                </motion.div>
              </Interactive3DCard>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Interactive3DCard className="h-full">
                  <motion.div 
                    className="p-5 rounded-xl h-full"
                    whileHover={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.1))",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="p-2 rounded-lg bg-primary/10"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          background: "hsl(var(--primary) / 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-lg font-semibold"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {skill.title}
                        </motion.h3>
                        <motion.p 
                          className="text-sm text-muted-foreground"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.05 }}
                        >
                          {skill.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </Interactive3DCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
