import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { scope } from '@adonisjs/lucid/orm'

export function withSearchable(searchableColumns: string[]) {
  return <T extends NormalizeConstructor<LucidModel>>(superclass: T) => {
    class ModelWithSearchable extends superclass {
      static search = scope((query: any, term?: string) => {
        if (!term) return

        query.where((builder: any) => {
          searchableColumns.forEach((column, index) => {
            if (column.includes('.')) {
              const [relation, relatedColumn] = column.split('.')

              if (index === 0) {
                builder.whereHas(relation, (relatedQuery: any) => {
                  relatedQuery.where(relatedColumn, 'LIKE', `%${term}%`)
                })
              } else {
                builder.orWhereHas(relation, (relatedQuery: any) => {
                  relatedQuery.where(relatedColumn, 'LIKE', `%${term}%`)
                })
              }
            } else {
              if (index === 0) {
                builder.where(column, 'LIKE', `%${term}%`)
              } else {
                builder.orWhere(column, 'LIKE', `%${term}%`)
              }
            }
          })
        })
      })
    }

    return ModelWithSearchable
  }
}
