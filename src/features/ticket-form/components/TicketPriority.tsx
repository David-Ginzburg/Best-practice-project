import { useFormContext } from "react-hook-form";
import { Label } from "@/shared/shadcn/ui/label";
import { Field, FieldLabel, FieldError } from "@/shared/shadcn/ui/field";
import { TICKET_PRIORITIES } from "@/entities/ticket/model/const";
import type { TicketPriority as TicketPriorityType } from "@/entities/ticket/model/types";

export const TicketPriority = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<{ priority: TicketPriorityType }>();

	return (
		<Field>
			<FieldLabel>
				<Label htmlFor="priority">Priority</Label>
			</FieldLabel>
			<select
				id="priority"
				{...register("priority")}
				className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
				aria-invalid={errors.priority ? "true" : "false"}
			>
				<option value="">Select priority</option>
				{TICKET_PRIORITIES.map((priority) => (
					<option key={priority} value={priority}>
						{priority.charAt(0).toUpperCase() + priority.slice(1)}
					</option>
				))}
			</select>
			{errors.priority && <FieldError>{errors.priority.message}</FieldError>}
		</Field>
	);
};
