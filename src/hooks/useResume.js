/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useMemo, useEffect } from "react";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../constants";

export const useWorkSummary = (profile) => {
    const [workSummary, setWorkSummary] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWorkSummary = useCallback(async () => {
        if (!profile) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.RESUME.DETAIL(profile)}`,
                API_DATA("GET")
            )

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setWorkSummary(data);
            return data;
        } catch (error) {
            console.log('Failed to fetch with error:', error.message);
            setError(error.message);
            return error;
        } finally {
            setIsLoading(false);
        }
    }, [profile]);

    const updateSelectedUserId = useCallback((update) => {
        setSelectedUserId(update);
    }, []);

    useEffect(() => {
        if (profile) {
            fetchWorkSummary();
        }
    }, [profile, updateSelectedUserId, fetchWorkSummary]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        workSummary,
        selectedUserId,
        isLoading,
        error,
        /**
         * Methods
         */
        fetchWorkSummary,
        updateSelectedUserId,
    }),[
        workSummary,
        selectedUserId,
        isLoading,
        error,
        fetchWorkSummary,
        updateSelectedUserId,
    ]);

    return value;
}

export const useWorkExperience = (initialData = {}) => {
    const [state, setState] = useState({
        id: null,
        company: null,
        indastry_desc: null,
        start_year: null,
        end_year: null,
        start_position: null,
        final_position: null,
        is_current: null,
        ...initialData
    });
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const fetchWorkExperiences = useCallback(async () = {
    //     set
    // }, [])

    const update = useCallback((updates) => {
        setState(prev => ({...prev, ...updates}))
    }, [])

    const reset = useCallback(() => {
        setState({
            id: null,
            company: null,
            indastry_desc: null,
            start_year: null,
            end_year: null,
            start_position: null,
            final_position: null,
            is_current: null,
            ...initialData
        })
    }, [initialData])

    const value = useMemo(() => ({
        /**
         * data
         */
        ...state,
        /**
         * methods
         */
        update,
        reset
    }), [
        state, update,reset
    ])

    return value
}

export const useWorkResult = (initialData = {}) => {
    const [state, setState] = useState({
        id: null,
        result: null,
        ...initialData
    });

    const update = useCallback((updates) => {
        setState(prev => ({...prev, ...updates}))
    }, [])

    const reset = useCallback(() => {
        setState({
            id: null,
            result: null,
            ...initialData
        })
    }, [initialData])

    const value = useMemo(() => ({
        /**
         * data
         */
        ...state,
        /**
         * methods
         */
        update,
        reset
    }), [
        state, update, reset
    ])

    return value
}

export const useLanguage = (profile) => {
    /**
     * Хук для управлением списом языков с кэшированием
     * 
     * 1. Загрузка списка государственных языков
     * 2. Загрузка списка языков пользователя
     * 3. Обновление списка пользователя (добавление и удаление)
     */
    const [userLanguages, setUserLanguages] = useState({});
    const [allLanguages, setAllLanguages] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [loadingLanguages, setLoadingLanguages] = useState(false);
    const [updatingLanguages, setUpdatingLanguages] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllLanguages = useCallback(async () => {
        /**
         * Загрузка списка языков
         */
        setLoadingLanguages(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.RESUME.LANGUAGE.DISPLAY.NAMES}`,
                API_DATA('GET')
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllLanguages(data);
            return data;
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setLoadingLanguages(false);
        }
    }, [])

    const fetchUserLanguages = useCallback(async () => {
        /**
         * Загрузка списка языков
         */
        if (!profile) {
            console.log('Profile is not defined, skipping fetchUserLanguages');
            return;
        }

        setLoadingLanguages(true);
        setError(null);
        console.log('Fetching user languages for profile:', profile);
        console.log('Endpoint:', API_ENDPOINTS.RESUME.LANGUAGE.RETRIEVE(profile));
        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.RESUME.LANGUAGE.RETRIEVE(profile)
                }`,
                API_DATA('GET')
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserLanguages(data);
            return data;
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setLoadingLanguages(false);
        }
    }, [profile])

    const updateUserLanguages = useCallback(async (payload) => {
        /**
         * Обновление списка языков пользователя
         */
        setUpdatingLanguages(true);
        setError(null);
        
        console.log('Updating user languages with payload:', payload);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.RESUME.LANGUAGE.CREATE}`,
                API_DATA('POST', payload)
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserLanguages( prev => ([ ...prev, data]));
            return data;
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setUpdatingLanguages(false);
        }
    }, [selectedLanguage])

    const deleteUserLanguage = useCallback(async (languageId) => {
        /**
         * Удаление языка из списка пользователя
         */
        if (!profile) {
            console.error('Profile is required for deletion');
            return;
        }

        setUpdatingLanguages(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.RESUME.LANGUAGE.UD(languageId, profile)
                }`,
                API_DATA('DELETE')
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setUserLanguages( prev =>
                Object.values(prev).filter(language =>
                    language.id !== languageId
                )
            );
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setUpdatingLanguages(false);
        }
    }, [profile])
    
    const updateSelectedLanguage = useCallback((language) => {
        console.log('Setting selected language:', language);
        setSelectedLanguage(language)
    }, []);

    const refreshAllLanguages = useCallback(() => {
        return fetchAllLanguages();
    }, [fetchAllLanguages])

    useEffect(() => {
        /**
         * Загрузка языков пользователя, когда profile доступен
         */
        if (profile) {
            console.log('Profile changed, fetching user languages');
            fetchUserLanguages();
        }
    }, [profile, fetchUserLanguages])

    useEffect(() => {
        /**
         * Автоматическая загрузка всех языков при монтировании
         */
        fetchAllLanguages();
    }, [fetchAllLanguages]);

    useEffect(() => {
        /**
         * Обрабатка выбранного языка
         */
        if (selectedLanguage && profile && Object.keys(allLanguages)?.length > 0) {
            console.log('Selected language changed:', selectedLanguage);

            // Поиск ключа языка по значению
            const languageEntry = Object.entries(allLanguages).find(
                ([key, value]) => key === selectedLanguage
            )
            console.log('Selected language entry:', languageEntry);
            if (languageEntry) {
                const [key, value] = languageEntry;
                const payload = {
                    profile,
                    name: key
                }
                console.log('Updating with payload:', payload);
                updateUserLanguages(payload);
            } else {
                console.warn('Selected language not found in allLanguages:', selectedLanguage);
            }
        } else {
            console.log('Selected language changed:', selectedLanguage);
        }
    }, [selectedLanguage,
        profile,
        allLanguages,
        updateUserLanguages,
        updateSelectedLanguage
    ]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        userLanguages,
        allLanguages,
        selectedLanguage,
        loadingLanguages,
        updatingLanguages,
        error,
        
        /**
         * Methods
         */
        fetchAllLanguages,
        fetchUserLanguages,
        updateUserLanguages,
        deleteUserLanguage,
        updateSelectedLanguage,
        refreshAllLanguages,
    }), [
        userLanguages,
        allLanguages,
        selectedLanguage,
        loadingLanguages,
        updatingLanguages,
        error,
        fetchAllLanguages,
        fetchUserLanguages,
        updateUserLanguages,
        deleteUserLanguage,
        updateSelectedLanguage,
        refreshAllLanguages,
    ]);

    return value;
};

export const useLanguageLevel = (language, profile) => {
    /**
     * Хук для управления уровнем владения языка
     * 
     * 1. Загрузка стандартных уровней
     * 2. Загрузка уровня для language
     * 3. Изменение уровня владения языком
     */
    const [languageLevel, setLanguageLevel] = useState({});
    const [allLanguageLevels, setAllLanguageLevels] = useState({});
    const [selectedLanguageLevel, setSelectedLanguageLevel] = useState(null);
    const [loadingLevels, setLoadingLevels] = useState(false);
    const [updatingLevel, setUpdatingLevel] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllLevels = useCallback(async () => {
        /**
         * Загрузка списка уровней
         */
        setLoadingLevels(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.RESUME.LANGUAGE.DISPLAY.LEVELS}`,
                API_DATA('GET')
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllLanguageLevels(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setLoadingLevels(false);
        }
    }, [])

    const updateLanguageLevel = useCallback(async (payload) => {
        /**
         * Обновление уровня владения языком для
         * параметров language и profile
         */
        if (!profile && !language) {
            console.log('Profile or language is not defined, skipping fetchLanguageLevel');
            return;
        }

        setUpdatingLevel(true);
        setError(null);
        console.log('Updating user language level for profile:', profile);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.RESUME.LANGUAGE.UD(language.id, profile)
                }`,
                API_DATA('PATCH', payload)
            );

            if (!response.ok) {
                console.log(payload)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLanguageLevel(data);
            return data;
        } catch (error) {
            setError(error.message);
            console.error('Error fetching language choices:', error);
            return null;
        } finally {
            setUpdatingLevel(false);
        }
    }, [language, profile])

    const refreshAllLevels = useCallback(() => {
        return fetchAllLevels();
    }, [fetchAllLevels])

    const updateSelectedLevel = useCallback((update) => {
        setSelectedLanguageLevel(update)
    }, [])

    useEffect(() => {
        /**
         * Загрузка уровня владения языком, когда доступны
         * параметры language и profile
         */
        if (language && profile) {
            console.log('Profile and language changed, updating user language level...');
            updateLanguageLevel();
        }
    }, [
        profile,
        language,
        updateLanguageLevel
    ])

    useEffect(() => {
        /**
         * Автоматическая загрузка при монтировании
         */
        fetchAllLevels();
    }, [fetchAllLevels])

    useEffect(() => {
        /**
         * Обработка уровня владения языком
         */
        if (language && profile && selectedLanguageLevel) {
            const payload = {
                id: language.id,
                level: selectedLanguageLevel
            }
            console.log(payload)
            updateLanguageLevel(payload);
        }
    }, [
        language,
        profile,
        selectedLanguageLevel,
        updateSelectedLevel,
        updateLanguageLevel
    ])

    const value = useMemo(() => ({
        /**
         * data
         */
        languageLevel,
        allLanguageLevels,
        selectedLanguageLevel,
        loadingLevels,
        updatingLevel,
        error,
        /**
         * methods
         */
        refreshAllLevels,
        fetchAllLevels,
        updateSelectedLevel,
        updateLanguageLevel,
    }), [
        languageLevel,
        allLanguageLevels,
        selectedLanguageLevel,
        loadingLevels,
        updatingLevel,
        error,
        refreshAllLevels,
        fetchAllLevels,
        updateSelectedLevel,
        updateLanguageLevel,
    ])

    return value
}
