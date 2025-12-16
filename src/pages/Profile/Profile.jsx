import styles from './Profile.module.css';
import { Link, useLoaderData } from "react-router-dom";
import ActionButton from "@/components/ui/Button/ActionButton";
import Input from '@/components/ui/Input/Input';
import Checkbox from "@/components/ui/Choice/Checkbox";
import Title from "@/components/ui/Label/Title";
import Wallpaper from "@/features/profile/components/Wallpaper";
import Avatar from "@/features/profile/components/Avatar";
import Textarea from '@/components/ui/Input/Textarea';
import Span from "@/components/ui/Label/Span";
import { useState } from "react"
import { API_BASE_URL, API_DATA_WITH_MEDIA, API_ENDPOINTS } from "@/constants";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import WorkFormat from "@/features/profile/components/WorkFormat";
import EducationLevel from "@/features/profile/components/EducationLevel";

function UserProfile() {
    const loaderData = useLoaderData();
    const { updatedProfile, setUpdatedProfile, setCurrentLocation } = useGlobalState();

    const profile = { ...(loaderData?.profile?.data || {}) };
    const privacy = { ...(loaderData?.privacySettings?.data || {}) };

    console.log(profile)
    console.log(privacy)

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
            submitData.append('middle_name', formData.get('middleName') || '');
            submitData.append('last_name', formData.get('lastName') || '');
            submitData.append('profession', formData.get('profession') || '');
            submitData.append('city', formData.get('city') || '');
            submitData.append('country', formData.get('country') || '');
            submitData.append('relocation', formData.get('relocation') || '');
            // submitData.append('work_formats', formData.get('workFormats') || '');
            // submitData.append('edu_level', formData.get('eduLevel') || '');
            submitData.append('institution_name', formData.get('institutionName') || '');
            submitData.append('graduation_year', formData.get('graduationYear') || '');
            submitData.append('short_desc', '');
            submitData.append('full_desc', formData.get('fullDesc') || '');
            submitData.append('link_to_instagram', formData.get('insta') || '');
            submitData.append('link_to_telegram', formData.get('linkToTelegram') || '');
            submitData.append('link_to_github', formData.get('linkToGithub') || '');
            submitData.append('link_to_vk', formData.get('linkToVk') || '');
            
            if (newAvatarFile && newAvatarFile.size > 0) {
                submitData.append('avatar', newAvatarFile);
            }

            if (newWallpaperFile && newWallpaperFile.size > 0) {
                submitData.append('wallpaper', newWallpaperFile);
            }

            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.CRUD(localStorage.getItem('auth:userId'))}`,
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

    function handlePwdButtonClick() {
        setCurrentLocation('Изменение пароля');
    }

    return (
        <form className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            {/* <Title>Профиль</Title> */}
            <div className={styles.profile}>
                <section className={styles.first}>
                    <Span variant="invert">Основная информация</Span>
                    <Input name="firstName" type="text"
                        isProtected
                        fieldValue={profile.first_name}
                        privacyValue={privacy.first_name}
                        labelValue="Ваше имя:"
                        placeholder="Введите ваше имя"/>
                    {/* <Span variant="primary">Ваша фамилия</Span> */}
                    <Input name="middleName" type="text"
                        isProtected
                        fieldValue={profile.middle_name}
                        privacyValue={privacy.middle_name}
                        labelValue="Ваше отчество:"
                        placeholder="Введите ваше отчество"></Input>
                    <Input name="lastName" type="text"
                        isProtected
                        fieldValue={profile.last_name}
                        privacyValue={privacy.last_name}
                        labelValue="Ваша фамилия:"
                        placeholder="Введите вашу фамилию"></Input>
                    {/* <Span variant="primary">Ваш Email</Span> */}
                    <Input name="profession" type="text"
                        isProtected
                        fieldValue={profile.profession}
                        privacyValue={privacy.profession}
                        labelValue="Ваша профессия:"
                        placeholder="Введите вашу профессию"></Input>
                    <Span variant="invert">Местоположение</Span>
                    <Input name="city" type="text"
                        isProtected
                        fieldValue={profile.city}
                        privacyValue={privacy.city}
                        labelValue="Город:"
                        placeholder="Введите название города"/>
                    {/* <Span variant="primary">Ваша фамилия</Span> */}
                    <Input name="country" type="text"
                        isProtected
                        fieldValue={profile.country}
                        privacyValue={privacy.country}
                        labelValue="Страна:"
                        placeholder="Введите название страны"></Input>
                    {/* <Span variant="primary">Ваш Email</Span> */}
                    <Input name="relocation" type="text"
                        isProtected
                        fieldValue={profile.relocation}
                        privacyValue={privacy.relocation}
                        labelValue="Возможность переезда:"
                        placeholder="Введите город и/или страну"></Input>
                    <WorkFormat name="workFormats"
                        isProtected
                        fieldValue={profile.work_formats}
                        privacyValue={privacy.work_formats}
                        labelValue="Формат работы:"
                        placeholder="Введите форматы работы"/>
                    
                </section>
                <section className={styles.second}>
                    <Span variant="invert">Дополнительная информация</Span>
                    <Textarea name="fullDesc"
                        isProtected
                        fieldValue={profile.full_desc}
                        privacyValue={privacy.full_desc}
                        labelValue="О себе:"
                        placeholder="Расскажите о себе"></Textarea>
                </section>
                <section className={styles.third}>
                    <Span variant="invert">Образование</Span>
                    <EducationLevel name="eduLevel" type="text"
                        isProtected
                        fieldValue={profile.edu_level}
                        privacyValue={privacy.edu_level}
                        labelValue="Уровень образования:"
                        placeholder="Выберите уровень"></EducationLevel>
                    <Input name="institutionName" type="text"
                        isProtected
                        fieldValue={profile.institution_name}
                        privacyValue={privacy.institution_name}
                        labelValue="Учебное заведение:"
                        placeholder="Введите наименование"></Input>
                    <Input name="graduationYear" type="number"
                        isProtected
                        fieldValue={profile.graduation_year}
                        privacyValue={privacy.graduation_year}
                        labelValue="Год выпуска:"
                        placeholder="Введите число (только год)"></Input>
                    <Span variant="invert">Ссылки на социальные профили</Span>
                    <Input name="linkToTelegram" type="text"
                        isProtected
                        fieldValue={profile.link_to_telegram}
                        privacyValue={privacy.link_to_telegram}
                        labelValue="Telegram:"
                        placeholder="Профиль telegram"></Input>
                    {/* <Span variant="primary">Ссылка на профиль github</Span> */}
                    <Input name="linkToGithub" type="text"
                        isProtected
                        fieldValue={profile.link_to_github}
                        privacyValue={privacy.link_to_github}
                        labelValue="GitHub:"
                        placeholder="Профиль github"></Input>
                    {/* <Span variant="primary">Ссылка на профиль vk</Span> */}
                    <Input name="linkToVk" type="text"
                        isProtected
                        fieldValue={profile.link_to_vk}
                        privacyValue={privacy.link_to_vk}
                        labelValue="Vkontakte:"
                        placeholder="Профиль vk"></Input>
                    <Input name="email" type="text"
                        // fieldValue={primary_email}
                        isProtected
                        privacyValue={privacy.email}
                        labelValue="Ваш Email:"
                        variant="disabled" disabled></Input>
                    {/* <Span variant="primary">Ваша профессия</Span> */}

                    {/* <Span variant="primary">О себе</Span> */}
                    
                </section>
                <section className={styles.fourth}>
                    <Span variant="invert">Изображения</Span>
                    <Avatar src={`${profile.avatar ? `${profile.avatar}` : ''}`}
                        name='avatar'
                        isProtected
                        privacyValue={privacy.avatar}
                        changeAvatar={handleAvatar}/>
                    <Wallpaper src={`${profile.wallpaper ? `${profile.wallpaper}` : ''}`}
                        name='wallpaper'
                        isProtected
                        privacyValue={privacy.wallpaper}
                        changeWallpaper={handleWallpaper}/>
                </section>
            </div>
            <section className="flex flex-row gap-3 justify-end">
                <Link to="/auth/email/"><ActionButton
                    type="button">
                    Изменить Email
                </ActionButton></Link>
                <Link to="/auth/password/">
                    <ActionButton onClick={handlePwdButtonClick}
                        type="button">
                        Изменить пароль
                    </ActionButton>
                </Link>
                <ActionButton 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </ActionButton>
            </section>
            
        </form>
    )
}

export default UserProfile
