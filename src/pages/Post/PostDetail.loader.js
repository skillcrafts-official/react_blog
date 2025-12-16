import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "@/constants";

export async function allPostsLoader() {
    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.POSTS.LIST}`,
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

export async function postLoader({ params }) {
    const { postId } = params;
    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.POSTS.DETAIL(postId)}`,
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