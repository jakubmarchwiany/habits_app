import "./day.css";

type Props = {
    date: string;
    createActivity: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: string) => void;
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
