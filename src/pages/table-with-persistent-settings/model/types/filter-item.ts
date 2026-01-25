import type { TableWithPersistentSettingsStatus } from "../const/status-options"

export interface TableWithPersistentSettingsItem {
	id: number
	name: string
	budget: number
	cost: number
	views: number
	clicks: number
	ctr: number
	cpc: number
	orders: number
	client_name?: string
	status: TableWithPersistentSettingsStatus
	created_at: string
}
