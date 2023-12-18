import { Button, Tooltip } from "@mui/material";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
	emoji: string | undefined;
	setEmoji: Dispatch<SetStateAction<string | undefined>> | Dispatch<SetStateAction<string>>;
};

export function EmojiSelector({ emoji, setEmoji }: Props): JSX.Element {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);

	return (
		<>
			<Tooltip placement="top" title={emoji && "Naciśnij ponownie aby zmienić"}>
				<Button onClick={() => setMenuVisible(true)} onFocus={() => console.log("elo")}>
					{emoji !== undefined ? `${emoji}` : "Ustaw emoji"}
				</Button>
			</Tooltip>
			{menuVisible && (
				<EmojiPicker
					onEmojiClick={(emoji: EmojiClickData, e: MouseEvent) => {
						console.log(emoji.emoji);

						setMenuVisible(false);

						setEmoji(emoji.emoji);
					}}
					theme={Theme.AUTO}
					width="100%"
				/>
			)}
		</>
	);
}
