import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';
import { redirect } from "react-router-dom";

export async function registrationAction({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const bodyData = { email, password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, 
        API_DATA("POST", bodyData)
    );

    if (response.ok) {
        const user = await response.json()
        return {
            redirect: '/auth/confirm-email',
            success: true,
            user: user
        }
    }
}

export async function loginAction({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const bodyData = { email, password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        API_DATA("POST", bodyData)
    );

    const data = await response.json();
    
    console.log(data);

    if (response.ok) {
        if (data.access) {
            localStorage.setItem('auth:access_token', data.access);
        }
        if (data.refresh) {
            localStorage.setItem('auth:refresh_token', data.refresh);
        }
        return redirect('/');
    }
}

export async function confirmAction({ request }) {
    const userId = localStorage.getItem('auth:userId')
    const formData = await request.formData();
    const confirm_code = formData.get('user:confirmCode');
    const bodyData = { confirm_code }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.CONFIRM(userId)}`,
        API_DATA("PUT", bodyData)
    );

    const data = await response.json();

    if (response.ok) {
        return redirect('/auth/login');
    }
}

export async function logoutAction() {
    Object.keys(localStorage)
        .filter((item) => item.startsWith('auth:'))
        .forEach((item) => localStorage.removeItem(item));
    
    return redirect('/auth/login');
}

export async function changeEmailAction({ request }) {
    const formData = await request.formData();
    const email = formData.get('email2');
    console.log(`email ${email}`)
    const bodyData = { email }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.EMAIL}`,
        API_DATA("PUT", bodyData)
    );

    const data = await response.json();

    if (response.ok) {
        return redirect('/auth/confirm-email');
    }
    return redirect('/auth/confirm-email');
}

export async function changePwdAction({ request }) {
    const formData = await request.formData();
    const password = formData.get('password');
    const bodyData = { password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.PASSWORD}`,
        API_DATA("PUT", bodyData)
    );

    const data = await response.json();

    if (response.ok) {
        return redirect('/profiles/');
    }
}
