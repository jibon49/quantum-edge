import { useContext } from "react";
import { AuthContext } from "../Authproviders/Authproviders";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;
