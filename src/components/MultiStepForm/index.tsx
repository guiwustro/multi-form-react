/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { Percent } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useSectionContext } from "../../contexts/SectionContext";
import { NestedArray } from "./NestedFieldArray";
import {
	AddButton,
	ButtonContainer,
	DateContainer,
	FieldsContainer,
	FormContainer,
	IntervalContainer,
	NumberInput,
	SubmitButton,
} from "./styles";

interface IInterval {
	startDate: string;
	endDate: string;
}

export interface ISection {
	interval: IInterval[];
	valueType: string;
	amount?: number;
}

export interface FormData {
	data: ISection[];
}

interface IMultiStepFormProps {
	handleNext: () => void;
}

const MultiStepForm = ({ handleNext }: IMultiStepFormProps) => {
	const { updateSections, sections } = useSectionContext();
	const validationSchema = yup.object().shape({
		data: yup.array().of(
			yup.object().shape({
				valueType: yup.string().required("required field"),
				amount: yup
					.number()
					.typeError("Required field")
					.required("required field")
					.positive("Must be a positive number"),
				interval: yup.array().of(
					yup.object().shape({
						startDate: yup.string().required("required field"),
						endDate: yup.string().required("required field"),
					})
				),
			})
		),
	});

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			data: sections,
		},
		resolver: yupResolver(validationSchema),
	});
	const { fields, remove } = useFieldArray({
		control,
		name: "data",
	});

	const onSubmit = (infoForm: FormData) => {
		updateSections(infoForm.data);
		handleNext();
	};

	useEffect(() => {
		const formDataSections = localStorage.getItem("formData");
		if (formDataSections) {
			updateSections(JSON.parse(formDataSections));
			setValue("data", JSON.parse(formDataSections));
		}
	}, [setValue]);

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<FieldsContainer>
				{fields.map((field, index) => (
					<IntervalContainer
						sx={{
							"& .MuiTextField-root": { my: 1, width: "100%" },
						}}
						key={field.id}
					>
						<Typography variant="h5" component="h3">
							Section {index + 1}
						</Typography>
						<Box>
							<NestedArray
								nestIndex={index}
								errors={errors?.data?.[index]?.interval}
								{...{ control, register }}
							/>
						</Box>
						<DateContainer>
							<FormControl sx={{ my: 1, width: "100%", zIndex: 0 }}>
								<InputLabel
									sx={{ background: "white" }}
									error={!!errors?.data?.[index]?.valueType}
								>
									Value Type
								</InputLabel>
								<Select
									{...register(`data.${index}.valueType`)}
									error={!!errors?.data?.[index]?.valueType}
									value={field.valueType}
									onChange={(event) => {
										const oldData = [...getValues().data];
										oldData[index].valueType = event.target.value;
										setValue("data", oldData);
									}}
								>
									<MenuItem value="fixed">Fixed</MenuItem>
									<MenuItem value="percentage">Percentage</MenuItem>
								</Select>
								{!!errors?.data?.[index]?.valueType && (
									<FormHelperText error>Required field</FormHelperText>
								)}
							</FormControl>
							<NumberInput
								InputLabelProps={{ style: { zIndex: 0 } }}
								label="Amount"
								type="number"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{field.valueType === "percentage" && (
												<Percent fontSize="inherit" />
											)}
										</InputAdornment>
									),
								}}
								error={!!errors?.data?.[index]?.amount}
								helperText={
									!!errors?.data?.[index]?.amount &&
									errors?.data?.[index]?.amount?.message
								}
								{...register(`data.${index}.amount`)}
							/>
						</DateContainer>
						{fields.length > 1 && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "end",
									marginRight: "42px",
									marginTop: "20px",
								}}
							>
								<Button color="error" onClick={() => remove(index)}>
									Delete section
								</Button>
							</Box>
						)}
					</IntervalContainer>
				))}
			</FieldsContainer>
			<ButtonContainer>
				<AddButton
					variant="outlined"
					color="primary"
					onClick={() =>
						setValue("data", [
							...getValues().data,
							{
								amount: 0,
								valueType: "",
								interval: [
									{
										endDate: "",
										startDate: "",
									},
								],
							},
						])
					}
				>
					Add New Form
				</AddButton>
				<SubmitButton variant="contained" color="primary" type="submit">
					Save
				</SubmitButton>
			</ButtonContainer>
		</FormContainer>
	);
};

export default MultiStepForm;
