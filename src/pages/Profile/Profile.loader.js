import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '@/constants';

export async function profileLoader({ request, params }) {
    const { userId } = params;
    const { url } = request;
    console.log(request)
    
    const variants = {
        '/users/': API_ENDPOINTS.PROFILES.CRUD(userId),
        '/profiles/': API_ENDPOINTS.PROFILES.CRUD(localStorage.getItem('auth:userId')),
    }

    console.log(variants[url.match(/\/users\/|\/profiles\//)[0]])

    const response = await fetch(
        `${API_BASE_URL}${variants[url.match(/\/users\/|\/profiles\//)[0]]}`,
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

export async function profilePrivacyLoader() {
    const response = await fetch(
        `${API_BASE_URL}${
            API_ENDPOINTS.PROFILES.PRIVACY_SETTINGS.GET(localStorage.getItem('auth:userId'))
        }`,
        API_DATA("GET")
    );

    if (response.ok) {
        const data = await response.json()
        console.log(data)
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

export const combinedProfileLoader = async (args) => {
  try {
    const [profile, privacySettings] = await Promise.all([
      profileLoader(args),
      profilePrivacyLoader(args),
    ]);
    
    console.log('✅ Все лоадеры завершены');

    return {
      profile,
      privacySettings,
    };
    
  } catch (error) {
    console.error('❌ Ошибка в одном из лоадеров:', error);
    throw error;
  }
};