import styles from './Sidebar.module.css'
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
    const { userId, setProfileStatus } = useGlobalState();

    const containerRef = useRef();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE(localStorage.getItem('auth:userId'))}`, 
                    API_DATA("GET")
                );
                // console.log(`${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`)
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
    }, [userId, setProfileStatus])

    const handleWheel = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        const scrollAmount = e.deltaY
        containerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' // Плавная прокрутка
        });
    };

    if (state.status === "loading"){
        return <p className='text-[#dededeff]'>Loading data, please wait...</p>
    }
    if (state.status === "error"){
        return <p className='text-[#dededeff]'>Failed to fetch data. Please try again!</p>
    }

    return (
        <div className={styles.sidebox}>
            {/* <div className={styles.wallpaper}> */}
            <ProtectedImage
                src={state.profile.wallpaper === null ? (
                    "../src/assets/images/wallpaper.png"
                    ) : (`${API_BASE_URL}${state.profile.wallpaper}`
                )}
                alt="wallpaper"
                className={`${styles.wallpaper} ${'object-center'}`}
                fallback="/default-product.jpg"
            />
            <ProtectedImage
                src={state.profile.avatar === null ? (
                    "../src/assets/images/wallpaper.png"
                    ) : (`${API_BASE_URL}${state.profile.avatar}`
                )}
                alt="avatar"
                className={styles.avatar}
                fallback="/default-product.jpg"
            />
            <div className={styles.userInfo}>
                <div className='flex flex-col justify-center w-[200px]'>
                    <h1 className='text-white text-[18px] font-[400] font-roboto'>
                        {state.profile.first_name} {state.profile.last_name}</h1>
                    <p className='text-[#dededeff] text-[14px] font-[300] font-roboto'>
                        {state.profile.profession}</p>
                </div>
                <div className='flex items-center justify-center w-[300px]'>
                    <p className='text-white text-[12px] font-[400] leading-[18px] tracking-[0%] text-center font-roboto'>
                        {state.profile.full_desc && state.profile.full_desc.length > 100
                            ? `${state.profile.full_desc.slice(0, 100)}...`
                            : state.profile.full_desc}
                    </p>
                </div>
                <div className='flex flex-row gap-4 items-center justify-center'>
                    {state.profile.link_to_telegram &&
                        <a href={state.profile.link_to_telegram} target="_blank">
                            <img className='w-6'
                                src={"../../../public/-5027246994669780956/Logo.svg"} alt="telegram" />
                        </a>
                    }
                    {state.profile.link_to_github &&
                        <a href={state.profile.link_to_github} target="_blank">
                            <img className='w-6'
                                src="../../../public/github-mark-c791e9551fe4/github-mark/github-mark-white.svg" alt="github" />
                        </a>
                    }
                </div>
            </div>
            {/* </div> */}
            <div className='flex flex-row gap-3 items-center w-[800px]'>
            {/* {logStatus === "login" ? (
            <> */}
                <div className='relative flex flex-row items-center justify-start w-[full] h-[230px] mb-3'>

                    {/* <div className='absolute top-[130px]'>
                        <ProtectedImage
                            src={state.profile.avatar === null ? (
                                "../src/assets/images/wallpaper.png"
                                ) : (`${API_BASE_URL}${state.profile.avatar}`
                            )}
                            alt="avatar"
                            className='w-[100px] h-[100px] border-3 border-white object-cover rounded-full'
                            fallback="/default-product.jpg"
                        />
                        <div className='absolute top-0 right-0 rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                            <p>5</p>
                        </div>
                    </div> */}
                </div>
                {/* <div ref={containerRef} className='subscriptions' onWheel={handleWheel}>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                </div> */}
                {/* <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-white text-[18px] font-[400] font-roboto'>
                        {state.profile.first_name} {state.profile.last_name}</h1>
                    <p className='text-[#dededeff] text-[14px] font-[300] font-roboto'>
                        {state.profile.profession}</p>
                </div> */}
                {/* <div className='flex flex-row gap-4 items-center justify-center pb-3'>
                    <a href={state.profile.link_to_telegram} target="_blank">
                        <img className='w-6'
                            src={"../../../public/-5027246994669780956/Logo.svg"} alt="telegram" />
                    </a>
                    <a href={state.profile.link_to_github} target="_blank">
                        <img className='w-6'
                            src="../../../public/github-mark-c791e9551fe4/github-mark/github-mark-white.svg" alt="github" />
                    </a>
                </div> */}
                <hr className='border-1 w-[260px] border-[#1c1c1cff]' />
                <p className='text-white text-[12px] font-[400] leading-[18px] tracking-[0%] text-center py-3 px-5 font-roboto'>
                    {state.profile.full_desc}
                </p>
                <hr className='border-1 w-[260px] border-[#1c1c1cff]' />
                {/* <div className='flex flex-row gap-5 items-center justify-center p-4'>
                    <Link to="/profile/1/portfolio">
                        <button className='text-white font-roboto text-button bg-[#ed3024ff] rounded-full w-[120px] h-[40px]' type='button'>Мои работы</button>
                    </Link>
                    <button className='text-white font-roboto text-button bg-[#3137c9ff] rounded-full w-[120px] h-[40px]' type='button'>Написать мне</button>
                </div> */}
                <Link to={'/add-new-post/'}>
                    <ActionButton>
                        Создать пост
                    </ActionButton>
                </Link>
                
            {/* </>) : (<div></div>)} */}
            </div>
        </div>
    );
}
