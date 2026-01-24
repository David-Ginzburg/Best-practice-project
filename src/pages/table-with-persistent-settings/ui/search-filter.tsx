import { useMemo, type ChangeEvent } from 'react'
import { Field, FieldContent, FieldLabel } from '@/shared/shadcn/ui/field'
import { Input } from '@/shared/shadcn/ui/input'
import debounce from 'lodash/debounce'
import { useTableWithPersistentSettingsSearchParams } from '../model/hooks/use-table-with-persistent-settings-search-params'

export const SearchFilter = ({ isLoading }: { isLoading: boolean }) => {
	const { params, setListSearchParams } = useTableWithPersistentSettingsSearchParams()

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setListSearchParams({ search: value })
			}, 300),	
		[setListSearchParams]
	)

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(e.target.value)
	}

	return (
		<Field>
			<FieldLabel>Search</FieldLabel>
			<FieldContent>
				<Input
					type="text"
					placeholder="Search by name, ID or client..."
					defaultValue={params.search}
					onChange={handleSearchChange}
					disabled={isLoading}
				/>
			</FieldContent>
		</Field>
	)
}
