import { useSearchParameters } from '@/shared/query-params'
import { tableWithPersistentSettingsQueryParamsConfig } from '../const/query-params'

export const useTableWithPersistentSettingsSearchParams = () => {	
	return useSearchParameters(
		tableWithPersistentSettingsQueryParamsConfig,
		{
			pageKey: 'page',
		}
	)
}
