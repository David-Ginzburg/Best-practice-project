import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
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
	import("@/pages/create-custom-ticket").then((module) => ({
		default: module.CreateCustomTicketPage,
	}))
);

const ParallaxPage = lazy(() =>
	import("@/pages/parallax").then((module) => ({ default: module.ParallaxPage }))
);

export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: "/",
				element: <Navigate to={PATHS.ticketList} replace />,
			},
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
			{
				path: PATHS.parallax,
				element: <ParallaxPage />,
			},
		],
	},
]);
