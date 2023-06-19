import dayjs from "dayjs";
import { memo } from "react";
import "./day.css";

type Props = {
    isDone: boolean;
    date: dayjs.Dayjs;
    action?: (date: string) => void;
    color: string;
};

const Day = memo(function Day({ color, isDone, date, action }: Props) {
    return (
        <div
            onClick={() => action && action(date.format("YYYY-MM-DD"))}
            className={`day`}
            style={{ backgroundColor: isDone ? color : "" }}
            data-tooltip={date.format("MM.DD")}
        />
    );
});

export default Day;
