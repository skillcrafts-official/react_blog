import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const isLogin = localStorage.getItem("auth:accessToken") ? "login" : "logout"
    const [userId, setUserId] = useState("");
    const [selectedPost, setSelectedPost] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [logStatus, setLogStatus] = useState(isLogin);
    const [updatedProfile, setUpdatedProfile] = useState(0);
    const [profileStatus, setProfileStatus] = useState('old');
    const [currentLocation, setCurrentLocation] = useState('')
    const [showUserbar, setShowUserber] = useState(false);
    
    const [isOpenSidebarModalView, setIsOpenSidebarModalView] = useState(false);

    useEffect(() => {
      const storedUser = localStorage.getItem('auth:userId');
      const storedToken = localStorage.getItem('auth:accessToken');
        
      if (storedUser && storedToken) {
        setUserId(storedUser);
        setAccessToken(storedToken)
        setLogStatus('login');
        // setShowUserber(true); 
      }
    }, []);

    function handleUserId(id) {
        setUserId(id);
    }

    async function handleAccess(token) {
        setAccessToken(token);
    }
    function handleLogStatus(status) {
        setLogStatus(status);
    }
    function handleSidebarModalView(isOpen) {
        setIsOpenSidebarModalView(isOpen)
    }
    function handleShowUserbar(isShow) {
        setShowUserber(isShow);
    }
    return (
        <GlobalContext.Provider
            value={{
                accessToken, logStatus, userId, updatedProfile, profileStatus,
                selectedPost, showUserbar, handleShowUserbar,
                currentLocation, setCurrentLocation,
                isOpenSidebarModalView, handleSidebarModalView,
                handleAccess, handleLogStatus, handleUserId, setUpdatedProfile,
                setProfileStatus, setSelectedPost
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;

export function useGlobalState() {
    const context = useContext(GlobalContext);
    return context;
}