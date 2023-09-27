import "./day.css";

import { styled } from "@mui/material/styles";

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
}));

type Props = {
    _id: string;
    date: string;
    deleteActivity: (_id: string) => void;
};

export function DayDone({ _id, date, deleteActivity }: Props): JSX.Element {
    return (
        <StyledDIV
            onClick={(): void => deleteActivity(_id)}
            className={`day`}
            data-tooltip={date.slice(5)}
        />
    );
}
