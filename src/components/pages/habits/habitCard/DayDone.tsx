import { styled } from "@mui/material/styles";
import "./day.css";

const StyledDIV = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));

type Props = {
    _id: string;
    date: string;
    deleteActivity: (_id: string) => void;
};

function DayDone({ _id, date, deleteActivity }: Props) {
    return (
        <StyledDIV
            onClick={() => deleteActivity(_id)}
            className={`day`}
            data-tooltip={date.slice(5)}
        />
    );
}

export default DayDone;
