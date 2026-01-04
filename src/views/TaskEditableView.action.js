import { API_ENDPOINTS } from '@/api/endpoints';
import { API_BASE_URL, API_DATA } from '@/constants';
import { useGlobalState } from '@/lib/providers/GlobalProvider';

export async function createTaskAction({ request }) {
    const profile = parseInt(localStorage.getItem('auth:userId'));
    const formData = await request.formData();
    const project = parseInt(formData.get('project'));
    const todo = formData.get('todo');
    const description = formData.get('description');
    const bodyData1 = { todo, description, profile }

    const response1 = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.CREATE}`, 
        API_DATA("POST", bodyData1)
    );

    const data1 = await response1.json()

    if (!response1.ok) {
        return { success: false, error: data1.message };
    }

    const bodyData2 = { project };

    const response2 = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.PATCH_PROJECT(data1?.id)}`, 
        API_DATA("PATCH", bodyData2)
    );

    const data2 = await response2.json();

    if (response2.ok) {
        return { redirect: '/workflows', success: true };
    } 
    return { success: false, error: data2.message };
}
