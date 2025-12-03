import { Outlet } from "react-router-dom";
import { QueryParamsProvider } from "../providders/query-params-provider";

export const Layout = () => {
	return (
		<QueryParamsProvider>
			<div className="flex min-h-screen flex-col">
				<Outlet />
			</div>
		</QueryParamsProvider>
	);
};
