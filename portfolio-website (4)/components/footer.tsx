import { Github, Heart, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="#home" className="text-xl font-bold">
              <span className="text-primary">Andi</span> Fauzan
            </Link>
            <p className="text-muted-foreground mt-2">Backend Developer & Cloud Computing Specialist</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="mailto:afindo.mi01@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" /> by Andi Muhammad Alief Fauzan
          </p>
          <p className="mt-2">&copy; {currentYear} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
