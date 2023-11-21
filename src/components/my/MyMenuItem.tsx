import { SvgIconComponent } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

type Props = {
	Icon: SvgIconComponent;
	onClick: () => void;
	onDoubleClick?: () => void;
	text: string;
};
export function MyMenuItem({ Icon, onClick, onDoubleClick, text }: Props): JSX.Element {
	return (
		<MenuItem onClick={onClick} onDoubleClick={onDoubleClick}>
			<ListItemIcon>
				<Icon sx={{ color: "white" }} />
			</ListItemIcon>
			<ListItemText>{text}</ListItemText>
		</MenuItem>
	);
}
