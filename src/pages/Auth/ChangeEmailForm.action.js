import { redirect } from 'react-router-dom';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../constants';

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
