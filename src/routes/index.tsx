import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SuccessForm from "../pages/SuccessForm";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/success-form" element={<SuccessForm />} />
		</Routes>
	);
};
