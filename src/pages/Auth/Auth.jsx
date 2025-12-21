import styles from './Auth.module.css';

import { useLocation } from "react-router-dom";

import { ROUTES } from "@/constants";
import LogoutForm from "@/features/auth/components/LogoutForm"
import RegistrationUser from '@/features/auth/components/Registration/RegistrationUser';
import Login from '@/features/auth/components/Login/Login';
import ConfirmEmail from '@/features/auth/components/ConfirmEmail';

function Auth() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className={styles.auth}>        
            {pathname === ROUTES.AUTH.LOGIN && <Login/>}
            {pathname === ROUTES.AUTH.LOGOUT && <LogoutForm/>}
            {pathname === ROUTES.AUTH.REGISTRATION && <RegistrationUser/>}
            {pathname === ROUTES.AUTH.CONFIRMATION && <ConfirmEmail/>}
        </div>
    )
}

export default Auth
