# Project that contains all the best frontend practice

## Frontend Architecture

- **MANDATORY** in frontend always use @Feature-Sliced approach
- all the business logic should be in hooks not in the components

## Recent Changes

- **Table with Persistent Settings**: Added TanStack Table grouping: state (grouping, expanded) in the same Zustand store with getGroupedRowModel/getExpandedRowModel; group toggle in header (Layers icon), expand/collapse in body; aggregation (sum/mean/uniqueCount) on columns for grouped rows. Table state (column visibility, order, sorting, grouping, expanded) is fully controlled by TanStack Table API and persisted in localStorage.
- Refactored to page-first approach in Feature-Sliced Design architecture
- Reorganized ticket-list page structure according to FSD: model/hooks and ui folders
- All business logic moved to model/hooks, UI components in ui folder
- Created entities layer for ticket domain model
- Refactored ticket table to use DataTable (TanStack Table) with column configuration
- Added Parallax page with CSS-only parallax scroll effect demonstration

## Feature-Sliced Design Structure

### Entities Layer (`/src/entities/`)

Business entities and domain models.

#### Ticket Entity (`/src/entities/ticket/`)

- **Model** (`/model/`):
  - `types.ts` - Ticket types and interfaces (Ticket, TicketStatus, TicketPriority, TicketFilters)
- **API** (`/api/`):
  - `mock-data.ts` - Mock data generation for tickets
- **Lib** (`/lib/`):
  - `status-utils.ts` - Utility functions for status and priority formatting (getStatusColor, getStatusLabel, getPriorityColor, getPriorityLabel)

### Pages Layer (`/src/pages/`)

Page components following page-first approach. Each page contains its own features and widgets.

#### Ticket List Page (`/src/pages/ticket-list/`)

- `TicketListPage.tsx` - Page component that composes UI components
- **Model** (`/model/`):
  - **Hooks** (`/hooks/`):
    - `use-ticket-list.ts` - Hook for filtering and managing ticket list
    - `use-ticket-list-params.ts` - Hook for managing query parameters (filters and pagination)
    - `use-ticket-list-query-params-config.ts` - Configuration for query parameters
- **UI** (`/ui/`):
  - `TicketList.tsx` - Main component that composes all UI components and uses hooks
  - `ticket-filters.tsx` - Filters component for search, status, and priority
  - `ticket-table.tsx` - DataTable component using TanStack Table with column configuration
  - `ticket-list-info.tsx` - Information component showing ticket counts

#### Table with Persistent Settings Page (`/src/pages/table-with-persistent-settings/`)

- **TableWithPersistentSettingsPage.tsx** - Page component using shared `TableWithPersistentSettings` with a Zustand-persisted table store.
- **Model** (`/model/`):
  - **Store** (`/store/`): `table-settings-store.ts` - Zustand store with persist middleware for `columnVisibility`, `columnOrder`, `sorting`, `grouping`, `expanded`; setters accept TanStack `Updater<T>` (see `functionalUpdate` in shared component).
  - **Hooks**: `use-table-with-persistent-settings-list.ts` (data + filters from URL), `use-table-settings-sync-url.ts` (sync store sorting ↔ URL `sort_by`/`sort_direction`), `use-search-params-pagination`, `use-infinity-scroll`.
- **Shared component** `TableWithPersistentSettings`: receives `tableStore` (state + setters), passes them to `useReactTable` as controlled state and handlers for visibility, order, sorting, grouping, expanded. Uses `getGroupedRowModel`, `getExpandedRowModel`; header has group toggle (per column), body renders grouped rows with expand/collapse and aggregated cells. Columns settings UI uses table API. Pagination and infinity scroll are passed as optional config.

#### Parallax Page (`/src/pages/parallax/`)

- `ParallaxPage.tsx` - Page component demonstrating CSS-only parallax scroll effect
- `parallax.css` - CSS styles implementing parallax effect using 3D transforms (`perspective`, `translateZ`, `transform-style: preserve-3d`)
- Effect achieved through different scroll speeds for background layers using negative `translateZ` values

## Architecture Principles

1. **Page-First Approach**: Features and widgets are scoped to their respective pages
2. **Separation of Concerns**: Business logic is separated from UI components
3. **Testability**: Hooks can be tested independently from UI components
4. **Maintainability**: Clear structure makes it easy to find and modify code
5. **Isolation**: Each page is self-contained with its own features and widgets

## Page-First Structure

Following Feature-Sliced Design page-first approach:

```
pages/
  ticket-list/
    TicketListPage.tsx      # Page component
    model/
      hooks/                # Business logic hooks
        use-ticket-list.ts
        use-ticket-list-params.ts
        use-ticket-list-query-params-config.ts
    ui/                     # UI components
      TicketList.tsx        # Main composition component
      ticket-filters.tsx
      ticket-table.tsx
      ticket-list-info.tsx
```

This ensures that:

- All business logic is in model/hooks
- All UI components are in ui folder
- Clear separation between logic and presentation
- Page is self-contained with its own model and UI
- Easier to understand dependencies and relationships
