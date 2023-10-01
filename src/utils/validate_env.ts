import { cleanEnv, num, str } from "envalid";

export const ENV = cleanEnv(import.meta.env, {
	VITE_API_ENDPOINT: str(),
	VITE_N_DAYS_FROM_TODAY: num()
});
