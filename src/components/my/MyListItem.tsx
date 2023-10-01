import { ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";

type Props = {
	disabled?: boolean;
	icon: JSX.Element;
	onClick: () => void;
	text: string;
};
export function MyListItem({ disabled, text, icon, onClick }: Props): JSX.Element {
	return (
		<ListItem onClick={onClick} disablePadding>
			<ListItemButton
				sx={{ justifyContent: "center", alignItems: "center" }}
				disabled={disabled}
			>
				<Stack direction="row" sx={{ alignItems: "center" }}>
					<ListItemIcon sx={{ minWidth: 0, marginRight: 3, color: "primary.main" }}>
						{icon}
					</ListItemIcon>
					<ListItemText sx={{ flex: "unset" }} primary={text} />
				</Stack>
				<ListItemIcon sx={{ minWidth: 0, marginLeft: 3, color: "primary.main" }}>
					{icon}
				</ListItemIcon>
			</ListItemButton>
		</ListItem>
	);
}
