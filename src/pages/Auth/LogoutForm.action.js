import { redirect } from "react-router-dom";

export async function logoutAction() {
    Object.keys(localStorage)
        .filter((item) => item.startsWith('auth:'))
        .forEach((item) => localStorage.removeItem(item));
    
    return redirect('/');
}