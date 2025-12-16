import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../../constants';
import { redirect } from "react-router-dom";

export async function registrationAction({ request }) {
    const formData = await request.formData();
    const primary_email = formData.get('email');
    const password = formData.get('password');
    const bodyData = { primary_email, password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, 
        API_DATA("POST", bodyData)
    );

    const user = await response.json()

    if (response.ok) {
        return {
            redirect: '/auth/confirm-email',
            success: true,
            user: user
        }
    }
    return { success: false, error: user.message };
}

export async function loginAction({ request }) {
    const formData = await request.formData();
    const primary_email = formData.get('email');
    const password = formData.get('password');
    const bodyData = { primary_email, password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        API_DATA("POST", bodyData)
    );

    const data = await response.json();
    
    if (response.ok) {
        if (data.access) {
            localStorage.setItem('auth:accessToken', data.access);
        }
        if (data.refresh) {
            localStorage.setItem('auth:refreshToken', data.refresh);
        }
        if (data.user_id) {
            localStorage.setItem('auth:userId', parseInt(data.user_id));
        }
        
        return { 
            success: true, 
            userData: data,
            redirect: '/'
        };
    }
    
    return { success: false, error: data.message };
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
    
    return redirect('/');
}

export async function changeEmailAction({ request }) {
    const formData = await request.formData();
    const primary_email = formData.get('email2');
    console.log(`email ${primary_email}`)
    const bodyData = { primary_email }

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
    const userId = localStorage.getItem('auth:userId')
    const formData = await request.formData();
    const password = formData.get('password');
    const bodyData = { password }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.PASSWORD}`,
        API_DATA("PUT", bodyData)
    );

    const data = await response.json();

    if (response.ok) {
        return redirect(`/profiles/${userId}/`);
    }
}
