import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const isLogin = localStorage.getItem("auth:accessToken") ? "login" : "logout"
    const [userId, setUserId] = useState("");
    const [guestId, setGuestId] = useState("");
    const [selectedPost, setSelectedPost] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [guestToken, setGuestToken] = useState("");
    const [logStatus, setLogStatus] = useState(isLogin);
    const [updatedProfile, setUpdatedProfile] = useState(0);
    const [profileStatus, setProfileStatus] = useState('old');
    const [currentLocation, setCurrentLocation] = useState('')
    const [showUserbar, setShowUserber] = useState(false);
    
    const [isOpenSidebarModalView, setIsOpenSidebarModalView] = useState(false);

    useEffect(() => {
      const storedUser = localStorage.getItem('auth:userId');
      const storedGuestUser = localStorage.getItem('auth:guestId');
      const storedAccessToken = localStorage.getItem('auth:accessToken');
      const storedGuestToken = localStorage.getItem('auth:guestToken');
        
      if (storedUser && storedAccessToken) {
        setUserId(storedUser);
        setAccessToken(storedAccessToken)
        setLogStatus('login');
        // setShowUserber(true); 
      } else if (storedGuestUser && storedGuestToken) {
        setGuestId(storedGuestUser);
        setGuestToken(storedGuestToken)
        setLogStatus('login');
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
                setProfileStatus, setSelectedPost,
                guestId, guestToken
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