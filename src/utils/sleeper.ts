import toast from "react-hot-toast";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const sleeper = async (duration: number) => {
    const timer = toast(`${duration}`);
    for (let i = duration; i >= 0; i--) {
        toast(`${i}`, { id: timer });
        await sleep(1000);
    }
    toast.dismiss(timer);
};
