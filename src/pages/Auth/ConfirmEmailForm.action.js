import { redirect } from 'react-router-dom';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';

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