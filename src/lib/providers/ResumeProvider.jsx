import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

const ResumeContext = createContext();

function ResumeProvider({ children }) {
    const isLogin = localStorage.getItem("auth:accessToken") ? "login" : "logout"
    const [experienceId, setExperienceId] = useState(null);
    const [company, setCompany] = useState(null);
    const [industryDesc, setIndustryDesc] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);

    // useEffect(() => {
    //   const storedUser = localStorage.getItem('auth:userId');
    //   const storedToken = localStorage.getItem('auth:accessToken');
        
    //   if (storedUser && storedToken) {
    //     setUserId(storedUser);
    //     setAccessToken(storedToken)
    //     setLogStatus('login');
    //     // setShowUserber(true); 
    //   }
    // }, []);

    const handleExperienceId = useCallback((id) => {
        setExperienceId(id);
    }, []);

    const handleCompany = useCallback((name) => {
        setCompany(name);
    }, []);

    const handleIndustryDesc = useCallback((desc) => {
        setIndustryDesc(desc);
    }, []);

    const handleStartYear = useCallback((year) => {
        setStartYear(year);
    }, []);

    const handleEndYear = useCallback((year) => {
        setEndYear(year);
    }, []);

    const handleStartPosition = useCallback((position) => {
        setStartPosition(position);
    }, []);

    const handleEndPosition = useCallback((position) => {
        setEndPosition(position);
    }, []);

    const workExperience = useMemo(() => ({
        /**
         * states
         */
        experienceId,
        company,
        industryDesc,
        startYear,
        endYear,
        startPosition,
        endPosition,
        /** 
         * handlers
        */
        handleExperienceId,
        handleCompany,
        handleIndustryDesc,
        handleStartYear,
        handleEndYear,
        handleStartPosition,
        handleEndPosition
    }), [
        experienceId,
        company,
        industryDesc,
        startYear,
        endYear,
        startPosition,
        endPosition,
        handleExperienceId,
        handleCompany,
        handleIndustryDesc,
        handleStartYear,
        handleEndYear,
        handleStartPosition,
        handleEndPosition
    ])
    // async function handleAccess(token) {
    //     setAccessToken(token);
    // }
    // function handleLogStatus(status) {
    //     setLogStatus(status);
    // }
    // function handleSidebarModalView(isOpen) {
    //     setIsOpenSidebarModalView(isOpen)
    // }
    // function handleShowUserbar(isShow) {
    //     setShowUserber(isShow);
    // }
    return (
        <ResumeContext.Provider
            value={{
                workExperience
            }}>
            {children}
        </ResumeContext.Provider>
    )
}

export default ResumeProvider;

export function useResumeState() {
    const context = useContext(ResumeContext);
    return context;
}