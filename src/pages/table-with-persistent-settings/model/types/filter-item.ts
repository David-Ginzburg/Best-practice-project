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
	status: 'active' | 'paused' | 'finished' | 'draft'
	created_at: string
}
