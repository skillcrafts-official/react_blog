export const API_BASE_URL = 'https://api.skillcrafts.ru';
export const FILE_SERVER_BASE_URL = 'http://localhost:9000'

export function API_DATA(method, bodyData = null, payload = {}, options = {}) {
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
    console.log(bodyData)
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
    LIST: '/users/',
    DETAIL: (userId) => `/users/${userId}`,
    PROFILE: {
      GET: (profileId) => `/profiles/${profileId}/get/`,
      UPDATE: (profileId) => `/profiles/${profileId}/update/`,
    },
    MEDIA: '/profiles/media',
  },
  POSTS: {
    LIST: '/posts/list/',
    DETAIL: (postId) => `/posts/${postId}/`,
    EDITOR: '/post-editor/'
  },
  PROFILES: {
    CRUD: (profileId) => `/profiles/${profileId}/`,
    DISPLAYS: {
      EDUCATION_LEVELS: `/profiles/displays/education-levels/`
    },
    WORK_FORMATS: {
      CRUD: (profile) => `/profiles/${profile}/work_formats/`
    },
    EDUCATION_LEVEL: {
      CRUD: (profile) => `/profiles/${profile}/education_level/`,
    },
    PRIVACY_SETTINGS: {
      GET: (userId) => `/privacy-settings/profiles/${userId}/privacy/`,
      UPDATE: (userId) => `/privacy-settings/profiles/${userId}/privacy/update`,
    },
    SKILLS: {
      CR: (profileId) => `/profiles/${profileId}/skills/`,
      UD: (profileId, skillId) => `/profiles/${profileId}/skills/${skillId}`,
      PRIVACIES: (profileId, skillId) => 
        `/profiles/${profileId}/skills/${skillId}/privacies/`,
      DISPLAY: `/profiles/displays/skills/`,
      LEVEL: (profileId, skillId) => `/profiles/${profileId}/skills/${skillId}`,
    }
  },
  RESUME: {
    DETAIL: (profileId) => `/resume/?profile=${profileId}`,
    WORK_EXPERIENCE: {
      CR: (profileId) => 
        `/resume/work-experiences/?profile=${profileId}`,
      PATCH: (experienceId) => 
        `/resume/work-experiences/${experienceId}/`
    },
    WORK_RESULT: {
      CRUD: (experienceId) => 
        `/resume/work-experiences/${experienceId}/results/`,
      PATCH: (resultId, userId) => 
        `/resume/work-experiences/results/${resultId}/${userId}/`
    },
    LANGUAGE: {
      DISPLAY: {
        NAMES: `/resume/languages/display/names/`,
        LEVELS: `/resume/languages/display/levels/`,
      },
      CREATE: `/resume/languages/`,
      RETRIEVE: (profileId) => `/resume/languages/?profile_id=${profileId}`,
      UD: (id, userId) => `/resume/languages/${id}/${userId}/`,
    },
    SKILLS: {
      GET: (profileId) => `/resume/skills/?profile_id=${profileId}`,
      CREATE: `/resume/skills/`
    }
  },
};

export const LINKS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registration',
  PROFILES: {
    LIST: '/profiles',
    DETAIL: (profileId) => `/profiles/${profileId}`,
    EDITOR: (profileId) => `/profiles/${profileId}`,
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: '/posts/:postId',
    EDITOR: '/post-editor',
  },
  RESUME: {
    DETAIL: (profileId) => `/resume/?profile=${profileId}`,
  },
  USERS: {
    DETAIL: (userId) => `/users/${userId}`,
  }
}

export const LOCATIONS = {
  HOME: '/',
  AUTH: {
    LOGOUT: '/auth/logout'
  }
}

export const ROUTES = {
  AUTH: {
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    REGISTRATION: `/auth/registration`,
  },
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registration',
  USERS: {
    LIST: '/users',
    DETAIL: '/users/:userId'
  },
  PROFILES: {
    LIST: '/profiles',
    DETAIL: '/profiles/:profileId',
    EDITOR: '/profiles/:profileId'
  },
  POSTS: {
    LIST: '/posts/',
    DETAIL: '/posts/:postId',
    EDITOR: '/post-editor',
  },
  SUBSCRIBES: {
    LIST: '/subscribes'
  },
  RESUME: {
    DETAIL: (profileId) => `/resume/?profile=${profileId}`,
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};
