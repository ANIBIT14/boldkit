import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const CACHE_KEY = 'boldkit_github_stars'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

interface CachedData {
  stars: number
  timestamp: number
}

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(() => {
    // Initialize from cache immediately to avoid flash
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const data: CachedData = JSON.parse(cached)
          return data.stars
        }
      } catch {
        // Ignore parsing errors
      }
    }
    return null
  })

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const data: CachedData = JSON.parse(cached)
          const isExpired = Date.now() - data.timestamp > CACHE_DURATION

          if (!isExpired) {
            setStars(data.stars)
            return
          }
        }

        // Fetch fresh data
        const res = await fetch('https://api.github.com/repos/ANIBIT14/boldkit')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        const starCount = data.stargazers_count

        // Update cache
        const cacheData: CachedData = {
          stars: starCount,
          timestamp: Date.now(),
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        setStars(starCount)
      } catch {
        // Keep showing cached value if fetch fails
      }
    }

    fetchStars()
  }, [])

  return (
    <a
      href="https://github.com/ANIBIT14/boldkit"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border-3 border-foreground bg-background px-3 py-1.5 font-bold hover:bg-warning hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_hsl(var(--foreground))] transition-all touch-manipulation"
    >
      <Star className="h-4 w-4 fill-warning stroke-foreground" />
      <span className="text-sm">
        {stars !== null ? stars.toLocaleString() : '—'}
      </span>
      <span className="text-xs text-muted-foreground hidden sm:inline">stars</span>
    </a>
  )
}
