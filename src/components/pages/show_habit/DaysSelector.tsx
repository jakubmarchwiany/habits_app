import { Box, Slider } from "@mui/material";
import { useState } from "react";

const stepValues = [31, 62, 93, 182, 365];

const marks = stepValues.map((value) => ({
    value,
    label: value.toString()
}));

type Props = {
    nDays: number;
    setNDays: (nDays: number) => void;
};

export function DaysSelector({ nDays, setNDays }: Props): JSX.Element {
    const [value, setValue] = useState(nDays);

    const handleChange = (_event: Event, newValue: number | number[]): void => {
        if (typeof newValue === "number") {
            setValue(newValue);
        }
    };

    const handleChangeCommitted = (): void => {
        setNDays(value);
    };

    return (
        <Box width={"50%"}>
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
