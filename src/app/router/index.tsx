import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "@/shared/paths";
import { Layout } from "../layout/Layout";
import { NotFoundPage } from "../not-found/NotFoundPage";

const TicketListPage = lazy(() =>
	import("@/pages/ticket-list").then((module) => ({ default: module.TicketListPage }))
);

const CreateTicketPage = lazy(() =>
	import("@/pages/create-ticket").then((module) => ({ default: module.CreateTicketPage }))
);

const CreateCustomTicketPage = lazy(() =>
	import("@/pages/create-custom-ticket").then((module) => ({ default: module.CreateCustomTicketPage }))
);

export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: PATHS.ticketList,
				element: <TicketListPage />,
			},
			{
				path: PATHS.createTicket,
				element: <CreateTicketPage />,
			},
			{
				path: PATHS.createCustomTicket,
				element: <CreateCustomTicketPage />,
			},
		],
	},
]);
