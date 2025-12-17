import styles from './Header.module.css'

import { NavLink, useActionData, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Input from "@/components/ui/Input/Input";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { LINKS } from "@/constants";
import { ROUTES } from "@/constants";
import FloppyDisk from "@/components/ui/Button/FloppyDisk";

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
    const hasToken = localStorage.getItem('auth:accessToken')?.length > 0 ? true : false
    
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
            <nav className='header'>
                <ul className="flex flex-row flex-wrap gap-6 justify-center items-center">
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to='/'
                            onClick={handleProfileClick}>
                            Главная
                        </NavLink>
                    </li>
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={LINKS.PROFILES.DETAIL(localStorage.getItem('auth:userId'))}
                            onClick={handleProfileClick}
                            >
                            Мой Профиль
                        </NavLink>
                    </li>}
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={LINKS.RESUME.DETAIL(localStorage.getItem('auth:userId'))}
                            // onClick={handleProfileClick}
                            >
                            Моё резюме
                        </NavLink>
                    </li>}
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={'/test/'}
                            // to={LINKS.RESUME.DETAIL(localStorage.getItem('auth:userId'))}
                            // onClick={handleProfileClick}
                            >
                            Мои дела
                        </NavLink>
                    </li>}
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={ROUTES.SUBSCRIBES.LIST}>
                            Подписки
                        </NavLink>
                    </li>}
                </ul>
            </nav>
            <ul className="flex flex-row flex-wrap gap-6 justify-center items-center">
                {/\/post\/[/d]/.test(location.pathname) &&
                    <li className="text-white text-[14px] font-[900] font-roboto uppercase">
                        {`${currentLocation && currentLocation?.length > 20 ? `${currentLocation.slice(0, 10)}...` : currentLocation}`}
                    </li>
                }
            </ul>
            <nav className='header'>
                <ul className="flex flex-row flex-wrap gap-6 justify-center items-center">
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={ROUTES.POSTS.EDITOR}>
                            Создать статью
                        </NavLink>
                    </li>}
                    {hasToken && <li className="text-white text-[11px] font-[400] font-roboto uppercase">
                        <NavLink to={`/search${searchParams ? '?' : ''}${searchParams}`} 
                        // className="text-white text-[11px] font-[400] font-roboto uppercase"
                            >
                            Найти
                        </NavLink>
                    </li>}
                    <li className="text-white text-[11px] font-[400] font-roboto uppercase">
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
