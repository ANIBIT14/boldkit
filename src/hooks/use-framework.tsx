import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Framework = 'react' | 'vue'

interface FrameworkContextType {
  framework: Framework
  setFramework: (framework: Framework) => void
}

const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined)

const STORAGE_KEY = 'boldkit-framework'

export function FrameworkProvider({ children }: { children: ReactNode }) {
  const [framework, setFrameworkState] = useState<Framework>(() => {
    // Check localStorage on initial load
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'vue' || stored === 'react') {
        return stored
      }
    }
    return 'react'
  })

  const setFramework = (newFramework: Framework) => {
    setFrameworkState(newFramework)
    localStorage.setItem(STORAGE_KEY, newFramework)
  }

  // Sync with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'vue' || stored === 'react') {
      setFrameworkState(stored)
    }
  }, [])

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  )
}

export function useFramework() {
  const context = useContext(FrameworkContext)
  if (context === undefined) {
    throw new Error('useFramework must be used within a FrameworkProvider')
  }
  return context
}

// Framework icons as reusable components
export const ReactIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
  </svg>
)

export const VueIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M2 3h3.5L12 15l6.5-12H22L12 22 2 3m4.5 0h3L12 8l2.5-5h3L12 13 6.5 3z"/>
  </svg>
)

// Reusable framework toggle component
export function FrameworkToggle({ size = 'default' }: { size?: 'default' | 'sm' }) {
  const { framework, setFramework } = useFramework()

  const buttonClass = size === 'sm'
    ? 'px-2 py-1 text-xs gap-1'
    : 'px-3 py-1.5 text-sm gap-1.5'

  const iconClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'

  return (
    <div className="inline-flex border-3 border-foreground bg-background">
      <button
        onClick={() => setFramework('react')}
        className={`flex items-center font-bold transition-colors ${buttonClass} ${
          framework === 'react' ? 'bg-primary' : 'hover:bg-muted'
        }`}
        title="Switch to React"
      >
        <ReactIcon className={iconClass} /> React
      </button>
      <button
        onClick={() => setFramework('vue')}
        className={`flex items-center font-bold transition-colors border-l-3 border-foreground ${buttonClass} ${
          framework === 'vue' ? 'bg-success' : 'hover:bg-muted'
        }`}
        title="Switch to Vue"
      >
        <VueIcon className={iconClass} /> Vue
      </button>
    </div>
  )
}
