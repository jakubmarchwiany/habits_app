import { Box, Slider } from "@mui/material";
import { useState } from "react";

const stepValues = [31, 62, 93, 182, 365];

const marks = stepValues.map((value) => ({
	value,
	label: value.toString()
}));

type Props = {
	nDaysFrom: number;
	setNDaysFrom: (nDays: number) => void;
};

export function DaysFromSlider({ nDaysFrom, setNDaysFrom }: Props): JSX.Element {
	const [value, setValue] = useState(nDaysFrom);

	const handleChange = (_event: Event, newValue: number | number[]): void => {
		if (typeof newValue === "number") {
			setValue(newValue);
		}
	};

	const handleChangeCommitted = (): void => {
		setNDaysFrom(value);
	};

	return (
		<Box mt={2} justifySelf="center" mx={2}>
			<Slider
				value={value}
				onChange={handleChange}
				onChangeCommitted={handleChangeCommitted}
				min={31}
				max={365}
				step={null}
				marks={marks}
				valueLabelDisplay="auto"
			/>
		</Box>
	);
}
