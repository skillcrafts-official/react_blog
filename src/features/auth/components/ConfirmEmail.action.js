import { redirect } from 'react-router-dom';
import { API_BASE_URL, API_DATA } from '@/constants';
import { API_ENDPOINTS } from '@/api/endpoints';

export async function confirmAction({ request }) {
    // const userId = localStorage.getItem('auth:userId')
    const formData = await request.formData();
    const primary_email = formData.get('email');
    const confirmation_code = formData.get('confirmCode');
    const bodyData = { primary_email, confirmation_code }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.CONFIRM}`,
        API_DATA("POST", bodyData)
    );

    const data = await response.json();

    console.log(data)

    if (response.ok) {
        if (data.verification === 'passed') {
            return redirect('/auth/login');
        }
        // return redirect('/auth/login');
    }
}