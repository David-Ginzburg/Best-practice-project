import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypographyH1 } from "@/shared/components/typography";
import { TicketTitle, TicketDescription, SubmitButton } from "@/features/ticket-form";
import { FieldSet } from "@/shared/shadcn/ui/field";
import { SuccessMessage } from "@/shared/components/success-message";
import { ticketFormSchema, type TicketFormData } from "./model/form/schema";

/**
 * Standard ticket creation page
 * Composes atomic form components using FormProvider pattern
 * Validation is handled by zod schema via resolver
 */
export const CreateTicketPage = () => {
	const [isSuccess, setIsSuccess] = useState(false);

	// 1. Lifted State - form state is managed at page level
	// 2. Validation via zod resolver
	const methods = useForm<TicketFormData>({
		resolver: zodResolver(ticketFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const onSubmit = async (data: TicketFormData) => {
		console.log("Creating standard ticket:", data);
		// TODO: Implement API call

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Show success message
		setIsSuccess(true);

		// Reset form after success
		methods.reset();

		// Hide success message after 5 seconds
		setTimeout(() => {
			setIsSuccess(false);
		}, 5000);
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Create Ticket</TypographyH1>
			<div className="max-w-2xl">
				{/* Success message */}
				{isSuccess && (
					<SuccessMessage
						message="Ticket created successfully! Your request has been submitted."
						className="mb-6"
					/>
				)}

				{/* 2. FormProvider - provides form context to all child components */}
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<FieldSet>
							{/* 3. Composition - page decides which components to use and in what order */}
							<TicketTitle />
							<TicketDescription />
						</FieldSet>

						<div className="flex justify-end">
							<SubmitButton>Create Ticket</SubmitButton>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
