/* eslint-disable @typescript-eslint/no-empty-function */
import MultiStepForm from "../components/MultiStepForm";
import { render, screen, fireEvent } from "./utils";

describe("FormComponent", () => {
	test("renders initial form correctly", () => {
		const handleNext = () => {};
		render(<MultiStepForm handleNext={handleNext} />);

		const startDateInput = screen.getByLabelText("Start Date");
		const endDateInput = screen.getByLabelText("End Date");
		const amountInput = screen.getByLabelText("Amount");
		const addButton = screen.getByRole("button", { name: "Add Interval" });
		const saveButton = screen.getByRole("button", { name: "Save" });

		expect(startDateInput).toBeTruthy();
		expect(endDateInput).toBeTruthy();
		expect(amountInput).toBeTruthy();
		expect(addButton).toBeTruthy();
		expect(saveButton).toBeTruthy();
	});
	test("add new form line", () => {
		const handleNext = () => {};
		render(<MultiStepForm handleNext={handleNext} />);

		const addButton = screen.getByRole("button", { name: "Add New Form" });
		fireEvent.click(addButton);

		const startDateInputs = screen.getAllByLabelText("Start Date");
		const endDateInputs = screen.getAllByLabelText("End Date");
		const amountInputs = screen.getAllByLabelText("Amount");
		const addButtons = screen.getAllByRole("button", { name: "Add Interval" });

		// Verify if have 2 same equal forms.
		expect(startDateInputs.length).toBe(2);
		expect(endDateInputs.length).toBe(2);
		expect(amountInputs.length).toBe(2);
		expect(addButtons.length).toBe(2);
	});
});
