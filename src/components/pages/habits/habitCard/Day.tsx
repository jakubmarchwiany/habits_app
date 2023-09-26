import "./day.css";

type Props = {
    createActivity: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: string) => void;
    date: string;
};

function Day({ date, createActivity }: Props) {
    return (
        <div
            onClick={(event) => createActivity(event, date)}
            className={`day`}
            data-tooltip={date.slice(5)}
        />
    );
}

export default Day;
