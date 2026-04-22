import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

const sFont = { fontFamily: 'var(--studio-font)' }

const PANEL   = '#ffffff'
const BORDER  = '#5b4fcf'
const TEXT    = '#2d2463'
const MUTED   = '#9b94d4'
const TINT    = 'rgba(91,79,207,0.08)'

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        style={{
          background: PANEL,
          border: `3px solid ${BORDER}`,
          boxShadow: `4px 4px 0px rgba(91,79,207,0.3)`,
          color: TEXT,
          maxWidth: '420px',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: TEXT, ...sFont, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription style={{ color: MUTED, ...sFont, fontSize: '12px', lineHeight: 1.7 }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: `1px solid ${BORDER}`,
              color: TEXT,
              ...sFont,
              fontSize: '12px',
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              background: BORDER,
              border: `3px solid ${BORDER}`,
              color: '#ffffff',
              fontWeight: 700,
              ...sFont,
              fontSize: '12px',
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** Lightweight error/info notice inside an AlertDialog */
interface NoticeDialogProps {
  open: boolean
  title: string
  description: string
  onClose: () => void
}

export function NoticeDialog({ open, title, description, onClose }: NoticeDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        style={{
          background: PANEL,
          border: `3px solid ${BORDER}`,
          boxShadow: `4px 4px 0px rgba(91,79,207,0.3)`,
          color: TEXT,
          maxWidth: '380px',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: TEXT, ...sFont, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription style={{ color: MUTED, ...sFont, fontSize: '12px', lineHeight: 1.7 }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            style={{
              background: BORDER,
              border: `3px solid ${BORDER}`,
              color: '#ffffff',
              fontWeight: 700,
              ...sFont,
              fontSize: '12px',
            }}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/** Shared tint helper exported for inline use */
export { TINT as STUDIO_TINT }
