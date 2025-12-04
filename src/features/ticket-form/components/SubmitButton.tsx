import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/shadcn/ui/button";

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
	children: React.ReactNode;
}

/**
 * Atomic component for form submit button
 * Uses useFormContext to access form state - no form props needed
 * Blocks button if form was submitted and has validation errors
 */
export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
	const {
		formState: { isSubmitting, isSubmitted, isValid, errors },
	} = useFormContext();

	// Block button if:
	// 1. Form is currently submitting, OR
	// 2. Form was submitted (attempted) and has validation errors
	const hasErrors = Object.keys(errors).length > 0;
	const shouldDisable = isSubmitting || (isSubmitted && !isValid && hasErrors);

	return (
		<Button type="submit" disabled={shouldDisable} {...props}>
			{isSubmitting ? "Saving..." : children}
		</Button>
	);
};
