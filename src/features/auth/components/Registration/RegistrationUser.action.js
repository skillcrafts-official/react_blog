import { API_ENDPOINTS } from '@/api/endpoints';
import { API_BASE_URL, API_DATA } from '@/constants';

export async function permanentUserRegAction({ request }) {
    const formData = await request.formData();
    const primary_email = formData.get('email');
    const password = formData.get('password');
    const policy = formData.get('policy');
    const consent = formData.get('consent');
    const bodyData = { primary_email, password, policy, consent }

    console.log(bodyData)

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

export async function temporaryUserRegAction({ request }) {
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