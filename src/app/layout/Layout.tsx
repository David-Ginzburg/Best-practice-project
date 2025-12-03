import { Outlet } from "react-router-dom";
import { QueryParamsProvider } from "../providders/query-params-provider";
import { SidebarProvider, SidebarTrigger } from "@/shared/shadcn/ui/sidebar";
import { LayoutSidebar } from "./ui/LayoutSidebar";
import { Suspense } from "react";
import { Spinner } from "@/shared/shadcn/ui/spinner";

export const Layout = () => {
	return (
		<QueryParamsProvider>
			<SidebarProvider>
				<LayoutSidebar />
				<main className="flex flex-1 flex-col">
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger />
					</header>
					<div className="flex-1" style={{ viewTransitionName: "page-content" }}>
						<Suspense
							fallback={
								<div className="h-full w-full flex items-center justify-center">
									<Spinner className="size-10" />
								</div>
							}
						>
							<Outlet />
						</Suspense>
					</div>
				</main>
			</SidebarProvider>
		</QueryParamsProvider>
	);
};
