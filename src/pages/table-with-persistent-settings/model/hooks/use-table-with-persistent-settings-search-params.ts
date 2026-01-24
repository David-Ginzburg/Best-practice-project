import { useSearchParameters } from '@/shared/query-params'
import { useTableWithPersistentSettingsQueryParamsConfig } from './use-table-with-persistent-settings-query-params-config'

export const useTableWithPersistentSettingsSearchParams = () => {
	const queryParamsConfig = useTableWithPersistentSettingsQueryParamsConfig()
	
	return useSearchParameters(
		queryParamsConfig,
		{
			pageKey: 'page',
		}
	)
}
