import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { EditIcon, EllipsisIcon, TrashIcon } from 'lucide-react'
import { useI18n } from '~/hooks/use-i18n'
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { MouseEvent } from 'react'

type ActionDropdownMenuProps = DropdownMenuProps & {
  onEdit?: (e: MouseEvent<HTMLDivElement>) => void
  onDelete?: (e: MouseEvent<HTMLDivElement>) => void
}
export function ActionDropdownMenu({ onEdit, onDelete, ...props }: ActionDropdownMenuProps) {
  const { t } = useI18n()

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEdit}>
          <EditIcon /> {t('components.action-dropdown-menu.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <TrashIcon /> {t('components.action-dropdown-menu.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
