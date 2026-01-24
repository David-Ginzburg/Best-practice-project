export type TableWithPersistentSettingsStatus = 'active' | 'paused' | 'finished' | 'draft'

export const TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG: Record<
	TableWithPersistentSettingsStatus,
	{
		label: string
		color: string
	}
> = {
	active: {
		label: 'Active',
		color: 'text-green-600',
	},
	paused: {
		label: 'Paused',
		color: 'text-yellow-600',
	},
	finished: {
		label: 'Finished',
		color: 'text-gray-600',
	},
	draft: {
		label: 'Draft',
		color: 'text-blue-600',
	},
}

export const TABLE_WITH_PERSISTENT_SETTINGS_STATUS_OPTIONS: Array<{
	value: TableWithPersistentSettingsStatus | 'all'
	label: string
}> = [
	{ value: 'all', label: 'All statuses' },
	{ value: 'active', label: TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG.active.label },
	{ value: 'paused', label: TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG.paused.label },
	{ value: 'finished', label: TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG.finished.label },
	{ value: 'draft', label: TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG.draft.label },
]
