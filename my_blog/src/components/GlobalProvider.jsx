import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const isLogin = localStorage.getItem("auth:accessToken") ? "login" : "logout"
    const [userId, setUserId] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [logStatus, setLogStatus] = useState(isLogin);
    const [updatedProfile, setUpdatedProfile] = useState(0);
    const [profileStatus, setProfileStatus] = useState('old');

    useEffect(() => {
      const storedUser = localStorage.getItem('auth:userId');
      const storedToken = localStorage.getItem('auth:accessToken');
        
      if (storedUser && storedToken) {
        setUserId(storedUser);
        setAccessToken(storedToken)
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
    return (
        <GlobalContext.Provider
            value={{
                accessToken, logStatus, userId, updatedProfile, profileStatus,
                handleAccess, handleLogStatus, handleUserId, setUpdatedProfile,
                setProfileStatus
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