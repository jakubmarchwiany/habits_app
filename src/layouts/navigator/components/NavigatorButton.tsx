import { ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps } from "@mui/material";

type Props = {
	disabled?: boolean;
	icon: JSX.Element;
	onClick: () => void;
	path: string;
	sx?: SxProps;
	text: string;
};

export function NavigateButton({ disabled, icon, onClick, path, sx, text }: Props): JSX.Element {
	return (
		<ListItem disablePadding onClick={onClick}>
			<ListItemButton
				disabled={disabled !== undefined ? disabled : path === location.pathname}
				sx={sx}
			>
				<ListItemIcon sx={{ color: "primary.main" }}>{icon}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
}
