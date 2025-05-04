"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, CheckCircle2 } from "lucide-react"

// Define the GCP badges data
const gcpBadges = [
  {
    category: "Completion Badges",
    items: [
      {
        name: "Application Development on Cloud Run",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png", // This is a placeholder, we'll use a section of the image
        date: "December 2024",
        type: "Completion Badge",
      },
      {
        name: "Elastic Google Cloud Infrastructure: Scaling and Automation",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "November 2024",
        type: "Completion Badge",
      },
      {
        name: "Using DevSecOps in Google Cloud Environment",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "November 2024",
        type: "Completion Badge",
      },
      {
        name: "Observability in Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "October 2024",
        type: "Completion Badge",
      },
      {
        name: "Developing a Google SRE Culture",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "October 2024",
        type: "Completion Badge",
      },
      {
        name: "Getting Started with Terraform for Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "September 2024",
        type: "Completion Badge",
      },
      {
        name: "Essential Google Cloud Infrastructure: Foundation",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "September 2024",
        type: "Completion Badge",
      },
      {
        name: "Google Cloud Fundamentals: Core Infrastructure",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "August 2024",
        type: "Completion Badge",
      },
      {
        name: "Getting Started with Google Kubernetes Engine",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "August 2024",
        type: "Completion Badge",
      },
      {
        name: "Logging and Monitoring in Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "July 2024",
        type: "Completion Badge",
      },
      {
        name: "Essential Google Cloud Infrastructure: Core Services",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "July 2024",
        type: "Completion Badge",
      },
      {
        name: "Preparing for Your Associate Cloud Engineering",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "June 2024",
        type: "Completion Badge",
      },
    ],
  },
  {
    category: "Skill Badges",
    items: [
      {
        name: "Prepare Data for ML APIs on Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "December 2024",
        type: "Skill Badge - Introductory",
        area: "Smart Analytics",
      },
      {
        name: "Monitor and Log with Google Cloud Observability",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "November 2024",
        type: "Skill Badge - Introductory",
        area: "Infrastructure Modernization",
      },
      {
        name: "Set Up an App Dev Environment on Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "October 2024",
        type: "Skill Badge - Introductory",
        area: "Infrastructure Modernization",
      },
      {
        name: "Implement Load Balancing on Compute Engine",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "October 2024",
        type: "Skill Badge - Introductory",
        area: "Infrastructure Modernization",
      },
      {
        name: "Implement DevOps Workflows in Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "September 2024",
        type: "Skill Badge - Intermediate",
        area: "Application Modernization",
      },
      {
        name: "Build a Secure Google Cloud Network",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "August 2024",
        type: "Skill Badge - Intermediate",
        area: "Security",
      },
      {
        name: "Build Infrastructure with Terraform on Google Cloud",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "July 2024",
        type: "Skill Badge - Intermediate",
        area: "Infrastructure Modernization",
      },
      {
        name: "Develop Your Google Cloud Network",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1dqf2cxkZD0kctbnTUIikAYumxtGY.png",
        date: "June 2024",
        type: "Skill Badge - Intermediate",
        area: "Infrastructure Modernization",
      },
    ],
  },
]

export default function GCPBadges() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="gcp-badges" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Google Cloud <span className="text-primary">Badges</span>
            </h2>
          </div>

          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Showcasing my expertise and achievements in Google Cloud Platform technologies through official Google Cloud
            badges and certifications.
          </p>

          <Tabs defaultValue="completion" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="completion">Completion Badges</TabsTrigger>
              <TabsTrigger value="skill">Skill Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="completion">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gcpBadges[0].items.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="bg-muted/30 rounded-lg p-4 mb-4 flex items-center justify-center">
                          <div className="relative w-12 h-12">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt={badge.name}
                              fill
                              className="object-contain"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {badge.name}
                        </h3>
                        <div className="mt-auto pt-2 flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit text-xs">
                            {badge.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{badge.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skill">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gcpBadges[1].items.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="bg-muted/30 rounded-lg p-4 mb-4 flex items-center justify-center">
                          <div className="relative w-12 h-12">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt={badge.name}
                              fill
                              className="object-contain"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                              <Award className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {badge.name}
                        </h3>
                        <div className="mt-auto pt-2 flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit text-xs">
                            {badge.type}
                          </Badge>
                          <Badge variant="secondary" className="w-fit text-xs">
                            {badge.area}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{badge.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
