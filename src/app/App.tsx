import { Suspense } from "react";
import "./css/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
	return (
		<div className="min-h-dvh w-full">
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</div>
	);
}

export default App;
