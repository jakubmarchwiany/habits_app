/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./day.css";

type Props = {
    createActivity: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: string) => void;
    date: string;
};

export function Day({ date, createActivity }: Props): JSX.Element {
    return (
        <div
            onClick={(event): void => createActivity(event, date)}
            className={`day`}
            data-tooltip={date.slice(5)}
        />
    );
}
