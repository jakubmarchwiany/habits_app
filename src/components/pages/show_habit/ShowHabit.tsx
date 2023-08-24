import { Stack, Typography } from "@mui/material";
import Activity from "components/pages/show_habit/Activity";
import { Activity as IActivity } from "store/models/activity";
import DaysSelector from "components/pages/show_habit/DaysSelector";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Habit } from "store/models/habit";
import { getFetch } from "utils/fetches";

function ShowHabit() {
    const { _id } = useParams<{ _id: string }>();

    const [habit, setHabit] = useState<Habit>();
    const [activity, setActivity] = useState<IActivity[]>([]);
    const [nDays, setNDays] = useState(31);

    useEffect(() => {
        getFetch<{ data: { habit: Habit; activity: IActivity[] } }>(
            `/user/habit/${_id}?nDays=${nDays}`
        ).then(({ data }) => {
            setHabit(data.habit);
            setActivity(data.activity);
        });
    }, [nDays]);

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
                    <DaysSelector nDays={nDays} setNDays={setNDays} />

                    <Activity
                        habit={habit}
                        nDays={nDays}
                        activity={activity}
                        setActivity={setActivity}
                    />
                </Stack>
            </Stack>
        )
    );
}

export default ShowHabit;
