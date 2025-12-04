import { QueryClientProvider } from "@tanstack/react-query";
import "./css/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { queryClient } from "@/shared/api/query-client";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-dvh w-full">
				<RouterProvider router={router} />
			</div>
		</QueryClientProvider>
	);
}

export default App;
