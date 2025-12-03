import cloneDeepWith from 'lodash/cloneDeepWith'

import type { OutputValue } from './types'

export const replaceNullWithUndefined = <Query>(
  query: Query
): OutputValue<Query> => {
  return cloneDeepWith(query, (value) => {
    if (value === null) {
      return
    }

    return value
  })
}
