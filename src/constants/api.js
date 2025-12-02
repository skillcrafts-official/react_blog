export const API_BASE_URL = 'https://portfolio-blog-api.ru/';
export const FILE_SERVER_BASE_URL = 'http://localhost:9000'

export function API_DATA(method, bodyData = null, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };
    console.log(headers)
    const token = localStorage.getItem('auth:accessToken');
    console.log(`token ${token}`)
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        credentials: 'include',
        method, headers, ...options
    };

    if (bodyData) {
        config.body = JSON.stringify(bodyData);
    }
    console.log(config)
    return config;
}

export function API_DATA_WITH_MEDIA(method, bodyData = null, options = {}) {
    const headers = {
        // "Content-Type": "application/json",
        ...options.headers,
    };
    console.log(headers)
    const token = localStorage.getItem('auth:accessToken');
    console.log(`token ${token}`)
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        credentials: 'include',
        method, headers, ...options
    };

    if (bodyData) {
        config.body = bodyData;
    }
    console.log(config)
    return config;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token/',
    REGISTER: '/users/',
    EMAIL: '/users/email/',
    PASSWORD: '/users/password/',
    CONFIRM: (userId) => `/users/${userId}/confirm/`,
    REFRESH: '/auth/token/refresh/',
    LOGOUT: '/auth/logout/',
    PROFILE: '/auth/profile/',
  },
  USERS: {
    LIST: '/api/users/',
    PROFILE: (profileId) => `/profiles/${profileId}/`,
    MEDIA: '/profiles/media',
  },
  POSTS: {
    LIST: '/api/posts/',
    DETAIL: `/api/posts/:id/`,
  }
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registration',
  PROFILE: '/profile',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};
