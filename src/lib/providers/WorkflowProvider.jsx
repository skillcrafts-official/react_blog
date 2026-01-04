import { createContext, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

const WorkflowContext = createContext();

function WorkflowProvider({ children }) {
    const [taskProjects, setTaskProjects] = useState([]);
    const [taskProject, setTaskProject] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSearchParams(paramsObj) {
        const params = new URLSearchParams(searchParams);
    
        Object.entries(paramsObj).forEach(([key, value]) => {
            params.set(key, value);
        });

        setSearchParams(params);
        localStorage.setItem('workflowSearchParams', new URLSearchParams(searchParams));
    }
    
    return (
        <WorkflowContext.Provider
            value={{
                taskProject, setTaskProject,
                searchParams, handleSearchParams
            }}>
            {children}
        </WorkflowContext.Provider>
    )
}

export default WorkflowProvider;

export function useWorkflowState() {
    const context = useContext(WorkflowContext);
    return context;
}