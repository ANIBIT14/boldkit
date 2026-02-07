import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from the page
  useEffect(() => {
    const elements = document.querySelectorAll('h2[id], h3[id]')
    const items: TocItem[] = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: element.tagName === 'H2' ? 2 : 3,
    }))
    setHeadings(items)

    // Set initial active heading
    if (items.length > 0) {
      setActiveId(items[0].id)
    }
  }, [])

  // Scroll spy logic
  const handleScroll = useCallback(() => {
    if (headings.length === 0) return

    const scrollPosition = window.scrollY + 100 // Offset for header

    // Find the current active heading
    let currentId = headings[0]?.id || ''

    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) {
        const { top } = element.getBoundingClientRect()
        const absoluteTop = top + window.scrollY

        if (absoluteTop <= scrollPosition) {
          currentId = heading.id
        }
      }
    }

    setActiveId(currentId)
  }, [headings])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Header height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('space-y-1', className)} aria-label="Table of contents">
      <p className="font-bold uppercase text-xs tracking-wide text-muted-foreground mb-3">
        On This Page
      </p>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'block w-full text-left py-1 transition-colors hover:text-foreground',
                heading.level === 3 && 'pl-4',
                activeId === heading.id
                  ? 'text-foreground font-medium border-l-2 border-primary pl-3'
                  : 'text-muted-foreground border-l-2 border-transparent pl-3'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
