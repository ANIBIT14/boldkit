import { createContext, useContext, useId, useState, type ReactNode } from 'react'

export type Framework = 'react' | 'vue' | 'svelte'

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
      if (stored === 'vue' || stored === 'react' || stored === 'svelte') {
        return stored
      }
    }
    return 'react'
  })

  const setFramework = (newFramework: Framework) => {
    setFrameworkState(newFramework)
    localStorage.setItem(STORAGE_KEY, newFramework)
  }

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
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
  </svg>
)

export const VueIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M2 3h3.5L12 15l6.5-12H22L12 22 2 3m4.5 0h3L12 8l2.5-5h3L12 13 6.5 3z"/>
  </svg>
)

export const SvelteIcon = ({ className = 'h-4 w-4' }: { className?: string }) => {
  const maskId = useId()

  return (
    <svg viewBox="0 0 107 128" className={className} fill="none" aria-hidden="true">
      <mask id={maskId} maskUnits="userSpaceOnUse">
        <rect width="107" height="128" fill="#fff" />
        <path
          d="M45.8171,106.5815A20.7182,20.7182,0,0,1,23.58,98.3389a19.1739,19.1739,0,0,1-3.2766-14.5025,18.1886,18.1886,0,0,1,.6233-2.4357l.4912-1.4978,1.3363.9815a33.6443,33.6443,0,0,0,10.203,5.0978l.9694.2941-.0893.9675a5.8474,5.8474,0,0,0,1.052,3.8781,6.2389,6.2389,0,0,0,6.6952,2.485,5.7449,5.7449,0,0,0,1.6021-.7041L69.27,76.281a5.4306,5.4306,0,0,0,2.4506-3.631,5.7948,5.7948,0,0,0-.9875-4.3712,6.2436,6.2436,0,0,0-6.6978-2.4864,5.7427,5.7427,0,0,0-1.6.7036l-9.9532,6.3449a19.0329,19.0329,0,0,1-5.2965,2.3259,20.7181,20.7181,0,0,1-22.2368-8.2427,19.1725,19.1725,0,0,1-3.2766-14.5024,17.9885,17.9885,0,0,1,8.13-12.0513L55.8833,23.7472a19.0038,19.0038,0,0,1,5.3-2.3287A20.7182,20.7182,0,0,1,83.42,29.6611a19.1739,19.1739,0,0,1,3.2766,14.5025,18.4,18.4,0,0,1-.6233,2.4357l-.4912,1.4978-1.3356-.98a33.6175,33.6175,0,0,0-10.2037-5.1l-.9694-.2942.0893-.9675a5.8588,5.8588,0,0,0-1.052-3.878,6.2389,6.2389,0,0,0-6.6952-2.485,5.7449,5.7449,0,0,0-1.6021.7041L37.73,51.719a5.4218,5.4218,0,0,0-2.4487,3.63,5.7862,5.7862,0,0,0,.9856,4.3717,6.2437,6.2437,0,0,0,6.6978,2.4864,5.7652,5.7652,0,0,0,1.602-.7041l9.9519-6.3425a18.978,18.978,0,0,1,5.2959-2.3278,20.7181,20.7181,0,0,1,22.2368,8.2427,19.1725,19.1725,0,0,1,3.2766,14.5024,17.9977,17.9977,0,0,1-8.13,12.0532L51.1167,104.2528a19.0038,19.0038,0,0,1-5.3,2.3287"
          fill="#000"
        />
      </mask>
      <path
        d="M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157"
        fill="#fff"
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}

export const frameworkLabels: Record<Framework, string> = {
  react: 'React',
  vue: 'Vue 3',
  svelte: 'Svelte',
}

export const frameworkCliNames: Record<Framework, string> = {
  react: 'shadcn',
  vue: 'shadcn-vue',
  svelte: 'shadcn-svelte',
}

export const frameworkRegistryPaths: Record<Framework, string> = {
  react: '/r',
  vue: '/r/vue',
  svelte: '/r/svelte',
}

export const frameworkActiveClasses: Record<Framework, string> = {
  react: 'bg-secondary text-secondary-foreground',
  vue: 'bg-success',
  svelte: 'bg-primary',
}

export const frameworkBadgeVariants: Record<Framework, 'secondary' | 'success' | 'default'> = {
  react: 'secondary',
  vue: 'success',
  svelte: 'default',
}

export const frameworkBadgeClasses: Record<Framework, string> = {
  react: '',
  vue: '',
  svelte: '',
}

export function FrameworkIcon({ framework, className }: { framework: Framework; className?: string }) {
  if (framework === 'vue') return <VueIcon className={className} />
  if (framework === 'svelte') return <SvelteIcon className={className} />
  return <ReactIcon className={className} />
}

// Reusable framework toggle component
export function FrameworkToggle({ size = 'default', variant = 'horizontal' }: { size?: 'default' | 'sm'; variant?: 'horizontal' | 'compact' }) {
  const { framework, setFramework } = useFramework()

  const iconClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  // Compact variant - icon-only buttons in a row (for sidebar)
  if (variant === 'compact') {
    return (
      <div className="inline-flex border-3 border-foreground bg-background">
        <button
          onClick={() => setFramework('react')}
          className={`flex items-center justify-center p-1.5 transition-colors ${
            framework === 'react' ? frameworkActiveClasses.react : 'hover:bg-muted'
          }`}
          title="React"
          aria-label="Switch to React"
        >
          <ReactIcon className={iconClass} />
        </button>
        <button
          onClick={() => setFramework('vue')}
          className={`flex items-center justify-center p-1.5 transition-colors border-l-3 border-foreground ${
            framework === 'vue' ? 'bg-success' : 'hover:bg-muted'
          }`}
          title="Vue"
          aria-label="Switch to Vue"
        >
          <VueIcon className={iconClass} />
        </button>
        <button
          onClick={() => setFramework('svelte')}
          className={`flex items-center justify-center p-1.5 transition-colors border-l-3 border-foreground ${
            framework === 'svelte' ? frameworkActiveClasses.svelte : 'hover:bg-muted'
          }`}
          title="Svelte"
          aria-label="Switch to Svelte"
        >
          <SvelteIcon className={iconClass} />
        </button>
      </div>
    )
  }

  // Default horizontal variant with text labels
  const buttonClass = size === 'sm'
    ? 'px-2 py-1 text-xs gap-1'
    : 'px-3 py-1.5 text-sm gap-1.5'

  return (
    <div className="inline-flex border-3 border-foreground bg-background">
      <button
        onClick={() => setFramework('react')}
        className={`flex items-center font-bold transition-colors ${buttonClass} ${
          framework === 'react' ? frameworkActiveClasses.react : 'hover:bg-muted'
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
      <button
        onClick={() => setFramework('svelte')}
        className={`flex items-center font-bold transition-colors border-l-3 border-foreground ${buttonClass} ${
          framework === 'svelte' ? frameworkActiveClasses.svelte : 'hover:bg-muted'
        }`}
        title="Switch to Svelte"
      >
        <SvelteIcon className={iconClass} /> Svelte
      </button>
    </div>
  )
}
