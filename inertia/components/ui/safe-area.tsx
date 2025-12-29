import { ReactNode } from 'react'

export type SafeAreaProps = {
  children?: ReactNode,
  className?: string
}

export function SafeArea({ children, className }: SafeAreaProps) {
  const styles: React.CSSProperties = {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  }

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  )
}
