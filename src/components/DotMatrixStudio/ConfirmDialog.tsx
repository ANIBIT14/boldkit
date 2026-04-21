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

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        style={{
          background: 'var(--studio-panel)',
          borderColor: 'var(--studio-border)',
          boxShadow: 'var(--studio-shadow)',
          color: '#ffffff',
          maxWidth: '420px',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: '#ffffff', ...sFont, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription style={{ color: '#aaaaaa', ...sFont, fontSize: '11px', lineHeight: 1.6 }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid #444',
              color: '#aaaaaa',
              ...sFont,
              fontSize: '11px',
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              background: destructive ? 'var(--studio-border)' : 'var(--studio-border)',
              border: '3px solid var(--studio-border)',
              color: '#000000',
              fontWeight: 700,
              ...sFont,
              fontSize: '11px',
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
          background: 'var(--studio-panel)',
          borderColor: 'var(--studio-border)',
          boxShadow: 'var(--studio-shadow)',
          color: '#ffffff',
          maxWidth: '380px',
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: '#ffffff', ...sFont, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription style={{ color: '#aaaaaa', ...sFont, fontSize: '11px', lineHeight: 1.6 }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            style={{
              background: 'var(--studio-border)',
              border: '3px solid var(--studio-border)',
              color: '#000000',
              fontWeight: 700,
              ...sFont,
              fontSize: '11px',
            }}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
