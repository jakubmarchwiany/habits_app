import toast from "react-hot-toast";

import { sleep } from "./sleep";

export async function sleeper(duration: number) {
    const timer = toast(`${duration}`);

    for (let i = duration; i >= 0; i--) {
        toast(`${i}`, { id: timer });
        await sleep(1000);
    }

    toast.dismiss(timer);
}
