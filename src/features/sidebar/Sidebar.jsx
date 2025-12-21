import styles from './Sidebar.module.css'
import defaultWallpaper from '@/assets/images/defaults/default-wallpaper.svg'
import defaultMaleAvatar from '@/assets/images/defaults/default-avatar.svg'
import iconVk from '@/assets/icons/vk.svg';
import iconTelegram from '@/assets/icons/telegram.svg';
import iconGitHub from '@/assets/icons/github-mark-white.svg';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useActionData, useLoaderData, useLocation, useParams } from 'react-router-dom'
import { API_BASE_URL, API_DATA, API_ENDPOINTS, LOCATIONS } from '@/constants';
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import ActionButton from '@/components/ui/Button/ActionButton';
import ProtectedImage from '@/components/ui/Image/ProtectedImage';
import ReactModal from 'react-modal';
import LogoutForm from '@/features/auth/components/LogoutForm';
import Span from '@/components/ui/Label/Span';
import { useSidebar } from '@/hooks/useSidebar';

const initialState = {
    profile: {},
    status: "loading",
}

function reducer(state, action) {
    switch (action.type) {
        case "profileData":
            return {
                ...state,
                profile: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error"
            };
        case "logout":
            return {
                ...state,
                status: "logout"
            }
        default:
            console.log(state);
            return
    }
}

export default function Sidebar({ requestedUserId = undefined }) {
    // const location = useLocation();
    // const params = useParams();
    // const [state, dispatch ] = useReducer(reducer, initialState);
    // const { userId, setProfileStatus, updatedProfile, showUserbar } = useGlobalState();

    // console.log(location.pathname.match(/\/users|\/profiles\//))
    // console.log(location.pathname)
    // console.log(params)
    // console.log(updatedProfile)
    // console.log(userId, localStorage.getItem('auth:userId'));
    
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             let apiEndpoint = API_ENDPOINTS.PROFILES.CRUD(localStorage.getItem('auth:userId'));
    //             const apiGetDataConfig = API_DATA('GET');
    //             console.log(apiEndpoint);
    //             if (location.pathname.match(/\/users$/)){
    //                 // apiEndpoint = API_ENDPOINTS.USERS.PROFILE.GET(params?.userId);
    //                 apiEndpoint = API_ENDPOINTS.PROFILES.CRUD(requestedUserId);
    //             }
    //             console.log(apiEndpoint);
    //             const response = await fetch(
    //                 `${API_BASE_URL}${apiEndpoint}`, apiGetDataConfig
    //             );
    //             if (!response.ok) {
    //                 throw new Error(`Failed to fetch! Error: ${response.status}`)
    //             }
    //             const data = await response.json()
    //             dispatch({ type: "profileData", payload: data })
    //             setProfileStatus('new');
    //         } catch (error) {
    //             dispatch({ type: "dataFailed", payload: error });
    //             setProfileStatus('error');
    //         }
    //     };
    //     if (localStorage.getItem('auth:accessToken')){
    //         fetchData();
    //     }
    // }, [userId, requestedUserId, location.pathname, updatedProfile])

    // if (!localStorage.getItem('auth:accessToken')) {
    //     return;
    // }

    // if (state.status === "loading"){
    //     return <p className='text-[#dededeff]'>Loading data, please wait...</p>
    // }
    // if (state.status === "error"){
    //     return <p className='text-[#dededeff]'>Failed to fetch data. Please try again!</p>
    // }

    // console.log(`sidebar - ${state?.profile?.wallpaper}`);
    // console.log(`sidebar - ${location?.pathname}`);
    // console.log(`sidebar - ${showUserbar}`);

    const { profileData, isLoading, error } = useSidebar(requestedUserId);

    const renderSidebar = () => {
        if (isLoading) {
            return <div>Data loading...</div>
        }

        if (error) {
            return <div>Error...</div>
        }

        const entries = Object.entries(profileData);
        if (!entries || entries.length === 0) {
            return <div>No data...</div>
        }

        return <div className={styles.sidebox}>
                    {/* hidden={showUserbar}> */}
            
            <ProtectedImage
                src={profileData?.wallpaper ? `${profileData.wallpaper}` : ''}
                alt="wallpaper"
                className={`${styles.wallpaper} ${'object-center'}`}
                fallback={defaultWallpaper}
            />
            <div className={styles.sidesection}>
                <div role='empty-box'></div>
                <div className='relative flex content-center items-center w-full h-full rounded-[12px] bg-[#202020bb]'>
                    {/* <div className='absolute left-0.5 scale-150'>
                        <Span>{'<'}</Span>
                    </div> */}
                    <div className="flex flex-col w-full h-full gap-3 items-center justify-center m-3 p-3 border-1 rounded-[12px] border-[#828282ff]">
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
                        <div className='flex items-center justify-center'>
                            {profileData?.full_desc !== '*****' &&
                                <p className='text-white text-[12px] font-normal leading-[18px] tracking-[0%] text-center font-roboto'>
                                    {profileData?.full_desc && profileData?.full_desc?.length > 100
                                        ? `${profileData?.full_desc.slice(0, 100)}...`
                                        : profileData?.full_desc}
                                </p>
                            }
                        </div>
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
                    </div>
                </div>
            </div>
            <ProtectedImage
                src={profileData?.avatar ? `${profileData?.avatar}` : ''}
                alt="avatar"
                className={styles.avatar}
                fallback={defaultMaleAvatar}
            />                       
        </div>
    }

    return (
        <>
            {renderSidebar()}
        {/* <div className={styles.sidebox} hidden={showUserbar}>
            
            <ProtectedImage
                src={state?.profile?.wallpaper ? `${state.profile.wallpaper}` : ''}
                alt="wallpaper"
                className={`${styles.wallpaper} ${'object-center'}`}
                fallback={defaultWallpaper}
            />
            <div className={styles.sidesection}>
                <div role='empty-box'></div>
                <div className='relative flex content-center items-center w-full h-full rounded-[12px] bg-[#202020bb]'>
                    <div className="flex flex-col w-full h-full gap-3 items-center justify-center m-3 p-3 border-1 rounded-[12px] border-[#828282ff]">
                        <div className='flex flex-col justify-center items-center'>
                            <div className='flex flex-row gap-2'>
                                {state.profile.first_name !== '*****' &&
                                    <h1 className='text-white text-[18px] font-normal font-roboto'>
                                        {state.profile.first_name}</h1>
                                }
                                {state.profile.last_name !== '*****' &&
                                    <h1 className='text-white text-[18px] font-normal font-roboto'>
                                        {state.profile.last_name}</h1>
                                }
                            </div>
                            {state.profile.profession !== '*****' &&
                                <p className='text-[#dededeff] text-[14px] font-light font-roboto'>
                                    {state.profile.profession}</p>
                            }
                        </div>
                        <div className='flex items-center justify-center'>
                            {state.profile.full_desc !== '*****' &&
                                <p className='text-white text-[12px] font-normal leading-[18px] tracking-[0%] text-center font-roboto'>
                                    {state?.profile?.full_desc && state?.profile?.full_desc?.length > 100
                                        ? `${state.profile.full_desc.slice(0, 100)}...`
                                        : state.profile.full_desc}
                                </p>
                            }
                        </div>
                        <div className='flex flex-row gap-x-4 flex-wrap items-center justify-center'>
                            {state.profile.link_to_telegram && state.profile.link_to_telegram !== '*****' &&
                                <a href={state.profile.link_to_telegram} target="_blank">
                                    <img className='w-6'
                                        src={iconTelegram} alt="telegram" />
                                </a>
                            }
                            {state.profile.link_to_github && state.profile.link_to_github !== '*****' &&
                                <a href={state.profile.link_to_github} target="_blank">
                                    <img className='w-6'
                                        src={iconGitHub} alt="github" />
                                </a>
                            }
                            {state.profile.link_to_vk && state.profile.link_to_vk !== '*****' &&
                                <a href={state.profile.link_to_vk} target="_blank">
                                    <img className='w-6'
                                        src={iconVk} alt="vkontakte" />
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ProtectedImage
                src={state.profile.avatar ? `${state.profile.avatar}` : ''}
                alt="avatar"
                className={styles.avatar}
                fallback={defaultMaleAvatar}
            />                       
        </div> */}
        {/* <div className='absolute z-10 flex content-center items-center w-full h-full px-3 rounded-[12px] bg-[#202020ee]'>
            <div className="flex flex-col w-full h-full gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                <LogoutForm />
            </div>
        </div> */}
        </>
    );
}
