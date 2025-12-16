import { API_BASE_URL, API_DATA, API_DATA_WITH_MEDIA, API_ENDPOINTS } from '../../constants';
import { redirect } from "react-router-dom";

export async function loadingProfileAction({ request }) {
    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        API_DATA("GET")
    );

    const data = await response.json();
    
    if (response.ok) {
        if (data.access) {
            localStorage.setItem('auth:access_token', data.access);
        }
        if (data.refresh) {
            localStorage.setItem('auth:refresh_token', data.refresh);
        }
        return redirect('/');
    }
}

export async function updateProfileAction({ request }) {
    const formData = await request.formData();
    
    // Создаем FormData для отправки файлов
    const submitData = new FormData();
    
    // Добавляем текстовые поля
    submitData.append('first_name', formData.get('firstName') || '');
    submitData.append('last_name', formData.get('lastName') || '');
    submitData.append('profession', formData.get('profession') || '');
    submitData.append('short_desc', '');
    submitData.append('full_desc', formData.get('aboutSelf') || '');
    submitData.append('link_to_instagram', formData.get('insta') || '');
    submitData.append('link_to_vk', formData.get('vk') || '');
    
    // Добавляем файлы если они есть
    const avatarFile = formData.get('avatar');
    const wallpaperFile = formData.get('wallpaper');
    
    if (avatarFile && avatarFile.size > 0) {
        submitData.append('avatar', avatarFile);
    }
    
    if (wallpaperFile && wallpaperFile.size > 0) {
        submitData.append('wallpaper', wallpaperFile);
    }

    const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`,
        API_DATA_WITH_MEDIA("POST", submitData)
    );

    const data = await response.json();

    if (response.ok) {
        return redirect('/');
    }
}