import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type AppLogoProps = HTMLAttributes<HTMLDivElement>
export function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <div className={cn('w-full flex items-center justify-center gap-2', className)} {...props}>
      <img src={'/logo-96x96.webp'} alt={'Bismuth logo'} className={'h-8'} />
      <span className={'text-2xl font-semibold'}>Bismuth</span>
    </div>
  )
}
