import { SettingsBackupRestore } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sleep } from "utils/sleep";

function validateColorHex(hexCode: string): boolean {
	const pattern = /^#([A-Fa-f0-9]{3}){1,2}$/;

	return pattern.test(hexCode);
}

export function ColorThemeSettings(): JSX.Element {
	const [themeColor, setThemeColor] = useState("");
	const [colorCorrect, setColorCorrect] = useState(false);
	const [colorSaved, setColorSaved] = useState(false);

	useEffect(() => {
		const color = localStorage.getItem("themeColor");

		if (color !== null) {
			setThemeColor(color);

			setColorSaved(true);
		}
	}, []);

	const saveThemeColor = async (): Promise<void> => {
		localStorage.setItem("themeColor", themeColor);

		toast.success("Zapisano kolor motywu");

		await sleep(1000);

		window.location.reload();
	};

	const removeThemeColor = async (): Promise<void> => {
		localStorage.removeItem("themeColor");

		toast.success("Przywrócno domyślny motyw");

		await sleep(1000);

		window.location.reload();
	};

	return (
		<TextField
			label="Kolor motywu"
			variant="filled"
			value={themeColor}
			placeholder="#ff0000"
			autoComplete="off"
			onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
				setColorCorrect(validateColorHex(event.target.value));

				setThemeColor(event.target.value);
			}}
			InputProps={{
				endAdornment: (
					<>
						<IconButton onClick={saveThemeColor} disabled={!colorCorrect}>
							<SaveIcon sx={{ color: colorCorrect ? "primary.main" : "" }} />
						</IconButton>
						<IconButton onClick={removeThemeColor} disabled={!colorSaved}>
							<SettingsBackupRestore
								sx={{ color: colorSaved ? "primary.main" : "" }}
							/>
						</IconButton>
					</>
				)
			}}
		/>
	);
}
