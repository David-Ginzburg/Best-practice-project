import { SearchFilter } from './search-filter'
import { StatusFilter } from './status-filter'
import { ColumnsSettings } from './columns-settings'

export const TableWithPersistentSettingsFilters = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<div className="mb-6 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SearchFilter isLoading={isLoading} />
				<StatusFilter isLoading={isLoading} />
			</div>
			<div className="flex justify-end">
				<ColumnsSettings />
			</div>
		</div>
	)
}
