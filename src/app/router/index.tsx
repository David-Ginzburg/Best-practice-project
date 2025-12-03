import { CreateTicketPage } from "@/pages/create-ticket";
import { TicketListPage } from "@/pages/ticket-list";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { NotFoundPage } from "../not-found/NotFoundPage";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: "/ticket-list",
				element: <TicketListPage />,
			},
			{
				path: "/create-ticket",
				element: <CreateTicketPage />,
			},
		],
	},
]);
