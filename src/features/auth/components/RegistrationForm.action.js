import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';

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