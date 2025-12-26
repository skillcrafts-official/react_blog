import { API_ENDPOINTS } from '@/api/endpoints';
import { API_BASE_URL, API_DATA } from '@/constants';
import { useGlobalState } from '@/lib/providers/GlobalProvider';

export async function createTaskAction({ request }) {
    const profile = parseInt(localStorage.getItem('auth:userId'));
    const formData = await request.formData();
    const todo = formData.get('todo');
    const description = formData.get('description');
    const bodyData = { todo, description, profile }

    console.log(bodyData)

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.CREATE}`, 
        API_DATA("POST", bodyData)
    );

    const user = await response.json()

    if (response.ok) {
        return {
            redirect: '/workflows',
            success: true,
            user: user
        }
    }
    return { success: false, error: user.message };
}
