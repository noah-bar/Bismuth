import { CSSProperties, ReactNode } from 'react'

export type SafeAreaProps = {
  children?: ReactNode
  id?: string
  className?: string
}

export function SafeArea({ id, children, className }: SafeAreaProps) {
  const styles: CSSProperties = {
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  }

  return (
    <div id={id} className={className} style={styles}>
      {children}
    </div>
  )
}
