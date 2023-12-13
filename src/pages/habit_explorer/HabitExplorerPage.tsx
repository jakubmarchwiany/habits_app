import { Stack } from "@mui/material";
import { ErrorPage } from "layouts/ErrorPage";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { HabitExplorer } from "./components/HabitExplorer";

export function HabitExplorerPage(): JSX.Element {
	const { _id } = useParams<{ _id: string }>();

	useEffect(() => {
		return () => {
			toast("Odśwież stronę aby zobaczyć zmiany");
		};
	}, []);

	console.log(_id);

	if (_id === undefined) {
		return <ErrorPage />;
	}

	return (
		<Stack
			alignItems="center"
			component="main"
			sx={{
				pb: "15vh",
				pt: { sm: 2, xs: 1 }
			}}
		>
			<HabitExplorer _id={_id} />
		</Stack>
	);
}
