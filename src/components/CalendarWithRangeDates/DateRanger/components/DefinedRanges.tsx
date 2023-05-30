import React from "react";
import {
	List,
	ListItem,
	ListItemText,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { isSameDay, isAfter } from "date-fns";
import { DateRange, DefinedRange } from "../types";

type DefinedRangesProps = {
	// eslint-disable-next-line no-unused-vars
	setRange: (range: DateRange) => void;
	selectedRange: DateRange;
	ranges: DefinedRange[];
	maxDate: Date;
};

const isSameRange = (first: DateRange, second: DateRange) => {
	const { startDate: fStart, endDate: fEnd } = first;
	const { startDate: sStart, endDate: sEnd } = second;
	if (fStart && sStart && fEnd && sEnd) {
		return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
	}
	return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
	ranges,
	setRange,
	selectedRange,
	maxDate,
}: DefinedRangesProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
		defaultMatches: true,
	});

	// const isAfterMaxDate =   isAfter(maxDate, firstMonth)
	return (
		<List
			sx={{
				width: "100%",
				bgcolor: "background.paper",
				flexWrap: "wrap",
				flexDirection: "row",
				display: isMobile ? "flex" : "initial",
			}}
		>
			{ranges.map((range, idx) => (
				<ListItem
					button
					key={idx}
					disabled={
						isAfter(range.startDate, maxDate) &&
						!isSameDay(range.startDate, maxDate)
					}
					onClick={() => {
						// if(isSameMonth(range.endDate, new Date()) && isSameMonth(range.startDate, new Date())){
						// setRange({ ...range, endDate, startDate })
						//   return;
						// }
						const endDate = new Date(range.endDate);
						endDate.setHours(18, 0, 0, 0);

						const startDate = new Date(range.startDate);
						startDate.setHours(4, 0, 0, 0);
						setRange({ ...range, endDate, startDate });
					}}
					sx={[
						isSameRange(range, selectedRange) && {
							backgroundColor: "#6795c9",
							color: "primary.contrastText",
							"&:hover": {
								backgroundColor: "#3475be",
							},
						},
						{
							width: "130px",
							maxHeight: 41,
						},
					]}
				>
					<ListItemText
						primaryTypographyProps={{
							variant: "body2",
							sx: {
								fontWeight: isSameRange(range, selectedRange)
									? "bold"
									: "normal",
							},
						}}
					>
						{range.label}
					</ListItemText>
				</ListItem>
			))}
		</List>
	);
};

export default DefinedRanges;
