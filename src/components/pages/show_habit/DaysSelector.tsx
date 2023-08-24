import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

const stepValues = [31, 62, 93, 182, 365];

const marks = stepValues.map((value) => ({
    value,
    label: value.toString(),
}));

type Props = {
    nDays: number;
    setNDays: (nDays: number) => void;
};

function DaysSelector({ nDays, setNDays }: Props) {
    const [value, setValue] = useState(nDays);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") setValue(newValue);
    };

    const handleChangeCommitted = () => {
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

export default DaysSelector;
