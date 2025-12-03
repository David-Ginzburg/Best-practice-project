import { useSearchParameters } from './use-search-params'

import type { ExcludeNullish, InputValue, ParameterValue } from './types'
import type { QueryParamConfigMapWithInherit } from 'use-query-params'

export interface UseSearchParamsPaginationProps<Config, Keys> {
  config: Config
  keys: Keys
}

export const useSearchParamsPagination = <
  Config extends QueryParamConfigMapWithInherit,
  Keys extends { pageKey: keyof Config; pageSizeKey: keyof Config },
>({
  config,
  keys,
}: UseSearchParamsPaginationProps<Config, Keys>) => {
  const { params, setSearchParams, setListSearchParams } = useSearchParameters(
    config,
    { pageKey: keys.pageKey }
  )

  const onChange = (
    newPage:
      | ExcludeNullish<ParameterValue<Config[Keys['pageKey']]>>
      | undefined,
    newPageSize:
      | ExcludeNullish<ParameterValue<Config[Keys['pageSizeKey']]>>
      | undefined
  ) => {
    const hasPageSizeChanged = params[keys.pageSizeKey] !== newPageSize

    if (hasPageSizeChanged) {
      return setListSearchParams({
        [keys.pageSizeKey]: newPageSize,
      } as InputValue<Config>)
    }

    const hasPageChanged = params[keys.pageKey] !== newPage

    if (hasPageChanged) {
      return setSearchParams({ [keys.pageKey]: newPage } as InputValue<Config>)
    }
  }

  return {
    onChange,
    page: params[keys.pageKey],
    pageSize: params[keys.pageSizeKey],
  }
}
