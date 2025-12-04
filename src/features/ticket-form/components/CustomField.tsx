import { useFormContext } from "react-hook-form";
import { Label } from "@/shared/shadcn/ui/label";
import { Field, FieldLabel, FieldError } from "@/shared/shadcn/ui/field";
import { FormInput } from "@/shared/components/form-input";
import { cn } from "@/shared/lib/utils";

interface CustomFieldProps {
	name: string;
	label: string;
	type?: "text" | "textarea";
	placeholder?: string;
	required?: boolean;
}

/**
 * Atomic component for custom fields (only used in custom ticket form)
 * Uses useFormContext to access form state
 * For text inputs, uses FormInput; for textarea, renders custom textarea
 */
export const CustomField = ({
	name,
	label,
	type = "text",
	placeholder,
	required = false,
}: CustomFieldProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<Record<string, string>>();

	const error = errors[name];

	// Use FormInput for text inputs
	if (type === "text") {
		return (
			<FormInput
				name={name}
				label={label}
				type="text"
				placeholder={placeholder}
				required={required}
			/>
		);
	}

	// Custom textarea (FormInput doesn't support textarea yet)
	// Validation is handled by zod schema via resolver
	// Show asterisk if field is required
	if (type === "textarea") {
		return (
			<Field>
				<FieldLabel>
					<Label htmlFor={name}>
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</Label>
				</FieldLabel>
				<textarea
					id={name}
					{...register(name)}
					placeholder={placeholder}
					className={cn(
						"flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive"
					)}
					aria-invalid={error ? "true" : "false"}
				/>
				{error && <FieldError>{error.message as string}</FieldError>}
			</Field>
		);
	}

	return null;
};
