import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypographyH1 } from "@/shared/components/typography";
import { TicketTitle, TicketDescription, SubmitButton } from "@/features/ticket-form";
import { FieldSet } from "@/shared/shadcn/ui/field";
import { SuccessMessage } from "@/shared/components/success-message";
import { ticketFormSchema, type TicketFormData } from "./model/form/schema";

export const CreateTicketPage = () => {
	const [isSuccess, setIsSuccess] = useState(false);

	const methods = useForm<TicketFormData>({
		resolver: zodResolver(ticketFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const onSubmit = async (data: TicketFormData) => {
		console.log("Creating standard ticket:", data);

		await new Promise((resolve) => setTimeout(resolve, 500));

		setIsSuccess(true);
		methods.reset();

		setTimeout(() => {
			setIsSuccess(false);
		}, 5000);
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6">Create Ticket</TypographyH1>
			<div className="max-w-2xl">
				{isSuccess && (
					<SuccessMessage
						message="Ticket created successfully! Your request has been submitted."
						className="mb-6"
					/>
				)}

				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<FieldSet>
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
