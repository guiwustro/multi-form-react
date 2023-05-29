import enUS from "date-fns/locale/en-US";
import { useState } from "react";
import { DateRange, DateRangePicker } from "./DateRanger";

interface ICalendarWithRangeDatesProps {
	openCalendar: boolean;
	setActualCalendar: () => void;
	handleDayClick: (range: DateRange) => void;
	selectedDays: DateRange;
	maxDate: Date;
}

const CalendarWithRangeDates = ({
	openCalendar,
	setActualCalendar,
	handleDayClick,
	selectedDays,
	maxDate,
}: ICalendarWithRangeDatesProps) => {
	const [dateRange, setDateRange] = useState<DateRange>({
		startDate: selectedDays.startDate,
		endDate: selectedDays.endDate,
	});
	const toggle = () => setActualCalendar();
	return (
		<DateRangePicker
			open={openCalendar}
			toggle={toggle}
			locale={enUS}
			initialDateRange={dateRange}
			maxDate={maxDate}
			onChange={(range) => {
				setDateRange(range);
				if (range.startDate && range.endDate) {
					handleDayClick(range);
					toggle();
				}
			}}
		/>
	);
};

export default CalendarWithRangeDates;
