import { type ColumnDef } from '@tanstack/react-table'
import type { TableWithPersistentSettingsItem } from '../types/filter-item'
import { TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG } from './status-options'

export const TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_NAME = 'table-with-persistent-settings-columns-settings'
export const TABLE_WITH_PERSISTENT_SETTINGS_COLUMNS_STORAGE_VERSION = 2

export const tableWithPersistentSettingsColumns = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => <div className="font-mono">{row.getValue('id')}</div>,
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div>{row.getValue('name')}</div>,
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'budget',
		header: 'Budget',
		cell: ({ row }) => {
			const value = row.getValue('budget') as number
			return <div className="text-right">{value.toLocaleString('en-US')} ₽</div>
		},
		aggregationFn: 'sum',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toLocaleString('en-US')} ₽</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'cost',
		header: 'Spent',
		cell: ({ row }) => {
			const value = row.getValue('cost') as number
			return <div className="text-right">{value.toLocaleString('en-US')} ₽</div>
		},
		aggregationFn: 'sum',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toLocaleString('en-US')} ₽</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'views',
		header: 'Views',
		cell: ({ row }) => {
			const value = row.getValue('views') as number
			return <div className="text-right">{value.toLocaleString('en-US')}</div>
		},
		aggregationFn: 'sum',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toLocaleString('en-US')}</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'clicks',
		header: 'Clicks',
		cell: ({ row }) => {
			const value = row.getValue('clicks') as number
			return <div className="text-right">{value.toLocaleString('en-US')}</div>
		},
		aggregationFn: 'sum',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toLocaleString('en-US')}</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'ctr',
		header: 'CTR',
		cell: ({ row }) => {
			const value = row.getValue('ctr') as number
			return <div className="text-right">{value.toFixed(2)}%</div>
		},
		aggregationFn: 'mean',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toFixed(2)}%</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'cpc',
		header: 'CPC',
		cell: ({ row }) => {
			const value = row.getValue('cpc') as number
			return <div className="text-right">{value.toFixed(2)} ₽</div>
		},
		aggregationFn: 'mean',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toFixed(2)} ₽</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'orders',
		header: 'Orders',
		cell: ({ row }) => {
			const value = row.getValue('orders') as number
			return <div className="text-right">{value.toLocaleString('en-US')}</div>
		},
		aggregationFn: 'sum',
		aggregatedCell: ({ getValue }) => (
			<div className="text-right">{(getValue() as number).toLocaleString('en-US')}</div>
		),
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'client_name',
		header: 'Client',
		cell: ({ row }) => {
			const value = row.getValue('client_name') as string | undefined
			return <div>{value || '-'}</div>
		},
		aggregationFn: 'uniqueCount',
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as keyof typeof TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG
			const config = TABLE_WITH_PERSISTENT_SETTINGS_STATUS_CONFIG[status]
			return (
				<span className={config?.color || ''}>
					{config?.label || status}
				</span>
			)
		},
		aggregationFn: 'uniqueCount',
		enableSorting: true,
		enableGrouping: true,
	},
	{
		accessorKey: 'created_at',
		header: 'Created date',
		cell: ({ row }) => {
			const value = row.getValue('created_at') as string
			return <div>{new Date(value).toLocaleDateString('en-US')}</div>
		},
		enableSorting: true,
		enableGrouping: true,
	},
] as const satisfies ColumnDef<TableWithPersistentSettingsItem>[]
