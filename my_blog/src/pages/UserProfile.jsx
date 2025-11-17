import { Form, Link, useActionData, useFetcher, useLoaderData, useLocation, useParams } from "react-router-dom"
import ActionButton from "../components/generals/ActionButton"
import Input from "../components/generals/Input"
import Title from "../components/generals/Title"
import Wallpaper from "../components/UserProfile/Wallpaper"
import Avatar from "../components/UserProfile/Avatar"
import Span from "../components/generals/Span"
import Textarea from "../components/generals/Textarea"
import { useEffect, useState } from "react"
import { API_BASE_URL, API_DATA_WITH_MEDIA, API_ENDPOINTS } from "../constants"
import { useGlobalState } from "../components/GlobalProvider"

function UserProfile() {
    const fetcher = useFetcher();
    const loaderData = useLoaderData();
    const { updatedProfile, setUpdatedProfile } = useGlobalState();
    console.log(loaderData);
    const {
        avatar,
        first_name,
        full_desc,
        last_name,
        link_to_instagram,
        link_to_vk,
        profession,
        short_desc,
        user,
        wallpaper
    } = loaderData.data;

    // Добавляем состояние для загрузки
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newAvatarFile, setNewAvatarFile] = useState(null);
    const [newWallpaperFile, setNewWallpaperFile] = useState(null);

    // Обработчик сабмита формы
    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(event.target);
            
            const submitData = new FormData();
            
            // Добавляем текстовые поля
            submitData.append('first_name', formData.get('firstName') || '');
            submitData.append('last_name', formData.get('lastName') || '');
            submitData.append('profession', formData.get('profession') || '');
            submitData.append('short_desc', '');
            submitData.append('full_desc', formData.get('aboutSelf') || '');
            submitData.append('link_to_instagram', formData.get('insta') || '');
            submitData.append('link_to_vk', formData.get('vk') || '');
            
            // Добавляем файлы
            // const avatarFile = formData.get('avatar');
            // const wallpaperFile = formData.get('wallpaper');
            
            if (newAvatarFile && newAvatarFile.size > 0) {
                submitData.append('avatar', newAvatarFile);
            }

            if (newWallpaperFile && newWallpaperFile.size > 0) {
                submitData.append('wallpaper', newWallpaperFile);
            }

            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`,
                API_DATA_WITH_MEDIA("POST", submitData)
            );

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            console.log('Profile updated:', data);
                        
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Ошибка при обновлении профиля');
        } finally {
            setIsSubmitting(false);
            setUpdatedProfile(updatedProfile + 1);
        }
    }

    function handleAvatar(file) {
        setNewAvatarFile(file)
    }

    function handleWallpaper(file) {
        setNewWallpaperFile(file)
    }

    return (
        <div className="m-12">
            <div className="flex flex-row flex-wrap gap-x-25 gap-y-7">
                <form className="flex flex-col gap-5 min-w-70"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <Title>Профиль</Title>
                    <Input name="firstName" type="text"
                        fieldValue={first_name}
                        placeholder="Введите ваше имя"></Input>
                    <Input name="lastName" type="text"
                        fieldValue={last_name}
                        placeholder="Введите вашу фамилию"></Input>
                    <Input name="email" type="text"
                        fieldValue={user.email}
                        variant="disabled" disabled></Input>
                    <section className="flex flex-row justify-between">
                        <Link to="/auth/email/"><ActionButton
                            type="button">
                            Изменить Email
                        </ActionButton></Link>
                        <Link to="/auth/password/"><ActionButton
                            type="button">
                            Изменить пароль
                        </ActionButton></Link>
                    </section>
                    <Input name="insta" type="text"
                        fieldValue={link_to_instagram}
                        placeholder="Профиль instagram"></Input>
                    <Input name="vk" type="text"
                        fieldValue={link_to_vk}
                        placeholder="Профиль vk"></Input>
                    <Input name="profession" type="text"
                        fieldValue={profession}
                        placeholder="Ваша профессия"></Input>
                    <Textarea name="aboutSelf"
                        // value={full_desc} 
                        fieldValue={full_desc}
                        placeholder="О себе"></Textarea>
                    <Avatar src={`${API_BASE_URL}${avatar}`}
                        changeAvatar={handleAvatar}/>
                    <Wallpaper src={`${API_BASE_URL}${wallpaper}`}
                        changeWallpaper={handleWallpaper}/>
                    <ActionButton 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    </ActionButton>
                </form>
                <div className="flex flex-col justify-center">
                    
                    
                    {/* <Link
                        className="inline-block font-roboto text-[#107effff] text-[14px] leading-[100%] font-normal">
                            выбрать аватар
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
