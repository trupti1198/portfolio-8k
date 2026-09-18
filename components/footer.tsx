import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="content-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Trupti Kamat</h3>
            <p className="text-sm text-gray-600">
              Product Manager passionate about building user-centric solutions and driving business growth through
              innovative technology.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/projects-cs" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learning-diary" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Learning Diary
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Connect</h4>
            <div className="flex space-x-4">
              <a href="mailto:truptikamat1103@gmail.com" className="text-gray-600 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/trupti-kamat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/truptikamat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Trupti Kamat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
