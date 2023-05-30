import { styled, Button, TextField, Box } from "@mui/material";

export const FormContainer = styled("form")`
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
`;

export const FieldsContainer = styled("div")`
	display: flex;
	justify-content: space-between;
	margin-left: 2%;
	margin-right: 2%;
	flex-direction: column;
	align-items: center;

	@media screen and (min-width: 1360px) {
		flex-direction: row;
		flex-wrap: wrap;
	}
`;

export const IntervalContainer = styled(Box)`
	border: 1px solid #ccc;
	padding: 1.5rem;
	margin-bottom: 1.5rem;
	max-width: 600px;
`;

export const InputContainer = styled("div")`
	margin-bottom: 1rem;
`;

export const AddButton = styled(Button)`
	margin-top: 1.5rem;
	width: 180px;
`;

export const SubmitButton = styled(Button)`
	margin-top: 1.5rem;
	width: 180px;
`;

export const NumberInput = styled(TextField)`
	& input[type="number"] {
		-moz-appearance: textfield;
	}
	& input[type="number"]::-webkit-outer-spin-button,
	& input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const ButtonContainer = styled(Box)`
	display: flex;
	align-items: end;
	flex-direction: column;
	margin-left: 2%;
	margin-right: 2%;
	flex-direction: column;
`;

export const DateContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	@media screen and (min-width: 540px) {
		flex-direction: row;
		gap: 16px;
	}
`;
