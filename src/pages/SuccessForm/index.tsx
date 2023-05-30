import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "./styles";

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
