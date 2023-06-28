import dayjs from "dayjs";
import { memo } from "react";
import "./day.css";

type Props = {
    _id: string;
    isDone: boolean;
    date: dayjs.Dayjs;
    action?: (date: string) => void;
    color: string;
};

const Day = memo(function Day({ _id, color, isDone, date, action }: Props) {
    return (
        <div
            onClick={() => action && action(_id)}
            className={`day`}
            style={{ backgroundColor: isDone ? color : "" }}
            data-tooltip={date.format("MM.DD")}
        />
    );
});

export default Day;
