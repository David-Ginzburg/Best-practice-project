import { useFormContext } from "react-hook-form";
import { Label } from "@/shared/shadcn/ui/label";
import { Field, FieldLabel, FieldError } from "@/shared/shadcn/ui/field";
import { cn } from "@/shared/lib/utils";

/**
 * Atomic component for ticket description textarea
 * Uses useFormContext to access form state - no props needed
 * Validation is handled by zod schema via resolver
 */
export const TicketDescription = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<{ description: string }>();

	return (
		<Field>
			<FieldLabel>
				<Label htmlFor="description">
					Description
					<span className="text-destructive ml-1">*</span>
				</Label>
			</FieldLabel>
			<textarea
				id="description"
				{...register("description")}
				className={cn(
					"flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
					"placeholder:text-muted-foreground",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"disabled:cursor-not-allowed disabled:opacity-50",
					errors.description && "border-destructive ring-destructive/20"
				)}
				aria-invalid={errors.description ? "true" : "false"}
			/>
			{errors.description && <FieldError>{errors.description.message}</FieldError>}
		</Field>
	);
};
