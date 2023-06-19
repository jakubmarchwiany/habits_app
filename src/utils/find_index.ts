/* eslint-disable prefer-const */
export const findRightIndexByDate = (newDateString: string, activities: string[]) => {
    const newDate = new Date(newDateString);
    let low = 0,
        high = activities.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (new Date(activities[mid]) < newDate) low = mid + 1;
        else high = mid;
    }
    return low;
};
