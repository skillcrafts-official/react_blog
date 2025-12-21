export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token/',
    GUEST_LOGIN: '/auth/guest-token/',
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
    LIST: `/profiles/`,
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