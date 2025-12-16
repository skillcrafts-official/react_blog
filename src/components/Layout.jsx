import styles2 from './Layout.module.css'

import { Outlet, useLocation } from "react-router-dom";
import Header from '@/features/sidebar/Header';
import Sidebar from "@/features/sidebar/Sidebar";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useEffect, useMemo, useState } from "react";
import UserList from '@/features/users/UserList';
import Span from './ui/Label/Span';

function Layout() {
  const location = useLocation().pathname;
  const pathname = useMemo(() => ({
    location
  }), [location]);
  const { showUserbar, handleShowUserbar } = useGlobalState();

  useEffect(() => {
    // handleShowUserbar(/\/subscribes/.test(location.pathname))
    handleShowUserbar(/\/subscribes/.test(pathname))
  }, [pathname])
  console.log(showUserbar)
  return (
    // <div id="header"className="flex flex-row min-h-screen min-w-[680px] max-w-[1000px] bg-[#181818ff]">
    <div id="header" className="flex flex-row min-h-screen w-full bg-[#181818ff]">
        <div className="flex flex-col gap-7 w-full justify-center items-center">
            <header className='sticky'>
                <Header/>
            </header>
            <Sidebar />
            {/\/users\/[\d]+/.test(location.pathname) && <UserList/>}
            <main className="main mb-7">
              <Outlet className="w-full"/>
            </main>
            
        </div>
    </div>
  );
}

export default Layout;