import { API_ENDPOINTS } from "@/api/endpoints";
import { API_BASE_URL, API_DATA } from "@/constants";
import { useWorkflowState } from "@/lib/providers/WorkflowProvider";
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom";

export const useProject = (profile) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [createdProject, setCreatedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllUserProjects = useCallback(async () => {
        if (!profile) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log(`${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.PROJECTS.GET_OR_POST}`);
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.PROJECTS.GET_OR_POST}`,
                API_DATA("GET")
            )

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json()
            setProjects(data)
            return data;
        } catch (error) {
            console.log('Project list loading failed with error', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [profile]);

    const updateUserProjects = useCallback(async (payload) => {
        if (!profile || !createdProject){
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.PROJECTS.GET_OR_POST}`,
                API_DATA("POST", payload)
            )

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json()
            setProjects(prev => [...prev, data?.name])
        } catch (error) {
            console.log('Updating project list failed with error', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [profile, createdProject])

    const createProject = useCallback((project) => {
        setCreatedProject(project);
    }, [])

    useEffect(() => {
        if (profile) {
            fetchAllUserProjects();
        }
    }, [profile, fetchAllUserProjects]);

    useEffect(() => {
        if (profile && createdProject) {
            const payload = {
                profile,
                name: createdProject
            }
            updateUserProjects(payload);
        }
    }, [profile,createdProject, updateUserProjects])

    const value = useMemo(() => ({
        /**
         * Data
         */
        projects,
        selectedProject,
        isLoading,
        isUpdating,
        error,
        /**
         * Methods
         */
        fetchAllUserProjects,
        createProject,
        updateUserProjects,
    }), [
        projects,
        selectedProject,
        isLoading,
        isUpdating,
        error,
        fetchAllUserProjects,
        createProject,
        updateUserProjects,
    ]);

    return value;
}

export const useWorkflowTaskList = () => {
    const workflowSearchParams = localStorage.getItem('workflowSearchParams')
    // console.log(workflowSearchParams)
    // console.log(searchParams.get('project'))
    // console.log(searchParams.get('status'))
    const [statusFilter, setStatusFilter] = useState(workflowSearchParams);
    const [taskList, setTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTaskList = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log(`${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.LIST(statusFilter)}`)
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.LIST(statusFilter)}`,
                API_DATA("GET")
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskList(data);
            return data;
        } catch (error) {
            console.log('Failed to loading user task list with error:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter]);

    const updateStatusFilter = useCallback((searchParams) => {
        setStatusFilter(searchParams);
    }, []);

    useEffect(() => {
        fetchTaskList();
    }, [statusFilter, fetchTaskList]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskList,
        isLoading,
        error,
        /**
         * Methods
         */
        fetchTaskList,
        updateStatusFilter,
    }), [
        taskList,
        isLoading,
        error,
        fetchTaskList,
        updateStatusFilter,
    ]);

    return value;
}

export const useTaskPrivacy = (task, profile) => {
    const [taskPrivacy, setTaskPrivacy] = useState(task.privacy);
    const [selectedTaskPrivacy, setSelectedTackPrivacy] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTaskPrivacy = useCallback(async (payload) => {
        if (!task || !profile) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.GET_OR_PATCH_OR_DELETE(task.id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskPrivacy(data?.privacy);
            return data?.privacy;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task, profile])

    const updateSelectedTaskPrivacy = useCallback((update) => {
        setSelectedTackPrivacy(update);
    }, []);

    useEffect(() => {
        if (task, profile, selectedTaskPrivacy) {
            const payload = {
                "privacy": selectedTaskPrivacy,
                profile: parseInt(profile)
            }
            updateTaskPrivacy(payload);
        }
    }, [task, profile, selectedTaskPrivacy, updateTaskPrivacy]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskPrivacy,
        selectedTaskPrivacy,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedTaskPrivacy,
        updateTaskPrivacy,
    }), [
        taskPrivacy,
        selectedTaskPrivacy,
        isUpdating,
        error,
        updateSelectedTaskPrivacy,
        updateTaskPrivacy,
    ]);

    return value;
}

export const useTimeEntries = (task, profile) => {
    const [hoursSpents, setHoursSpents] = useState(task.hours_spent);
    const [hoursSpent, setHoursSpent] = useState(1);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTimeEntries = useCallback(async (payload) => {
        if (!task || !profile) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TIME_ENTRIES.GET_OR_POST(task.id)
                }`, API_DATA("POST", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setHoursSpents(data);
            return data;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task, profile])

    const updateHoursSpent = useCallback((update) => {
        setHoursSpent(update)
    }, [])

    useEffect(() => {
        if (task, profile) {
            const payload = {
                hours_spent: parseInt(hoursSpent),
                "task": parseInt(task.id),
                user: parseInt(profile)
            }
            console.log(payload)
            updateTimeEntries(payload);
        }
    }, [task, profile, hoursSpent, updateTimeEntries]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        hoursSpent,
        hoursSpents,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateTimeEntries,
        updateHoursSpent,
    }), [
        hoursSpent,
        hoursSpents,
        isUpdating,
        error,
        updateTimeEntries,
        updateHoursSpent,
    ]);

    return value;
}

export const useTaskPriority = (task, profile) => {
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const [selectedTaskPriority, setSelectedTackPriority] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTaskPriority = useCallback(async (payload) => {
        if (!task || !profile) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.GET_OR_PATCH_OR_DELETE(task.id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskPriority(data?.priority);
            return data?.priority;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task, profile])

    const updateSelectedTaskPriority = useCallback((update) => {
        setSelectedTackPriority(update);
    }, []);

    useEffect(() => {
        if (task, profile, selectedTaskPriority) {
            const payload = {
                "priority": selectedTaskPriority,
                profile: parseInt(profile)
            }
            updateTaskPriority(payload);
        }
    }, [task, profile, selectedTaskPriority, updateTaskPriority]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskPriority,
        selectedTaskPriority,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedTaskPriority,
        updateTaskPriority,
    }), [
        taskPriority,
        selectedTaskPriority,
        isUpdating,
        error,
        updateSelectedTaskPriority,
        updateTaskPriority,
    ]);

    return value;
}

export const useTaskTitle = (task, profile) => {
    const [taskTitle, setTaskTitle] = useState(task.todo);
    const [selectedTaskTitle, setSelectedTackTitle] = useState(null);
    const [isTitleEdited, setIsTitleEdited] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTaskTitle = useCallback(async (payload) => {
        if (!task || !profile) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.GET_OR_PATCH_OR_DELETE(task.id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskTitle(data?.todo);
            return data?.todo;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task, profile])

    const updateSelectedTaskTitle = useCallback((update) => {
        setSelectedTackTitle(update);
        setIsTitleEdited(false);
    }, []);

    useEffect(() => {
        if (task, profile, selectedTaskTitle) {
            const payload = {
                "todo": selectedTaskTitle,
                profile: parseInt(profile)
            }
            updateTaskTitle(payload);
        }
    }, [task, profile, selectedTaskTitle, updateTaskTitle]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskTitle,
        selectedTaskTitle,
        isTitleEdited,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedTaskTitle,
        updateTaskTitle,
        setIsTitleEdited
    }), [
        taskTitle,
        selectedTaskTitle,
        isTitleEdited,
        isUpdating,
        error,
        updateSelectedTaskTitle,
        updateTaskTitle,
        setIsTitleEdited
    ]);

    return value;
}

export const useTaskStatus = (task, profile) => {
    const [taskStatus, setTaskStatus] = useState(task.status);
    const [selectedTaskStatus, setSelectedTackStatus] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTaskStatus = useCallback(async (payload) => {
        if (!task || !profile) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.GET_OR_PATCH_OR_DELETE(task.id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskStatus(data?.status);
            return data?.status;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task, profile])

    const updateSelectedTaskStatus = useCallback((update) => {
        setSelectedTackStatus(update);
    }, []);

    useEffect(() => {
        if (task, profile, selectedTaskStatus) {
            const payload = {
                "status": selectedTaskStatus,
                profile: parseInt(profile)
            }
            updateTaskStatus(payload);
        }
    }, [task, profile, selectedTaskStatus, updateTaskStatus]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskStatus,
        selectedTaskStatus,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedTaskStatus,
        updateTaskStatus,
    }), [
        taskStatus,
        selectedTaskStatus,
        isUpdating,
        error,
        updateSelectedTaskStatus,
        updateTaskStatus,
    ]);

    return value;
}

export const useTaskTags = (task) => {
    const [taskTags, setTaskTags] = useState(task?.tags);
    const [selectedTaskTag, setSelectedTaskTag] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllTaskTags = useCallback(async () => {
        if (!task) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.WORKFLOWS.TASKS.TAGS.GET_OR_POST(task.id)}`,
                API_DATA("GET")
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json()
            setTaskTags(data);
            return data;
        } catch (error) {
            console.log('Failed to load task tags with errors:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [task])

    const updateTaskTags = useCallback(async (payload) => {
        if (!task || !selectedTaskTag) {
            return ;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.TAGS.GET_OR_POST(task.id)
                }`, API_DATA("POST", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskTags(data);
            return data;
        } catch (error) {
            console.log('Failed to update task tags with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [task, selectedTaskTag])

    const updateSelectedTaskTags = useCallback((params) => {
        setSelectedTaskTag(params);
    }, []);

    useEffect(() => {
        if (task) {
            fetchAllTaskTags();
        }
    }, [task, fetchAllTaskTags]);

    useEffect(() => {
        if (task && selectedTaskTag) {
            const payload = {
                name: selectedTaskTag
            };
            updateTaskTags(payload);
        }
    }, [task, selectedTaskTag, updateTaskTags])

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskTags,
        isLoading,
        isCreating,
        isUpdating,
        error,
        /**
         * Methods
         */
        fetchAllTaskTags,
        updateSelectedTaskTags
    }), [
        taskTags,
        isLoading,
        isCreating,
        isUpdating,
        error,
        fetchAllTaskTags,
        updateSelectedTaskTags
    ]);

    return value;
}

export const useAcceptanceCriteria = (task) => {
    const [acceptanceCriterias, setAcceptanceCriterias] = useState(task.criterias);
    const [selectedCriteria, setSelectedCriteria] = useState(null);
    const [criteriaDone, setCriteriaDone] = useState(null);
    const [isCriteriaEdited, setIsCriteriaEdited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const updateAcceptanceCriteria = useCallback(async (payload, criteria_id) => {
        if (!task) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.CRITERIAS.PATCH_OR_DELETE(task.id, criteria_id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setAcceptanceCriterias(prev => [...prev.filter(item => item.id !== data.id), data]);
            return data?.criteria;
        } catch (error) {
            console.log('Failed to update acceptance criteria status with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(false);
        }
    }, [task])

    const createAcceptanceCriteria = useCallback(async (payload) => {
        if (!task) {
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.CRITERIAS.GET_OR_POST(task.id)
                }`, API_DATA("POST", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            // console.log(acceptanceCriterias)
            // console.log(data)
            setAcceptanceCriterias(prev => [...prev, data]);
            // console.log(acceptanceCriterias)
            // console.log(data?.criteria)
            return data?.criteria;
        } catch (error) {
            console.log('Failed to update task acceptance criteria with error:', error.message);
            setError(error.message);
        } finally {
            setIsCreating(false);
        }
    }, [task])

    const updateSelectedCriteria = useCallback((update) => {
        setSelectedCriteria(update);
        setIsCriteriaEdited(false);
    }, []);

    const updateCriteriaDone = useCallback((update) => {
        setCriteriaDone(update);
    }, [])

    useEffect(() => {
        if (task && selectedCriteria) {
            const payload = {
                criteria: selectedCriteria
            }
            createAcceptanceCriteria(payload);
        }
    }, [task, selectedCriteria, createAcceptanceCriteria]);

    useEffect(() => {
        if (task && criteriaDone) {
            const payload = {
                is_done: criteriaDone.is_done
            }
            updateAcceptanceCriteria(payload, criteriaDone.id);
        }
    }, [task, criteriaDone, updateAcceptanceCriteria]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        acceptanceCriterias,
        selectedCriteria,
        isCriteriaEdited,
        isCreating,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedCriteria,
        updateCriteriaDone,
        createAcceptanceCriteria,
    }), [
        acceptanceCriterias,
        selectedCriteria,
        isCriteriaEdited,
        isCreating,
        isUpdating,
        error,
        updateSelectedCriteria,
        updateCriteriaDone,
        createAcceptanceCriteria,
    ]);

    return value;
}

export const useTaskProject = (task) => {
    const [taskProject, setTaskProject] = useState(task?.project);
    const [selectedTaskProject, setSelectedTaskProject] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateTaskProject = useCallback(async (payload) => {
        if (!task) {
            return;
        }

        setIsUpdating(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.WORKFLOWS.TASKS.PATCH_PROJECT(task.id)
                }`, API_DATA("PATCH", payload)
            );

            if (!response.ok) {
                throw new Error('Failed to fetch!');
            }

            const data = await response.json();
            setTaskProject(data);
            return data;
        } catch (error) {
            console.log('Failed to update task privacy with error:', error.message);
            setError(error.message);
        } finally {
            setIsUpdating(true);
        }
    }, [task])

    const updateSelectedTaskProject = useCallback((params) => {
        setSelectedTaskProject(params);
    }, []);

    useEffect(() => {
        if (task, selectedTaskProject) {
            const payload = {
                project: selectedTaskProject?.id,
            }
            updateTaskProject(payload);
        }
    }, [task, selectedTaskProject, updateTaskProject]);

    const value = useMemo(() => ({
        /**
         * Data
         */
        taskProject,
        selectedTaskProject,
        isUpdating,
        error,
        /**
         * Methods
         */
        updateSelectedTaskProject,
        updateTaskProject,
    }), [
        taskProject,
        selectedTaskProject,
        isUpdating,
        error,
        updateSelectedTaskProject,
        updateTaskProject,
    ]);

    return value;
}