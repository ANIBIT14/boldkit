import { cva } from 'class-variance-authority'

export const layeredCardVariants = cva('relative', {
  variants: {
    layers: {
      single: '',
      double: '',
      triple: '',
    },
    offset: {
      sm: '',
      default: '',
      lg: '',
    },
    layerColor: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      muted: '',
    },
  },
  defaultVariants: {
    layers: 'double',
    offset: 'default',
    layerColor: 'default',
  },
})
