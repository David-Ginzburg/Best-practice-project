# Project that contains all the best frontend practice

## Frontend Architecture

- **MANDATORY** in frontend always use @Feature-Sliced approach
- all the business logic should be in hooks not in the components

## Recent Changes

- Refactored pages according to Feature-Sliced Design architecture
- Moved all business logic from components to hooks in features layer
- Created entities layer for ticket domain model
- Created features layer with hooks for ticket list functionality
- Created widgets layer for UI composition

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

### Features Layer (`/src/features/`)

Business logic hooks and feature-specific functionality.

#### Ticket List Feature (`/src/features/ticket-list/`)

- **Model** (`/model/`):
  - `use-ticket-filters.ts` - Hook for managing ticket filters using react-hook-form
  - `use-ticket-list.ts` - Hook for filtering and managing ticket list
  - `use-ticket-pagination.ts` - Hook for pagination logic

### Widgets Layer (`/src/widgets/`)

Composition of features and entities into reusable UI blocks.

#### Ticket List Widget (`/src/widgets/ticket-list/`)

- **UI** (`/ui/`):
  - `ticket-filters.tsx` - Filters component
  - `ticket-table.tsx` - Table component for displaying tickets
  - `ticket-pagination.tsx` - Pagination component
  - `ticket-list-info.tsx` - Information component showing ticket counts
- `index.tsx` - Main widget that composes all UI components and uses feature hooks

### Pages Layer (`/src/pages/`)

Page components that compose widgets.

#### Ticket List Page (`/src/pages/ticket-list/`)

- `TicketListPage.tsx` - Page component that uses TicketList widget
- Minimal component that only handles page layout and composition

## Architecture Principles

1. **Separation of Concerns**: Business logic is separated from UI components
2. **Reusability**: Features and widgets can be reused across different pages
3. **Testability**: Hooks can be tested independently from UI components
4. **Maintainability**: Clear structure makes it easy to find and modify code
