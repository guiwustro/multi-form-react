import { useSectionContext } from "../../contexts/SectionContext";
import {
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
} from "@mui/material";
import { percentualMask } from "../../utils/mask";
const Summary = () => {
	const { sections } = useSectionContext();

	return (
		<Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
			<Paper sx={{ maxWidth: "600px" }}>
				<Table>
					<TableHead>
						<TableRow sx={{ background: "#dfdfdf" }}>
							<TableCell sx={{ fontWeight: "bold" }} align="center">
								Intervals
							</TableCell>
							<TableCell sx={{ fontWeight: "bold" }} align="center">
								Amount
							</TableCell>
							<TableCell sx={{ fontWeight: "bold" }} align="center">
								Value Type
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sections.map((section, index) => {
							const amount =
								section.valueType === "percentage"
									? percentualMask(section.amount!)
									: section.amount;
							return (
								<TableRow hover key={index}>
									<TableCell>
										{section.interval.map((interval) => (
											<p>{`${interval.startDate} to ${interval.endDate}`}</p>
										))}
									</TableCell>
									<TableCell>{amount}</TableCell>
									<TableCell>{section.valueType}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		</Box>
	);
};

export default Summary;
