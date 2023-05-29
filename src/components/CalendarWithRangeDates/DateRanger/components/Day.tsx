/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface DayProps {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	disabled?: boolean;
	startOfRange?: boolean;
	endOfRange?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const Day: React.FunctionComponent<DayProps> = ({
	startOfRange,
	endOfRange,
	disabled,
	highlighted,
	outlined,
	filled,
	onClick,
	onHover,
	value,
}: DayProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				// eslint-disable-next-line no-nested-ternary
				borderRadius: startOfRange
					? "50% 0 0 50%"
					: endOfRange
					? "0 50% 50% 0"
					: undefined,

				backgroundColor: () =>
					!disabled && highlighted ? "#E7F3FD" : undefined,
			}}
		>
			<IconButton
				sx={{
					height: "36px",
					width: "36px",
					padding: 0,
					border: (theme) =>
						outlined && !filled
							? `1px solid ${theme.palette.success.main}`
							: undefined,
					...(!disabled && filled
						? {
								"&:hover": {
									backgroundColor: (theme) => theme.palette.primary.dark,
								},
								backgroundColor: (theme) => theme.palette.primary.dark,
						  }
						: {}),
				}}
				disabled={disabled}
				onClick={onClick}
				onMouseOver={onHover}
				// size="large"
			>
				<Typography
					sx={{
						lineHeight: 1.6,
						color: (theme) => {
							if (outlined && !filled) {
								return theme.palette.success.main;
							}
							if (disabled) {
								return theme.palette.text.secondary;
							}
							return filled
								? theme.palette.primary.contrastText
								: highlighted
								? "rgb(74, 144, 226)"
								: theme.palette.text.primary;
						},
					}}
					variant="body2"
				>
					{value}
				</Typography>
			</IconButton>
		</Box>
	);
};

export default Day;
