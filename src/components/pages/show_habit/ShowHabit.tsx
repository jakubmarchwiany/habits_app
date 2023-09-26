import { Stack, Typography } from "@mui/material";
import Activity from "components/pages/show_habit/Activity";
import DaysSelector from "components/pages/show_habit/DaysSelector";
import dayjs from "dayjs";
import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Activity as IActivity } from "store/models/activity";
import { getFetch } from "utils/fetches";

function ShowHabit() {
    const { _id } = useParams<{ _id: string }>();

    const habit = useAppSelector((state) => {
        return state.app.myHabits.find((e) => e._id === _id);
    });

    const [activity, setActivity] = useState<IActivity[]>([]);
    const [nDaysFromToday, setNDaysFromToday] = useState(31);

    useEffect(() => {
        const dateFrom = dayjs().startOf("day").subtract(nDaysFromToday, "days");

        getFetch<{ data: IActivity[] }>(
            `/user/habits/${_id}/activities?dateFrom=${dateFrom.toString()}`
        ).then(({ data }) => {
            setActivity(data);
        });
    }, [nDaysFromToday]);

    return (
        habit &&
        activity && (
            <Stack component="main" p={{ xs: 1, md: 3 }} alignItems="center">
                <Stack
                    p={{ xs: 1, md: 3 }}
                    boxShadow={10}
                    width={{ xs: "95%", md: "50%" }}
                    alignItems="center"
                    sx={{ border: 2, borderRadius: 5, borderColor: "primary.main" }}
                >
                    <Typography variant="h3">{habit?.name}</Typography>

                    <Typography variant="body1" mt={3} width={"50%"} textAlign={"center"}>
                        {habit?.description}
                    </Typography>
                    <Typography variant="h4" mt={2} mb={3}>
                        Założenia co {habit?.periodInDays} dni
                    </Typography>
                    <DaysSelector nDays={nDaysFromToday} setNDays={setNDaysFromToday} />

                    <Activity
                        habit={habit}
                        nDays={nDaysFromToday}
                        activity={activity}
                        setActivity={setActivity}
                    />
                </Stack>
            </Stack>
        )
    );
}

export default ShowHabit;
