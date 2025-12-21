import { useEffect, useRef, useState } from "react"
import { API_BASE_URL, API_DATA, LINKS } from "@/constants";
import { API_ENDPOINTS } from "@/api/endpoints";
import { Link } from "react-router-dom";
import UserIcon from "@/features/users/UserIcon";
import UserView from "@/views/UserView"
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useUserList, useUserView } from "@/hooks/useUser";
import HorisontalWheelList from "@/components/ui/Wheel/HorisontalWheel";
import ResumeView from "@/views/ResumeView";
import Sidebar from "@/features/sidebar/Sidebar";

function UserList() {
    const containerRef = useRef();
    
    const { userId, setProfileStatus, updatedProfile } = useGlobalState();

    const { profiles, isLoading, error } = useUserList();
    const {
        userView, isLoading: userLoading, error: userError,
        seletedUser, updateSelectedUser
    } = useUserView();

    const handleWheel = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        const scrollAmount = e.deltaY * 5
        containerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' // Плавная прокрутка
        });
    };

    console.log(profiles)

    const handleClick = (profile) => {
        console.log(profile);
        updateSelectedUser(profile.user);
    }

    const renderUserList = () => {
        if (isLoading) {
            return <div>Loading data...</div>
        }

        if (error) {
            return <div>Failed to fetch: {error}</div>
        }

        // const entries = Object.entries(profiles);
        if (!profiles || profiles?.length === 0) {
            return <div>No data...</div>
        }

        return profiles.map((profile) => (
            <li key={profile.user}
                onClick={() => handleClick(profile)}
                >
                <UserIcon user={profile} />
            </li>
        ))
    }

    const renderUserView = () => {
        return seletedUser && <ResumeView userId={seletedUser}></ResumeView>
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row w-200 items-center">
                <div className="bg-[#828282ff] w-[12px] h-25 rounded-l-[12px]"></div>
                {/* <div ref={containerRef} className='scrollable-container' onWheel={handleWheel}>
                    {renderUserList()}
                </div> */}
                <HorisontalWheelList>
                    {renderUserList()}
                </HorisontalWheelList>
                <div className="bg-[#828282ff] w-[12px] h-25 rounded-r-[12px]"></div>
            </div>
            <Sidebar requestedUserId={seletedUser}></Sidebar>
            {renderUserView()}
        </div>
    )
}

export default UserList
