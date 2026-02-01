import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t-3 border-foreground bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="https://ik.imagekit.io/fincalfy/304a4c07-8de1-41af-813e-e7556234b973.png"
                alt="BoldKit"
                className="h-6 w-6"
              />
              <span className="font-bold uppercase tracking-wide">BoldKit</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Beta</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              A neubrutalism React component library built on top of shadcn/ui.
            </p>
            <p className="text-xs text-muted-foreground">
              Assets powered by{' '}
              <a
                href="https://vanikya.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                Vanikya.ai
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wide text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link to="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Components
              </Link>
              <Link to="/shapes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shapes
              </Link>
              <Link to="/charts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Charts
              </Link>
              <Link to="/themes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Themes
              </Link>
              <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wide text-sm">Resources</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/ANIBIT14/boldkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/ANIBIT14/boldkit/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Changelog
              </a>
              <a
                href="https://github.com/ANIBIT14/boldkit/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Report an Issue
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-wide text-sm">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:aniruddha@boldkit.dev"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                aniruddha@boldkit.dev
              </a>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/ANIBIT14/boldkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aniruddhaagarwal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-muted-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            MIT License. Open source and free to use.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-destructive">&#9829;</span> by{' '}
            <a
              href="https://www.linkedin.com/in/aniruddhaagarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Aniruddha Agarwal
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
