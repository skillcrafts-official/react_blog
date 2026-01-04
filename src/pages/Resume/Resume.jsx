import styles from "./Resume.module.css";
import defaultAvatar from '@/assets/images/defaults/default-avatar.svg'
import iconVk from '@/assets/icons/vk.svg';
import iconTelegram from '@/assets/icons/telegram.svg';
import iconGitHub from '@/assets/icons/github-mark-white.svg';

import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
// import ActionButton from "@/components/ui/Button/ActionButton";
// import Input from "@/components/ui/Input/Input";
// import Checkbox from "@/components/ui/Choice/Checkbox";
// import Title from "@/components/ui/Label/Title";
// import Textarea from "@/components/ui/Input/Textarea";
import Span from "@/components/ui/Label/Span";
// import { useEffect, useState } from "react";
// import { API_BASE_URL, API_DATA_WITH_MEDIA, API_ENDPOINTS } from "../../constants";
// import { useGlobalState } from "@/lib/providers/GlobalProvider";
// import WorkFormat from "@/features/profile/components/WorkFormat";
// import EducationLevel from "@/features/profile/components/EducationLevel";
// import { useResumeState } from "@/lib/providers/ResumeProvider";
import WorkResult from "@/features/resume/components/WorkResult";
// import VerticalWheelList from "@/components/ui/Wheel/VerticalWheelList";
import WorkLanguage from "@/features/resume/components/WorkLanguage";
import WorkExperience from "@/features/resume/components/WorkExperience";
import WorkSkill from "@/features/profile/components/WorkSkill";
import ProtectedImage from "@/components/ui/Image/ProtectedImage";
import { useSidebar } from "@/hooks/useSidebar";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useWorkFormat } from "@/hooks/useProfile";
import { useEffect } from "react";
import ResumeView from "@/views/ResumeView";

function Resume() {
    // const { handleExperienceId } = useResumeState()
    const WORK_FORMATS = {
        "office": "Из офиса",
        "hybrid": "Гибридно",
        "remote": "Удалённо",
    }

    const { userId } = useGlobalState();
    const navigate = useNavigate();
    const location = useLocation();
    const { profileData } = useSidebar(userId);
    const {
        workFormats,
        isLoading: isWorkFormatsLoading, error: workFormatsError
    } = useWorkFormat(userId);
    const loaderData = useLoaderData();
    const resume = [...(loaderData?.data || [])];
    const workExperiences = resume[0]?.experiences || []
    // const workLanguages = resume[0].languages
    // const privacy = { ...(loaderData?.privacySettings?.data || {}) };

    useEffect(() => {
        if (!location.search) {
            navigate({
                pathname: location.pathname,
                search: `?profile=${userId}`
            }, { replace: true });
            // updateStatusFilter(new URLSearchParams(savedParams));
        }
    }, [navigate, location])

    // console.log(workLanguages)
    const renderWorkFormats = () => {
        if (isWorkFormatsLoading) return <div>Загрузка...</div>;
        if (workFormatsError) return <div>Ошибка: {workFormatsError}</div>;

        const values = Object.entries(workFormats);
        if (!values || values?.length === 0) {
            return <div>Нет данных</div>;
        }

        return <ul className="flex flex-col items-center">
            <li className='text-[#dededeff] text-[14px] w-fit font-medium font-roboto'>
                Предпочитаю работать</li>
            <ul className="flex flex-row flex-wrap gap-x-3 items-center">
                {values.filter(([key, value]) => key !== 'id') // фильтруем id
                    .map(([key, value], index) => (
                    <li key={`workFormat_${index}`} className='text-[#dededeff] text-[12px] font-light font-roboto'>
                        {WORK_FORMATS[key]}</li>
                ))}
            </ul>
        </ul>
    }

    return (
        <div className={styles['resume-v2']}>
            <div className={`${styles['profile']} flex flex-col w-full h-full gap-3 items-center`}>
                <header className={styles['header']}>
                    <Span variant="invert">Основная информация</Span>
                    <ProtectedImage
                        src={profileData?.avatar ? `${profileData?.avatar}` : ''}
                        alt="avatar"
                        className={styles.avatar}
                        fallback={defaultAvatar}
                    />
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-row gap-2'>
                            {profileData?.first_name !== '*****' &&
                                <h1 className='text-white text-[18px] font-normal font-roboto'>
                                    {profileData?.first_name}</h1>
                            }
                            {profileData?.last_name !== '*****' &&
                                <h1 className='text-white text-[18px] font-normal font-roboto'>
                                    {profileData?.last_name}</h1>
                            }
                        </div>
                        {profileData?.profession !== '*****' &&
                            <p className='text-[#dededeff] text-[14px] font-light font-roboto'>
                                {profileData?.profession}</p>
                        }
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-row gap-2'>
                            {profileData?.city !== '*****' &&
                                <p className='text-[#dededeff] text-[14px] w-fit font-medium font-roboto'>
                                    {profileData?.city}</p>
                            }
                            {profileData?.country !== '*****' &&
                                <p className='text-[#dededeff] text-[14px] w-fit font-medium font-roboto'>
                                    {profileData?.country}</p>
                            }
                        </div>
                        {profileData?.relocation && profileData?.relocation !== '*****' &&
                            <p className='text-[#dededeff] text-[12px] font-light font-roboto'>
                                Готов к переезду в {profileData?.relocation}</p>
                        }
                    </div>
                    {workFormats && renderWorkFormats()}
                </header>
                <main>
                    <section className={styles.second}>
                        <Span variant="invert">Владение родными и инстранными языками</Span>
                        <WorkLanguage />
                    </section>
                    <section className={styles.third}>
                        <section className={styles.first}>
                            <Span variant="invert">Владение инструментами и технологиями</Span>
                            <WorkSkill />
                        </section>
                    </section>
                </main>
                <footer>
                    <Span variant="invert">Средства связи</Span>
                    <div className='flex flex-row gap-x-4 flex-wrap items-center justify-center'>
                        {profileData?.link_to_telegram && profileData?.link_to_telegram !== '*****' &&
                            <a href={profileData?.link_to_telegram} target="_blank">
                                <img className='w-6'
                                    src={iconTelegram} alt="telegram" />
                            </a>
                        }
                        {profileData?.link_to_github && profileData?.link_to_github !== '*****' &&
                            <a href={profileData?.link_to_github} target="_blank">
                                <img className='w-6'
                                    src={iconGitHub} alt="github" />
                            </a>
                        }
                        {profileData?.link_to_vk && profileData?.link_to_vk !== '*****' &&
                            <a href={profileData?.link_to_vk} target="_blank">
                                <img className='w-6'
                                    src={iconVk} alt="vkontakte" />
                            </a>
                        }
                    </div>
                </footer>
                
            </div>
            {/* // onSubmit={handleSubmit}
            // encType="multipart/form-data"> */}
            {/* <Title>Профиль</Title> */}
            <div className={styles['divider']}></div>
            <div className={styles.resume}>
                <header className={styles['header']}>
                    <Span variant="invert">Коротко о себе</Span>
                    {profileData?.full_desc !== '*****' &&
                        <p className='text-[#dededeff] text-[14px] font-light font-roboto border-[1px] border-[#ffffff55] rounded-[12px] p-2'>
                            {profileData?.full_desc}
                            {/* {profileData?.full_desc && profileData?.full_desc?.length > 100
                                ? `${profileData?.full_desc.slice(0, 100)}...`
                                : profileData?.full_desc} */}
                        </p>
                    }
                </header>
                <main className="flex flex-col w-full">
                    <div className="flex flex-row gap-x-3">
                        <Span variant="invert">Опыт работы</Span>
                        <Span variant="primary">Повышение квалификации</Span>
                        <Span variant="primary">Портфолио</Span>
                    </div>
                    <ResumeView userId={userId}></ResumeView>
                </main>
                {/* <section className={styles.first}>
                    
                    {workExperiences.map((exp) => (
                        <div className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                            <WorkExperience
                                key={exp.id}
                                exp={exp}/>
                            {exp.results.map((res) => (
                                <WorkResult
                                    key={res.id}
                                    res={res}
                                    epxId={exp.id}/>
                            ))}
                        </div>
                    ))}
                </section> */}
            </div>
        </div>
    )
}

export default Resume;
