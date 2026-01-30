import { Button } from '@/components/ui/button'

interface OpenInV0ButtonProps {
  name: string
  className?: string
}

export function OpenInV0Button({ name, className }: OpenInV0ButtonProps) {
  const registryUrl = `https://boldkit.dev/r/${name}.json`
  const v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`

  return (
    <a href={v0Url} target="_blank" rel="noopener noreferrer" className={className}>
      <Button variant="outline" size="sm" className="gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        Open in v0
      </Button>
    </a>
  )
}
