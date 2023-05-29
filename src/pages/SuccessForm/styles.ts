import { Box, styled } from "@mui/material";

export const Container = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 10rem;
	@media screen and (min-width: 1500px) {
		max-width: 1400px;
		margin: 0 auto;
	}
`;
