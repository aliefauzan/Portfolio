import Hero from "@/components/hero"
import About from "@/components/about"
import ExperienceEducation from "@/components/experience-education"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Tools from "@/components/tools"
import GCPBadges from "@/components/gcp-badges"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ExperienceEducation />
      <Projects />
      <Certificates />
      <GCPBadges />
      <Tools />
      <Contact />
      <Footer />
    </main>
  )
}
