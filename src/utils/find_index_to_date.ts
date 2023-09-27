import { Activity } from "store/models/activity";

export function findIndexToDate(newDateString: string, activities: Activity[]): number {
    const newDate = new Date(newDateString);
    let low = 0,
        high = activities.length;

    while (low < high) {
        const mid = (low + high) >>> 1;

        if (new Date(activities[mid].date) < newDate) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}
