import { redirect } from 'react-router-dom';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';

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