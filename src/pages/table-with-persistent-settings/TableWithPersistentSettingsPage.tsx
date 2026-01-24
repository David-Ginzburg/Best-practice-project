import { useTableWithPersistentSettingsList } from './model'
import { TableWithPersistentSettingsFilters, TableWithPersistentSettingsTable, TableWithPersistentSettingsPagination } from './ui'
import { TypographyH1 } from '@/shared/components/typography'

export const TableWithPersistentSettingsPage = () => {
	const { data, filteredCount, isLoading } = useTableWithPersistentSettingsList()

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Table with persistent settings</TypographyH1>
			<TableWithPersistentSettingsFilters isLoading={isLoading} />
			<TableWithPersistentSettingsTable
				data={data}
				isLoading={isLoading}
			/>
			<TableWithPersistentSettingsPagination totalCount={filteredCount} />
		</div>
	)
}
