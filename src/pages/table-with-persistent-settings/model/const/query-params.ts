import {
	StringParam,
	NumberParam,
	withDefault,
	createEnumParam,
} from 'use-query-params'
import { TABLE_WITH_PERSISTENT_SETTINGS_STATUSES } from './status-options'

export const tableWithPersistentSettingsQueryParamsConfig = {
	page: withDefault(NumberParam, 1),
	page_size: withDefault(NumberParam, 10),
	search: withDefault(StringParam, ''),
	sort_by: StringParam,
	sort_direction: createEnumParam(['asc', 'desc']),
	status: withDefault(
		createEnumParam(Object.values(TABLE_WITH_PERSISTENT_SETTINGS_STATUSES) as string[]),
		'all'
	),
} as const