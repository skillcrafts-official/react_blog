import styles from './Auth.module.css';

import { useLocation } from "react-router-dom";

import { ROUTES } from "@/constants";
import LoginForm from "@/features/auth/components/LoginForm";
import LogoutForm from "@/features/auth/components/LogoutForm"
import RegistrationFrom from "@/features/auth/components/RegistrationForm";

function Auth() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={styles.auth}>
            {pathname === ROUTES.AUTH.LOGIN && <LoginForm/>}
            {pathname === ROUTES.AUTH.LOGOUT && <LogoutForm/>}
            {pathname === ROUTES.AUTH.REGISTRATION && <RegistrationFrom/>}
        </div>
    )
}

export default Auth
