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
						<TableRow>
							<TableCell align="center">Intervals</TableCell>
							<TableCell align="center">Amount</TableCell>
							<TableCell align="center">Value Type</TableCell>
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
