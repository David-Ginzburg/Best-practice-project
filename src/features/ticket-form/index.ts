/**
 * Ticket Form Feature - Composable Form Components
 * 
 * This feature provides atomic, composable form components that use react-hook-form's
 * FormProvider and useFormContext pattern. Components are "dumb" and don't receive
 * form props - they access form state through context.
 * 
 * Usage:
 * 1. Wrap your form with FormProvider from react-hook-form
 * 2. Compose components on the page level
 * 3. Each page decides which components to use and in what order
 */

export { TicketTitle } from "./components/TicketTitle";
export { TicketDescription } from "./components/TicketDescription";
export { TicketPriority } from "./components/TicketPriority";
export { CustomField } from "./components/CustomField";
export { SubmitButton } from "./components/SubmitButton";

