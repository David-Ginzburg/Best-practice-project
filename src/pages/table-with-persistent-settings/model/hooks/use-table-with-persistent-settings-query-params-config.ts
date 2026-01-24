import {
	StringParam,
	NumberParam,
	withDefault,
	createEnumParam,
} from 'use-query-params'

export const useTableWithPersistentSettingsQueryParamsConfig = () => {
	return {
		page: withDefault(NumberParam, 1),
		page_size: withDefault(NumberParam, 10),
		search: withDefault(StringParam, ''),
		sort_by: StringParam,
		sort_direction: createEnumParam(['asc', 'desc']),
		status: withDefault(
			createEnumParam(['active', 'paused', 'finished', 'draft', 'all']),
			'all'
		),
	}
}
