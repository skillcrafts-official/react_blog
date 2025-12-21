import { API_ENDPOINTS } from "@/api/endpoints";
import { API_BASE_URL, API_DATA } from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useSidebar = (requestedUserId) => {
    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfileData = useCallback(async () => {
        if (!requestedUserId) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.CRUD(requestedUserId)}`,
                API_DATA("GET")
            )

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setProfileData(data);
            return data;
        } catch (error) {
            console.log('Failed to fetch with error message:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [requestedUserId])

    useEffect(() => {
        if (requestedUserId) {
            fetchProfileData();
        }
    }, [requestedUserId, fetchProfileData])

    const value = useMemo(() => ({
        /**
         * Data
         */
        profileData,
        userData,
        isLoading,
        error,
        /**
         * Methods
         */
        fetchProfileData,
    }), [
        profileData,
        userData,
        isLoading,
        error,
        fetchProfileData,
    ])

    return value;
}