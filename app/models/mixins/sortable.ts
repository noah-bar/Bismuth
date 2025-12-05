import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { LucidModel } from '@adonisjs/lucid/types/model'
import { scope } from '@adonisjs/lucid/orm'
import string from '@adonisjs/core/helpers/string'

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

        if (sortColumn.includes('.')) {
          const [relation, relatedColumn] = sortColumn.split('.')
          const model = query.model

          const relationInstance = model.$getRelation(relation)
          if (!relationInstance) return

          const relatedModel = relationInstance.relatedModel()
          const relatedTable = relatedModel.table
          const currentTable = model.table

          let foreignKey: string
          let localKey: string

          if (relationInstance.type === 'belongsTo') {
            foreignKey = relationInstance.foreignKey
            localKey = relatedModel.primaryKey
          } else {
            return
          }

          const joinAlias = `${relation}_sort`
          const foreignKeySnakeCase = string.snakeCase(foreignKey)
          const relatedColumnSnakeCase = string.snakeCase(relatedColumn)

          query
            .leftJoin(
              `${relatedTable} as ${joinAlias}`,
              `${currentTable}.${foreignKeySnakeCase}`,
              `${joinAlias}.${localKey}`
            )
            .orderBy(`${joinAlias}.${relatedColumnSnakeCase}`, sortDirection)
            .select(`${currentTable}.*`)
        } else {
          query.orderBy(sortColumn, sortDirection)
        }
      })
    }

    return ModelWithSortable
  }
}
