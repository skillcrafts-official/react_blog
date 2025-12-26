import { API_ENDPOINTS } from "@/api/endpoints";
import { API_BASE_URL, API_DATA } from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom";

export const useUserList = () => {
    const [profiles, setProfiles] = useState([]);
    const [seletedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserList = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.LIST}`, API_DATA("GET")
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setProfiles(data);
            return data;
        } catch (error) {
            console.log('Failed to fetch user list with error:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList])

    const value = useMemo(() => ({
        /**
         * Data
         */
        profiles,
        seletedUser,
        isLoading,
        error,
        /**
         * Methods
         */
        fetchUserList,
    }), [
        profiles,
        seletedUser,
        isLoading,
        error,
        fetchUserList,
    ])

    return value
}

export const useUserView = (userId = null) => {
    const [userView, setUserView] = useState({});
    const [seletedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserProfiles = useCallback(async (profile) => {
        if (!userId && !seletedUser) {
            return ;
        }
        setIsLoading(true);
        setError(null);
        console.log('Fetching...')
        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.CRUD(profile)}`,
                API_DATA("GET")
            )

            if (!response.ok) {
                throw new Error('Failed to fetch...');
            }

            const data = await response.json();
            setUserView(data);
            return data;
        } catch (error) {
            console.log('Failed to fetch with error:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [userId, seletedUser])

    const updateSelectedUser = useCallback((update) => {
        setSelectedUser(update);
    }, [])

    useEffect(() => {
        if (userId) {
            fetchUserProfiles(userId);
        }
    }, [userId, fetchUserProfiles])

    useEffect(() => {
        if (seletedUser) {
            fetchUserProfiles(seletedUser);
        }
    }, [seletedUser, fetchUserProfiles, updateSelectedUser])

    const value = useMemo(() => ({
        /**
         * Data
         */
        userView,
        seletedUser,
        isLoading,
        error,
        /**
         * Methods
         */
        fetchUserProfiles,
        updateSelectedUser
    }), [
        userView,
        seletedUser,
        isLoading,
        error,
        fetchUserProfiles,
        updateSelectedUser
    ])
    return value
}