import { FormInput } from "@/shared/components/form-input";

/**
 * Atomic component for ticket title input
 * Uses useFormContext to access form state - no props needed
 * Validation is handled by zod schema via resolver
 */
export const TicketTitle = () => {
	return <FormInput name="title" label="Title" required />;
};
