import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

export function MyLinkButton(props: ButtonProps & { text: string, to: string; }): JSX.Element {
	return (
		<Button component={Link} variant="contained" {...props}>
			{props.text}
		</Button>
	);
}
