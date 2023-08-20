import dayjs from "dayjs";
import { memo } from "react";
import "./day.css";

type Props = {
    id?: string;
    isDone: boolean;
    date: dayjs.Dayjs;
    action?: (date: string, id: string) => void;
    color: string;
};

const Day = memo(function Day({ id, color, isDone, date, action }: Props) {
    return (
        <div
            onClick={() => action && action(date.format("YYYY-MM-DD"), id!)}
            className={`day`}
            style={{ backgroundColor: isDone ? color : "" }}
            data-tooltip={date.format("MM.DD")}
        />
    );
});

export default Day;
