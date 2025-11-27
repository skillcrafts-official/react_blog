import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../constants";

export async function profileLoader() {
    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE(localStorage.getItem('auth:userId'))}`,
        API_DATA("GET")
    );

    if (response.ok) {
        const data = await response.json()
        return {
            success: true,
            statusCode: response.status,
            data: data,
        }
    }
    return {
        success: false,
        statusCode: response.status,
        message: response.statusText,
    }
    return;
}