import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';

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