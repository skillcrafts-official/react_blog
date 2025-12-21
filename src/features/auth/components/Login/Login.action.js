import { API_BASE_URL, API_DATA } from '@/constants';
import { API_ENDPOINTS } from '@/api/endpoints';

export async function loginAction({ request, params }) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    
    console.log(searchParams)

    if (searchParams.get('guest')) {
        const response = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.GUEST_LOGIN}`,
            API_DATA("POST")
        );

        const data = await response.json();

        if (response.ok) {
            if (data?.access) {
                localStorage.setItem('auth:guestToken', data.access);
            }
            if (data?.guest_id) {
                localStorage.setItem('auth:guestId', parseInt(data.guest_id));
            }

            return { 
                success: true, 
                userData: data,
                redirect: '/'
            };
        }
    } else {

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
    }
    
    return { success: false };
}

export async function guestLoginAction({ request, params }) {
    console.log(request)
    console.log(params)
}