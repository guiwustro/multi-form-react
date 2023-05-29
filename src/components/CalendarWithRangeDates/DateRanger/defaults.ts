import {
	addDays,
	startOfWeek,
	endOfWeek,
	addWeeks,
	startOfMonth,
	endOfMonth,
	addMonths,
	startOfYear,
	endOfYear,
	addYears,
} from "date-fns";

// eslint-disable-next-line no-unused-vars
import { DefinedRange } from "./types";

export const getDefaultRanges = (
	date: Date,
	locale?: Locale
): DefinedRange[] => [
	{
		label: "Today",
		startDate: date,
		endDate: date,
	},
	{
		label: "Yesterday",
		startDate: addDays(date, -1),
		endDate: addDays(date, -1),
	},
	{
		label: "This week",
		startDate: startOfWeek(date, { locale }),
		endDate: endOfWeek(date, { locale }),
	},
	{
		label: "Last week",
		startDate: startOfWeek(addWeeks(date, -1), { locale }),
		endDate: endOfWeek(addWeeks(date, -1), { locale }),
	},
	{
		label: "The past week",
		startDate: addWeeks(date, -1),
		endDate: date,
	},
	{
		label: "This month",
		startDate: startOfMonth(date),
		endDate: endOfMonth(date),
	},
	{
		label: "Last month",
		startDate: startOfMonth(addMonths(date, -1)),
		endDate: endOfMonth(addMonths(date, -1)),
	},
	{
		label: "This year",
		startDate: startOfYear(date),
		endDate: endOfYear(date),
	},
	{
		label: "Last year",
		startDate: startOfYear(addYears(date, -1)),
		endDate: endOfYear(addYears(date, -1)),
	},
];
