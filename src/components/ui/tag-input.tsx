import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  suggestions?: string[]
  maxTags?: number
  allowDuplicates?: boolean
  delimiter?: string | RegExp
  validateTag?: (tag: string) => boolean | string
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      suggestions = [],
      maxTags,
      allowDuplicates = false,
      delimiter = ',',
      validateTag,
      placeholder = 'Add tag...',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledTags, setUncontrolledTags] = React.useState<string[]>(defaultValue)
    const [inputValue, setInputValue] = React.useState('')
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(-1)

    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const isControlled = controlledValue !== undefined
    const tags = isControlled ? controlledValue : uncontrolledTags

    const filteredSuggestions = React.useMemo(() => {
      if (!inputValue.trim() || suggestions.length === 0) return []
      const lowerInput = inputValue.toLowerCase()
      return suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(lowerInput) &&
          (allowDuplicates || !tags.includes(suggestion))
      )
    }, [inputValue, suggestions, tags, allowDuplicates])

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setUncontrolledTags(newTags)
      }
      onChange?.(newTags)
    }

    const addTag = (tagValue: string) => {
      const trimmedTag = tagValue.trim()
      if (!trimmedTag) return false

      // Check max tags
      if (maxTags && tags.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`)
        return false
      }

      // Check duplicates
      if (!allowDuplicates && tags.includes(trimmedTag)) {
        setError('Tag already exists')
        return false
      }

      // Validate tag
      if (validateTag) {
        const validationResult = validateTag(trimmedTag)
        if (validationResult !== true) {
          setError(typeof validationResult === 'string' ? validationResult : 'Invalid tag')
          return false
        }
      }

      setError(null)
      updateTags([...tags, trimmedTag])
      return true
    }

    const removeTag = (index: number) => {
      if (disabled) return
      const newTags = tags.filter((_, i) => i !== index)
      updateTags(newTags)
      setError(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      setShowSuggestions(true)
      setSelectedSuggestionIndex(-1)
      setError(null)

      // Check for delimiter
      if (delimiter) {
        const parts = typeof delimiter === 'string'
          ? value.split(delimiter)
          : value.split(delimiter)

        if (parts.length > 1) {
          const newTags = parts.slice(0, -1).filter((part) => part.trim())
          newTags.forEach((tag) => addTag(tag))
          setInputValue(parts[parts.length - 1])
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
            if (addTag(filteredSuggestions[selectedSuggestionIndex])) {
              setInputValue('')
              setShowSuggestions(false)
              setSelectedSuggestionIndex(-1)
            }
          } else if (inputValue.trim()) {
            if (addTag(inputValue)) {
              setInputValue('')
            }
          }
          break
        case 'Backspace':
          if (!inputValue && tags.length > 0) {
            removeTag(tags.length - 1)
          }
          break
        case 'ArrowDown':
          if (filteredSuggestions.length > 0) {
            e.preventDefault()
            setSelectedSuggestionIndex((prev) =>
              prev < filteredSuggestions.length - 1 ? prev + 1 : 0
            )
          }
          break
        case 'ArrowUp':
          if (filteredSuggestions.length > 0) {
            e.preventDefault()
            setSelectedSuggestionIndex((prev) =>
              prev > 0 ? prev - 1 : filteredSuggestions.length - 1
            )
          }
          break
        case 'Escape':
          setShowSuggestions(false)
          setSelectedSuggestionIndex(-1)
          break
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      if (addTag(suggestion)) {
        setInputValue('')
        setShowSuggestions(false)
        inputRef.current?.focus()
      }
    }

    const handleContainerClick = () => {
      inputRef.current?.focus()
    }

    // Close suggestions on click outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowSuggestions(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
      <div ref={containerRef} className="relative">
        <div
          onClick={handleContainerClick}
          className={cn(
            'flex flex-wrap items-center gap-2 min-h-11 w-full border-3 border-input bg-background px-3 py-2',
            'shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition-all duration-200',
            'focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-destructive',
            className
          )}
        >
          {/* Tags */}
          {tags.map((tag, index) => (
            <span
              key={`tag-${index}`}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
                'border-2 border-foreground bg-primary text-primary-foreground',
                'shadow-[2px_2px_0px_hsl(var(--shadow-color))]'
              )}
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTag(index)
                  }}
                  className="hover:bg-primary-foreground/20 rounded-sm p-0.5 transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled}
            className={cn(
              'flex-1 min-w-[120px] bg-transparent outline-none text-sm',
              'placeholder:text-muted-foreground disabled:cursor-not-allowed'
            )}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            className={cn(
              'absolute z-50 mt-1 w-full',
              'border-3 border-foreground bg-popover',
              'shadow-[4px_4px_0px_hsl(var(--shadow-color))]'
            )}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm transition-colors',
                  'hover:bg-muted',
                  index === selectedSuggestionIndex && 'bg-accent'
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
TagInput.displayName = 'TagInput'

export { TagInput }
