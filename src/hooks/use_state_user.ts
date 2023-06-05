import { useEffect, useState } from "react";

export const enum User {
    Kuba = "Kuba",
    Julia = "Julia",
}

export default function useStateUser() {
    const [user, setUser] = useState<User>();

    const switchMode = () => {
        if (user === User.Kuba) {
            setUser(User.Julia);
            localStorage.setItem("user", JSON.stringify(User.Julia));
        } else {
            setUser(User.Kuba);
            localStorage.setItem("user", JSON.stringify(User.Kuba));
        }
    };

    useEffect(() => {
        const user: string | null = localStorage.getItem("user");
        if (user !== null) {
            setUser(JSON.parse(user));
        } else {
            setUser(User.Kuba);
        }
    }, []);

    return [user, switchMode] as const;
}
