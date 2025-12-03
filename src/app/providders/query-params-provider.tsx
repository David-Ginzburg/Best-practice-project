import type { ComponentProps } from 'react'
import qs from 'query-string'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

export const QueryParamsProvider = ({
  children,
  adapter = ReactRouter6Adapter,
  options,
}: Partial<ComponentProps<typeof QueryParamProvider>>) => {
  return (
    <QueryParamProvider
      adapter={adapter}
      options={{
        removeDefaultsFromUrl: true,
        updateType: 'pushIn',
        searchStringToObject: (string) =>
          qs.parse(string, { arrayFormat: 'comma' }),
        objectToSearchString: (object) =>
          qs.stringify(object, { arrayFormat: 'comma' }),
        ...options,
      }}
    >
      {children}
    </QueryParamProvider>
  )
}
