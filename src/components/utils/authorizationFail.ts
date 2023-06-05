import { sleeper } from "components/utils/sleeper";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const authorizationFail = async () => {
    Cookies.remove("authorization");
    toast.error("Zaloguj się ponownie", { duration: 3000 });
    await sleeper(2);
    window.location.reload();
};

export const logout = async () => {
    Cookies.remove("authorization");
    window.location.reload();
};
