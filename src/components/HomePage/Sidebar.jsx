import styles from './Sidebar.module.css'
import defaultWallpaper from '../../assets/images/defaults/default-wallpaper.svg'
import defaultMaleAvatar from '../../assets/images/defaults/default-avatar.svg'
import iconVk from '../../assets/icons/vk.svg';
import iconTelegram from '../../assets/icons/telegram.svg';
import iconGitHub from '../../assets/icons/github-mark-white.svg';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useActionData, useLoaderData } from 'react-router-dom'
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../../constants';
import { useGlobalState } from '../GlobalProvider';
import ActionButton from '../singles/ActionButton';
import ProtectedImage from '../singles/ProtectedImage';

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

export default function Sidebar() {
    const [state, dispatch ] = useReducer(reducer, initialState);
    const { userId, setProfileStatus, updatedProfile } = useGlobalState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE.GET(localStorage.getItem('auth:userId'))}`, 
                    API_DATA("GET")
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch! Error: ${response.status}`)
                }
                const data = await response.json()
                dispatch({ type: "profileData", payload: data })
                setProfileStatus('new');
            } catch (error) {
                dispatch({ type: "dataFailed", payload: error });
                setProfileStatus('error');
            }
        };
        if (userId) {
            fetchData();
        }
    }, [userId, updatedProfile])

    if (state.status === "loading"){
        return <p className='text-[#dededeff]'>Loading data, please wait...</p>
    }
    if (state.status === "error"){
        return <p className='text-[#dededeff]'>Failed to fetch data. Please try again!</p>
    }

    console.log(state.profile.wallpaper);
    return (
        <div className={styles.sidebox}>
            <ProtectedImage
                src={`${state.profile.wallpaper}`}
                alt="wallpaper"
                className={`${styles.wallpaper} ${'object-center'}`}
                fallback={defaultWallpaper}
            />
            <ProtectedImage
                src={`${state.profile.avatar}`}
                alt="avatar"
                className={styles.avatar}
                fallback={defaultMaleAvatar}
            />
            <div className={styles.userInfo}>
                <div className='flex flex-col justify-center '>
                    <h1 className='text-white text-[18px] font-normal font-roboto'>
                        {state.profile.first_name} {state.profile.last_name}</h1>
                    <p className='text-[#dededeff] text-[14px] font-light font-roboto'>
                        {state.profile.profession}</p>
                </div>
                <div className='flex items-center justify-center w-[250px]'>
                    <p className='text-white text-[12px] font-normal leading-[18px] tracking-[0%] text-right font-roboto'>
                        {state.profile.full_desc && state.profile.full_desc.length > 100
                            ? `${state.profile.full_desc.slice(0, 100)}...`
                            : state.profile.full_desc}
                    </p>
                </div>
                <div className='flex flex-row gap-x-4 flex-wrap items-center justify-center'>
                    {state.profile.link_to_telegram &&
                        <a href={state.profile.link_to_telegram} target="_blank">
                            <img className='w-6'
                                src={iconTelegram} alt="telegram" />
                        </a>
                    }
                    {state.profile.link_to_github &&
                        <a href={state.profile.link_to_github} target="_blank">
                            <img className='w-6'
                                src={iconGitHub} alt="github" />
                        </a>
                    }
                    {state.profile.link_to_vk &&
                        <a href={state.profile.link_to_vk} target="_blank">
                            <img className='w-6'
                                src={iconVk} alt="vkontakte" />
                        </a>
                    }
                </div>
            </div>
        </div>
    );
}
