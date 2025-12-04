import { useFormContext } from "react-hook-form";
import { Label } from "@/shared/shadcn/ui/label";
import { Input } from "@/shared/shadcn/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/shadcn/ui/field";
import { cn } from "@/shared/lib/utils";

interface FormInputProps extends Omit<React.ComponentProps<typeof Input>, "name"> {
	name: string;
	label: string;
	required?: boolean;
	showError?: boolean;
}

/**
 * Universal form input component that uses react-hook-form's FormProvider
 * Validation is handled by zod schema via resolver, not inline
 * 
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <FormInput 
 *     name="email" 
 *     label="Email" 
 *     type="email"
 *     required
 *   />
 * </FormProvider>
 * ```
 */
export const FormInput = ({
	name,
	label,
	required = false,
	showError = true,
	className,
	...inputProps
}: FormInputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext<Record<string, unknown>>();

	const error = errors[name];
	const fieldId = inputProps.id || name;

	return (
		<Field>
			<FieldLabel>
				<Label htmlFor={fieldId}>
					{label}
					{required && <span className="text-destructive ml-1">*</span>}
				</Label>
			</FieldLabel>
			<Input
				id={fieldId}
				{...register(name)}
				{...inputProps}
				className={cn(className, error && "border-destructive")}
				aria-invalid={error ? "true" : "false"}
			/>
			{showError && error && <FieldError>{error.message as string}</FieldError>}
		</Field>
	);
};

