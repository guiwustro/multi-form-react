import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Form from "../MultiStepForm";
import Summary from "../Summary";
import { useLocation, useNavigate } from "react-router-dom";
import { useSectionContext } from "../../contexts/SectionContext";

const steps = ["Choose your options", "Summary"];

export default function MultiStep() {
	const [activeStep, setActiveStep] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = new URLSearchParams(location.search);
	const { updateSections } = useSectionContext();
	useEffect(() => {
		const stepParam = searchParams.get("step");
		const formDataSections = localStorage.getItem("formData");

		if (formDataSections) {
			updateSections(JSON.parse(formDataSections));
		}
		if (stepParam === "2") {
			setActiveStep(1);
		}
	}, []);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		searchParams.set("step", "2");
		navigate({ search: searchParams.toString() });
	};

	const sendFormToAPI = () => {
		// logic to send 'sections' to the API
		localStorage.removeItem("formData");
		navigate({ pathname: "/success-form" });
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		searchParams.delete("step");

		navigate({ search: searchParams.toString() });
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label) => {
					const stepProps: { completed?: boolean } = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === 0 ? (
				<>
					<Form handleNext={handleNext} />
				</>
			) : (
				<>
					<Summary />
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
							Go back and edit the choices
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						<Button onClick={sendFormToAPI}>
							Complete the form submission
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
}
