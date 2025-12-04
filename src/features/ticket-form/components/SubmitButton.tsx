import { useFormContext } from "react-hook-form";
import { Button } from "@/shared/shadcn/ui/button";

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
	children: React.ReactNode;
}

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
	const {
		formState: { isSubmitting, isSubmitted, isValid, errors },
	} = useFormContext();

	const hasErrors = Object.keys(errors).length > 0;
	const shouldDisable = isSubmitting || (isSubmitted && !isValid && hasErrors);

	return (
		<Button type="submit" disabled={shouldDisable} {...props}>
			{isSubmitting ? "Saving..." : children}
		</Button>
	);
};
