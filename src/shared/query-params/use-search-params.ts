import { useCallback, useMemo } from 'react'
import { useQueryParams } from 'use-query-params'

import { PAGE_KEY } from './const'
import { replaceNullWithUndefined } from './replace-null-with-undefined'

import type { InputValue } from './types'
import type {
  QueryParamConfigMapWithInherit,
  QueryParamOptions,
} from 'use-query-params'

export interface UseSearchParametersProps<Config> {
  queryOptions?: QueryParamOptions
  pageKey?: keyof Config
}

export const useSearchParameters = <
  Config extends QueryParamConfigMapWithInherit,
>(
  config: Config,
  { queryOptions, pageKey = PAGE_KEY }: UseSearchParametersProps<Config> = {}
) => {
  const [query, setQuery] = useQueryParams(config, queryOptions)
  const params = useMemo(() => replaceNullWithUndefined(query), [query])

  const setSearchParams = useCallback<(value: InputValue<Config>) => void>(
    (value) => {
      setQuery(value)
    },
    [setQuery]
  )

  const setListSearchParams = useCallback<(value: InputValue<Config>) => void>(
    (value) => {
      setQuery({
        [pageKey]: undefined,
        ...value,
      })
    },
    [pageKey, setQuery]
  )

  return {
    params,
    setListSearchParams,
    setSearchParams,
  }
}
