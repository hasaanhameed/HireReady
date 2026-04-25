import * as React from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--error-bg': 'var(--sienna)',
          '--error-text': 'var(--warm-white)',
          '--error-border': 'var(--sienna)',
          '--success-bg': 'var(--sienna)',
          '--success-text': 'var(--warm-white)',
          '--success-border': 'var(--sienna)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
