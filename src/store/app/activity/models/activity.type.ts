export enum ActivityStatus {
	DELAY = "delay",
	DONE = "done",
	NOT_DONE = "not_done",
	TODAY = "today"
}

export type Activity = {
	_id: string;
	date: string;
	status: ActivityStatus;
};
