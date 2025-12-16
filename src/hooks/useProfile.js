import { useCallback, useEffect, useMemo, useState } from "react";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../constants";
import { replace } from "react-router-dom";

export const useWorkFormat = (profile) => {
    /**
     * Хук для управления предпочтительным форматом работы
     * 1. Обновление формата работы
     */
    const [workFormats, setWorkFormats] = useState({});
    const [selectedWorkFormat, setSelectedWorkFormat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    console.log('Hook ready for profile:', profile);

    const fetchWorkFormats = useCallback(async () => {
        /**
         * Загрузка предпочитаемых форматов работы
         */
        console.log('fetchWorkFormats ready for use...');
        if (!profile) {
            console.log('Profile is not defined, skipping fetchWorkFormats');
            return;
        }

        setIsLoading(true);
        setError(null);
        console.error('Fetching work formats for:', profile);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.PROFILES.WORK_FORMATS.CRUD(profile)
                }`,
                API_DATA("GET")
            );
        
            if (!response.ok) {
                throw new Error('Loading failed');
            }
            const data = await response.json();
            setWorkFormats(data)
            return data;
        } catch(error) {
            console.error('Error:', error);
            setError(error.message);
            return;
        } finally {
            setIsLoading(false);
        }
    }, [profile]);

    const updateWorkFormat = useCallback(async (payload) => {
        if (!profile) {
            return;
        }

        console.log('Updating work formats with payload:', payload)

        setIsUpdating(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.PROFILES.WORK_FORMATS.CRUD(profile)
                }`,
                API_DATA("PATCH", payload)
            );
        
            if (!response.ok) {
                throw new Error('Update failed');
            }
            const data = await response.json();
            setWorkFormats(data)
            return data;
        } catch(error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [profile]);

    const updateSelectedWorkFormat = useCallback((update) => {
        console.log('Updating work formats with selected format:', { [update]: !workFormats[update] })
        setSelectedWorkFormat({ [update]: !workFormats[update] })
    }, [workFormats])

    useEffect(() => {
        /**
         * Загрузка предпочитаемых форматов работы при монтировании
         * если есть и profile
         */
        console.log('useEffect ready for use...');
        if (profile) {
            console.log('Profile changed, fetching user work formats');
            fetchWorkFormats();
        }
        console.log('Profile not changed, skipping fetchWorkFormats');
    }, [profile, fetchWorkFormats]);

    useEffect(() => {
        /**
         * Обновление предпочитаемого формата работы,
         * если есть profile
         */
        if (profile) {
            console.log('Updating work format:', selectedWorkFormat);
            updateWorkFormat(selectedWorkFormat);
        }
    }, [profile, selectedWorkFormat, updateWorkFormat]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        workFormats,
        isLoading,
        isUpdating,
        error,
        /**
         * Methods
         */
        fetchWorkFormats,
        updateWorkFormat,
        updateSelectedWorkFormat,
    }), [
        workFormats,
        isLoading,
        isUpdating,
        error,
        fetchWorkFormats,
        updateWorkFormat,
        updateSelectedWorkFormat,
    ]);

    return value;
}

export const useEducatonLevel = (profile) => {
    /**
     * Хук для управления уровнем образования
     * 1. Загрузка списка официальных уровне в России
     * 2. Обновление текущего уровня образования пользователя
     */
    const [userEducationLevel, setUserEducationLevel] = useState(null);
    const [educationLevels, setEducationLevels] = useState({});
    const [selectedEduLevel, setSelectedEduLevel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const fetchEduLevels = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS
                    .PROFILES.DISPLAYS.EDUCATION_LEVELS}`,
                API_DATA('GET')
            )

            if (!response.ok) {
                throw new Error('Fetching education levels failed!')
            }

            const data = await response.json()
            setEducationLevels(data);
            return data;
        } catch (error) {
            console.log('Fetch failed:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const fetchUserEduLevel = useCallback(async () => {
        if (!profile) {
            return;
        }

        console.log('Fetching user education level with profile:', profile);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.CRUD(profile)
                }`,
                API_DATA("GET")
            );
        
            if (!response.ok) {
                throw new Error('Load failed');
            }
            const data = await response.json();
            setUserEducationLevel(data.edu_level)
            return data;
        } catch(error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [profile])

    const updateUserEducationLevel = useCallback(async (payload) => {
        if (!profile) {
            return;
        }

        console.log('Updating education level with payload:', payload)

        setIsUpdating(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.CRUD(profile)
                }`,
                API_DATA("POST", payload)
            );
        
            if (!response.ok) {
                throw new Error('Update failed');
            }
            const data = await response.json();
            setUserEducationLevel(data.edu_level)
            return data;
        } catch(error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [profile])

    const updateSelectedEduLevel = useCallback((update) => {
        console.log('Updating selected education level with:', update)
        setSelectedEduLevel(update)
    }, [])

    useEffect(() => {
        if (profile) {
            fetchUserEduLevel();
        }
    }, [profile, fetchUserEduLevel])

    useEffect(() => {
        /**
         * Загружается один раз при монтировании
         */
        fetchEduLevels();
    }, [fetchEduLevels])

    useEffect(() => {
        /**
         * Обновляется уровень образования пользователя
         * при наличии profile и selectEduLevel
         */
        if (profile && selectedEduLevel) {
            console.log('Updating education level with:', selectedEduLevel);
            const payload = {
                edu_level: selectedEduLevel
            }
            updateUserEducationLevel(payload);
        }
    }, [profile, selectedEduLevel, updateUserEducationLevel])

    console.log(userEducationLevel)

    const value = useMemo(() => ({
        /**
         * Data
         */
        userEducationLevel,
        educationLevels,
        isLoading,
        isUpdating,
        error,
        /**
         * Methods
         */
        fetchEduLevels,
        updateUserEducationLevel,
        updateSelectedEduLevel,
    }), [
        userEducationLevel,
        educationLevels,
        isLoading,
        isUpdating,
        error,
        fetchEduLevels,
        updateUserEducationLevel,
        updateSelectedEduLevel,
    ]);

    return value;
}

export const useWorkSkill = (profile) => {
    const [allSkills, setAllSkills] = useState({});
    const [userSkills, setUserSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [enteredSkill, setEnteredSkill] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [status404, setStatus404] = useState(null);
    const [error, setError] = useState(null);

    const fetchAllSkills = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.SKILLS.DISPLAY}`,
                API_DATA("GET")
            )

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            console.log(data)
            setAllSkills(data);
            return data;
        } catch (error) {
            console.log('Fetching all skills was failed!', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [])

    const fetchUserSkills = useCallback(async () => {
        if (!profile) {
            return;
        }

        setIsLoading(true);
        setStatus404(null);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.SKILLS.CR(profile)}`,
                API_DATA("GET")
            )

            if (response.status === 404) {
                setStatus404(response.status);
                return;
            }
            if (!response.ok) {
                throw new Error('Fetch failed!');
            }

            const data = await response.json();
            console.log(data)
            setUserSkills(data);
            return data;
        } catch (error) {
            console.log('Failed to fetch with errors:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [profile])

    const createUserSkill = useCallback(async (payload) => {
        if (!profile) {
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.PROFILES.SKILLS.CR(profile)}`,
                API_DATA('POST', payload)
            )

            if (!response.ok) {
                throw new Error('Failed fetch!');
            }

            const data = await response.json();

            setUserSkills(prev => ([ ...prev, data ]));
            return data;
        } catch (error) {
            console.log('Creating user skill is failed with error', error.message);
            setError(error.message);
        } finally {
            setIsCreating(false);
        }
    }, [profile])

    const deleteUserSkill = useCallback(async (skill) => {
        if (!profile) {
            return;
        }
        
        setIsUpdating(true);
        setError(null);
        setStatus404(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.PROFILES.SKILLS.UD(profile, skill)
                }`, API_DATA('DELETE')
            );

            if (response.status === 404) {
                setStatus404(response.status);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to delete!')
            }

            setUserSkills(prev =>
                prev.filter(item => item.id !== skill)
            );
            return;
        } catch (error) {
            console.log('Failed with error:', error.message);
            setError(error);
            return null;
        } finally {
            setIsUpdating(false)
        }
    }, [profile])

    const updateEnteredSkill = useCallback(async (updates) => {
        setEnteredSkill(updates)
    }, [])

    useEffect(() => {
        /**
         * Загружает данные при монтировании, если есть profile
         */
        if (profile) {
            fetchUserSkills();
        }
    }, [profile, fetchUserSkills])

    useEffect(() => {
        fetchAllSkills();
    }, [fetchAllSkills])

    useEffect(() => {
        /**
         * Добавляет новый навык, если есть profile
         */
        if (profile && enteredSkill) {
            const payload = {
                skill_name: enteredSkill,
                cluster: 1,
                profile: profile,
            }
            createUserSkill(payload);
        }
    }, [profile, enteredSkill, updateEnteredSkill, createUserSkill])

    const value = useMemo(() => ({
        /**
         * Data
         */
        allSkills,
        userSkills,
        enteredSkill,
        isLoading,
        isUpdating,
        isCreating,
        /**
         * Errors
         */
        status404,
        error,
        /**
         * Methods
         */
        fetchUserSkills,
        updateEnteredSkill,
        createUserSkill,
        deleteUserSkill,
    }), [
        allSkills,
        userSkills,
        enteredSkill,
        isLoading,
        isUpdating,
        isCreating,
        status404,
        error,
        fetchUserSkills,
        updateEnteredSkill,
        createUserSkill,
        deleteUserSkill,
    ]);

    return value;
}

export const useSkillLevel = (profile, skill) => {
    const [skillLevel, setSkillLevel] = useState(skill.level);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState(skill.level);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateSkillLevel = useCallback(async (payload) => {
        if (!profile && !skill) {
            return;
        }

        setIsUpdating(true);
        setError(null);
        
        try {
            const resopnse = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.PROFILES.SKILLS.UD(profile, skill.id)
                }`, API_DATA('PATCH', payload)
            )

            if (!resopnse.ok) {
                throw new Error('Failed to update level!')
            }

            const data = await resopnse.json()
            setSkillLevel(data);
            return data;
        } catch (error) {
            console.log('Updating error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [profile, skill])

    const updateSelectedSkillLevel = useCallback(async (update) => {
        setSelectedSkillLevel(update)
    }, [])

    useEffect(() => {
        if (profile && skill) {
            console.log(selectedSkillLevel)
            const payload = {
                level: selectedSkillLevel
            }
            console.log(payload)
            updateSkillLevel(payload);
        }
    }, [profile, skill, selectedSkillLevel, updateSkillLevel])

    const value = useMemo(() => ({
        /**
         * Data
         */
        skillLevel,
        selectedSkillLevel,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSkillLevel,
        updateSelectedSkillLevel
    }), [
        skillLevel,
        selectedSkillLevel,
        isUpdating,
        error,
        updateSkillLevel,
        updateSelectedSkillLevel
    ])

    return value;
}