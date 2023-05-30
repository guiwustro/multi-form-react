/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import { DateRangeOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { addYears, format, parse } from "date-fns";
import { useState } from "react";
import {
	Control,
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import CalendarWithRangeDates from "../CalendarWithRangeDates";
import { DateRange } from "../CalendarWithRangeDates/DateRanger";
import { DateContainer } from "./styles";

interface INestedFieldArray {
	nestIndex: number;
	control: Control<any, any>;
	register: UseFormRegister<any>;
	errors:
		| Merge<
				FieldError,
				(
					| Merge<
							FieldError,
							FieldErrorsImpl<{ startDate: string; endDate: string }>
					  >
					| undefined
				)[]
		  >
		| undefined;
}

export const NestedArray = ({
	nestIndex,
	control,
	errors,
	register,
}: INestedFieldArray) => {
	const { fields, remove, append, update } = useFieldArray({
		control,
		name: `data[${nestIndex}].interval`,
	});
	const [configCalendar, setConfigCalendar] = useState({
		isOpen: false,
		actualIndex: 0,
		actualKIndex: 0,
	});

	const checkActualCalendar = (k: number) => {
		return (
			configCalendar.actualIndex === nestIndex &&
			configCalendar.actualKIndex === k &&
			configCalendar.isOpen
		);
	};

	const currentDate = new Date();
	const maxDate = addYears(currentDate, 2);

	const setActualCalendar = (k: number) => {
		setConfigCalendar((old) => {
			if (
				old.actualIndex === nestIndex &&
				old.actualKIndex === k &&
				old.isOpen
			) {
				return {
					isOpen: false,
					actualIndex: nestIndex,
					actualKIndex: k,
				};
			}
			return {
				isOpen: true,
				actualIndex: nestIndex,
				actualKIndex: k,
			};
		});
	};

	const handleDayClick = (calendarRange: DateRange, kIndex: number) => {
		update(kIndex, {
			startDate: format(calendarRange.startDate as Date, "EEE, dd MMM yyyy"),
			endDate: format(calendarRange.endDate as Date, "EEE, dd MMM yyyy"),
		});
	};

	return (
		<div>
			{fields.map((item: any, k) => {
				const isOpenCalendar = checkActualCalendar(k);
				let period: DateRange = {
					startDate: undefined,
					endDate: undefined,
				};
				if (item.startDate) {
					const parsedStartDate = parse(
						item.startDate,
						"EEE, dd MMM yyyy",
						new Date()
					);
					const parsedEndDate = parse(
						item.endDate,
						"EEE, dd MMM yyyy",
						new Date()
					);
					period = {
						startDate: parsedStartDate,
						endDate: parsedEndDate,
					};
				}

				return (
					<div key={item.id}>
						<Box sx={{ display: "flex", marginBottom: 1 }}>
							<DateContainer>
								<TextField
									{...register(`data[${nestIndex}].interval[${k}].startDate`)}
									onClick={() => {
										setActualCalendar(k);
									}}
									label="Start Date"
									error={!!errors?.[k]?.startDate}
									helperText={!!errors?.[k]?.startDate && "Required field"}
									style={{ cursor: "pointer" }}
									InputLabelProps={{ style: { zIndex: 0 } }}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRangeOutlined style={{ width: 16 }} />
											</InputAdornment>
										),
										readOnly: true,
									}}
								/>
								<TextField
									{...register(`data[${nestIndex}].interval[${k}].endDate`)}
									onClick={() => {
										setActualCalendar(k);
									}}
									label="End Date"
									error={!!errors?.[k]?.endDate}
									helperText={!!errors?.[k]?.endDate && "Required field"}
									InputLabelProps={{ style: { zIndex: 0 } }}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<DateRangeOutlined style={{ width: 16 }} />
											</InputAdornment>
										),
									}}
								/>
							</DateContainer>
							<Box sx={{ alignItems: "center", display: "flex" }}>
								{fields.length > 1 ? (
									<IconButton
										aria-label="delete"
										type="button"
										size="small"
										onClick={() => remove(k)}
									>
										<DeleteIcon fontSize="medium" />
									</IconButton>
								) : (
									<Box sx={{ marginRight: "30px" }}></Box>
								)}
							</Box>
						</Box>
						{isOpenCalendar && (
							<CalendarWithRangeDates
								openCalendar={configCalendar.isOpen}
								setActualCalendar={() => setActualCalendar(k)}
								handleDayClick={(range: DateRange) => handleDayClick(range, k)}
								selectedDays={period}
								maxDate={maxDate}
							/>
						)}
					</div>
				);
			})}
			<Box sx={{ justifyContent: "end", display: "flex", marginRight: "40px" }}>
				<Button
					type="button"
					onClick={() =>
						append({
							startDate: "",
							endDate: "",
						})
					}
				>
					Add Interval
				</Button>
			</Box>
		</div>
	);
};
