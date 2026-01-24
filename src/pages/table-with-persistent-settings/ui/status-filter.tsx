import { Field, FieldContent, FieldLabel } from '@/shared/shadcn/ui/field'
import { useTableWithPersistentSettingsSearchParams } from '../model/hooks/use-table-with-persistent-settings-search-params'
import { TABLE_WITH_PERSISTENT_SETTINGS_STATUS_OPTIONS } from '../model/const/status-options'

export const StatusFilter = ({ isLoading }: { isLoading: boolean }) => {
	const { params, setListSearchParams } = useTableWithPersistentSettingsSearchParams()

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setListSearchParams({ status: e.target.value })
	}

	return (
		<Field>
			<FieldLabel>Status</FieldLabel>
			<FieldContent>
				<select
					className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					value={params.status}
					onChange={handleStatusChange}
					disabled={isLoading}
				>
					{TABLE_WITH_PERSISTENT_SETTINGS_STATUS_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</FieldContent>
		</Field>
	)
}
