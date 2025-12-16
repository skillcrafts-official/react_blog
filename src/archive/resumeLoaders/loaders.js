import { API_BASE_URL, API_ENDPOINTS, API_DATA } from "../../constants";

export async function workExperienceLoader({ request, params }) {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);
    console.log('Полный URL:', request.url);
    console.log('Pathname:', url.pathname);
    console.log('Query параметры:', Object.fromEntries(url.searchParams));
    console.log('Method:', request.method);
    console.log('Headers:', Object.fromEntries(request.headers));

    console.log('userId:', params.userId);    // Например: "123"
    console.log('Все params:', params);       // { userId: "123", postId: "456" }

    const response = await fetch(
        `${API_BASE_URL}${
            API_ENDPOINTS.RESUME.WORK_EXPERIENCE.CR(searchParams?.profile)
        }`,
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
}

export async function resumeLoader({ request, params }) {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);

    const response = await fetch(
        `${API_BASE_URL}${
            API_ENDPOINTS.RESUME.DETAIL(searchParams?.profile)
        }`,
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
}

export const combinedResumeLoaders = async (args) => {
  try {
    const [workExperiences, workResults] = await Promise.all([
      workExperienceLoader(args),
      workResultLoader(args),
    ]);
    
    console.log('✅ Все лоадеры завершены');

    return {
      workExperiences,
      workResults,
    };
    
  } catch (error) {
    console.error('❌ Ошибка в одном из лоадеров:', error);
    throw error;
  }
};