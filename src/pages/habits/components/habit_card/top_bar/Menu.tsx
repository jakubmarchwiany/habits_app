import { DeleteForever, Search, Settings } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Menu as MenuMui } from "@mui/material";
import { MyMenuItem } from "components/my/MyMenuItem";
import { useAppDispatch } from "hooks/redux";
import * as React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteHabitAction } from "store/app/habit/habit.actions";

import { Edit } from "./Edit";

type Props = {
	_id: string;
	description: string;
	name: string;
	periodInDays: number;
};

export function Menu({ _id, description, name, periodInDays }: Props): JSX.Element {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const menuOpen = Boolean(anchorEl);
	const [editOpen, setEditOpen] = React.useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};
	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={openMenu} sx={{ m: 0, p: 0 }}>
				<Settings sx={{ color: "white", fontSize: { md: "1.5rem", xs: "1.5rem" } }} />
			</IconButton>
			<MenuMui
				MenuListProps={{
					"aria-labelledby": "basic-button"
				}}
				anchorEl={anchorEl}
				onClose={closeMenu}
				open={menuOpen}
			>
				<MyMenuItem
					Icon={Search}
					onClick={(): void => {
						navigate(`/habits/${_id}`);
					}}
					text="Przeglądaj"
				/>

				<MyMenuItem
					Icon={EditIcon}
					onClick={(): void => {
						setEditOpen(true);
					}}
					text="Edytuj"
				/>

				<MyMenuItem
					Icon={DeleteForever}
					onClick={(): void => {
						toast.error("Kliknij dwukrotnie by usunąć nawyk");
					}}
					onDoubleClick={(): void => {
						toast.remove();

						dispatch(deleteHabitAction(_id));
					}}
					text="Usuń"
				/>
			</MenuMui>
			{editOpen && (
				<Edit
					_id={_id}
					description={description}
					name={name}
					periodInDays={periodInDays}
					setIsShow={setEditOpen}
				/>
			)}
		</>
	);
}
