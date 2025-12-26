import styles from './Header.module.css'
import defaultAvatar from '@/assets/images/defaults/default-avatar.svg'

import { NavLink, useActionData, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Input from "@/components/ui/Input/Input";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { LINKS } from "@/constants";
import { ROUTES } from "@/constants";
import FloppyDisk from "@/components/ui/Button/FloppyDisk";
import { useUserList, useUserView } from '@/hooks/useUser';
import ProtectedImage from '@/components/ui/Image/ProtectedImage';

function Header() {
    const actionData = useActionData();
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)

    const {
        userId,
        setUserId,
        currentLocation,
        logStatus,
        selectedPost,
        handleSidebarModalView
    } = useGlobalState();
    const { userView } = useUserView(userId);
    
    console.log(userView?.avatar);
    const hasAccessToken = localStorage.getItem('auth:accessToken')?.length > 0 ? true : false
    const hasGuestToken = localStorage.getItem('auth:guestToken')?.length > 0 ? true : false
    
    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         // e.preventDefault();
    //         const query = e.target.value.trim();
    //         if (query) {
    //             navigate(`/search?q=${encodeURIComponent(query)}`);
    //         }
    //     }
    // };
    const [ isLogin, setIsLogin ] = useState(logStatus);

    useEffect(() => {
        setIsLogin(logStatus);
    }, [logStatus])

    // function handleClick() {
    //     // setIsLogin(localStorage.getItem('auth:refresh_token'));
    //     navigate("/auth/logout")
    // }

    // const location = useLocation()

    // function handleClick(event) {
    //     if (location.pathname === '/search') {
    //         event.preventDefault();
    //         window.location.reload();
    //     }
    // }
    const handleProfileClick = () => {
        console.log(userId, localStorage.getItem('auth:userId'));
        if (userId !== localStorage.getItem('auth:userId')){
            setUserId(localStorage.getItem('auth:userId'));
        }
    }

    return (
        // <div className="flex flex-row justify-between w-dvw items-center p-4 bg-[#0d0d0dff] shadow-header rounded-b-[12px]">
        <div className={styles.menubox}>
            {/* {(hasAccessToken | hasGuestToken) ? <nav className='header'> */}
            <nav className='header'>
                <ul className="flex flex-row flex-wrap-reverse gap-y-1 gap-x-4 justify-center items-center">
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to='/'>
                            {/* // onClick={handleProfileClick}> */}
                            Главная
                        </NavLink>
                    </li>
                    {(hasAccessToken | hasGuestToken) && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={LINKS.PROFILES.DETAIL(localStorage.getItem('auth:userId'))}
                            onClick={handleProfileClick}
                            >
                            Мой Профиль
                        </NavLink>
                    </li>}
                    {hasAccessToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={LINKS.RESUME.DETAIL(localStorage.getItem('auth:userId'))}
                            // onClick={handleProfileClick}
                            >
                            Моё резюме
                        </NavLink>
                    </li>}
                    {hasAccessToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={ROUTES.WORKFLOWS.USER.LIST}
                            // to={LINKS.RESUME.DETAIL(localStorage.getItem('auth:userId'))}
                            // onClick={handleProfileClick}
                            >
                            Мои дела
                        </NavLink>
                    </li>}
                    {hasAccessToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        {/* <NavLink to={ROUTES.SUBSCRIBES.LIST}> */}
                        <NavLink to={ROUTES.USERS.LIST}>
                            Подписки
                        </NavLink>
                    </li>}
                    {hasGuestToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={ROUTES.USERS.LIST}
                            // onClick={handleProfileClick}
                            >
                            Пользователи
                        </NavLink>
                    </li>}
                </ul>
            </nav>
            {/* <ul className="flex flex-row flex-wrap gap-6 justify-center items-center">
                {/\/post\/[/d]/.test(location.pathname) &&
                    <li className="text-white text-[14px] font-[900] font-roboto uppercase">
                        {`${currentLocation && currentLocation?.length > 20 ? `${currentLocation.slice(0, 10)}...` : currentLocation}`}
                    </li>
                }
            </ul> */}
            <ProtectedImage 
                src={userView?.avatar}
                alt="User Avatar"
                className={styles.avatar}
                fallback={defaultAvatar}/>
            <nav className='header'>
                <ul className="flex flex-row flex-wrap-reverse gap-y-1 gap-x-3 justify-center items-center">
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase text-center">
                    {hasAccessToken && 
                        (location.pathname === '/' && 
                            <NavLink to={ROUTES.POSTS.EDITOR}>
                                Создать статью
                            </NavLink>
                         || 
                        location.pathname === '/workflows' &&
                            <NavLink to={ROUTES.WORKFLOWS.USER.CREATE_TASK}>
                                Создать задачу
                            </NavLink>)}
                    </li>
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase text-center">
                        {hasAccessToken && 
                            <NavLink to={`/search${searchParams ? '?' : ''}${searchParams}`} 
                            // className="text-white text-[11px] font-[400] font-roboto uppercase"
                                >
                                Найти
                            </NavLink>}
                    </li>
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase text-center">
                        {isLogin == "logout" ? (
                            <NavLink to={"/auth/login"}
                                onClick={() => handleSidebarModalView(true)}>
                                Войти
                            </NavLink>
                        ) : (
                            <NavLink to="/auth/logout"
                                onClick={() => handleSidebarModalView(true)}>
                                    Выйти
                            </NavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
