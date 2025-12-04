import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypographyH1 } from "@/shared/components/typography";
import {
	TicketTitle,
	TicketDescription,
	TicketPriority,
	CustomField,
	SubmitButton,
} from "@/features/ticket-form";
import { FieldSet } from "@/shared/shadcn/ui/field";
import { Button } from "@/shared/shadcn/ui/button";
import { SuccessMessage } from "@/shared/components/success-message";
import { customTicketFormSchema, type CustomTicketFormData } from "./model/form/schema";

export const CreateCustomTicketPage = () => {
	const [isSuccess, setIsSuccess] = useState(false);

	const methods = useForm<CustomTicketFormData>({
		resolver: zodResolver(customTicketFormSchema),
		defaultValues: {
			title: "",
			description: "",
			priority: "high",
			customReason: "",
			urgencyLevel: "",
		},
	});

	const onCustomSubmit = async (data: CustomTicketFormData) => {
		console.log("Creating CUSTOM ticket with special logic:", data);

		await new Promise((resolve) => setTimeout(resolve, 500));

		setIsSuccess(true);
		methods.reset();

		setTimeout(() => {
			setIsSuccess(false);
		}, 5000);
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<TypographyH1 className="mb-6 text-destructive">Emergency / Custom Ticket</TypographyH1>
			<div className="max-w-2xl">
				{isSuccess && (
					<SuccessMessage
						message="Custom ticket submitted successfully! Your request is under review."
						className="mb-6"
					/>
				)}

				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onCustomSubmit)}
						className="space-y-6 rounded-lg border bg-muted/50 p-6"
					>
						<FieldSet>
							<div className="rounded-md border bg-background p-4">
								<TicketPriority />
							</div>

							<TicketTitle />

							<CustomField
								name="customReason"
								label="Why is this a custom ticket?"
								type="textarea"
								placeholder="Explain why this ticket requires special handling..."
								required
							/>

							<CustomField
								name="urgencyLevel"
								label="Urgency Level"
								type="text"
								placeholder="e.g., Critical, High Impact, etc."
							/>

							<TicketDescription />
						</FieldSet>

						<div className="flex justify-end gap-4">
							<Button type="button" variant="outline" onClick={() => methods.reset()}>
								Reset
							</Button>
							<SubmitButton variant="default">Submit for Review</SubmitButton>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
