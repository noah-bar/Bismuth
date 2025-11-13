import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { scope } from '@adonisjs/lucid/orm'

export function withSortable(
  sortableColumns: string[],
  defaultColumn?: string,
  defaultDirection: 'asc' | 'desc' = 'asc'
) {
  return <T extends NormalizeConstructor<LucidModel>>(superclass: T) => {
    class ModelWithSortable extends superclass {
      static sortBy = scope((query: any, column?: string, direction: 'asc' | 'desc' = 'asc') => {
        const sortColumn = column || defaultColumn

        if (!sortColumn || !sortableColumns.includes(sortColumn)) return

        const sortDirection = ['asc', 'desc'].includes(direction) ? direction : defaultDirection
        query.orderBy(sortColumn, sortDirection)
      })
    }

    return ModelWithSortable
  }
}
