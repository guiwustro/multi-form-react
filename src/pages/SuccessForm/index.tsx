import { Link } from "react-router-dom";
import MultiStep from "../../components/MultiStep";
import { Container } from "./styles";
import { Box, Button, Paper, Typography } from "@mui/material";

const SuccessForm = () => {
	return (
		<Container>
			<Paper
				sx={{
					padding: 4,
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography>Your form has been successfully submitted.</Typography>
				<Link to="/">
					<Button variant="outlined">Go back and create a new form! </Button>
				</Link>
			</Paper>
		</Container>
	);
};

export default SuccessForm;
