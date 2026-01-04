import Span from "@/components/ui/Label/Span"
import styles from "./ProjectPaginator.module.css"
import ClickableSpan from "@/components/ui/Label/ClickableSpan"
import { useProject } from "@/hooks/useWorkfolw"
import { useState } from "react"
import Input from "@/components/ui/Input/Input"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useWorkflowState } from "@/lib/providers/WorkflowProvider"

function ProjectPaginator(
    {
        profile,
        handleChange = () => null
    }
) {
    const [isPrjAdded, setIsPrjAdded] = useState(false);
    const { searchParams, handleSearchParams} = useWorkflowState();
    const navigate = useNavigate();

    const {
        projects,
        isLoading, isUpdating, error,
        createProject
    } = useProject(profile);

    const addParamWithNavigate = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (params.get('project') !== 'value') {
            params.set('tags', '');
        }
        console.log(params.get('project'))
        params.set(key, value);
        console.log(params)
        handleSearchParams(params)
        navigate(`?${params.toString()}`, { replace: true });
        handleChange(params);
    };

    const renderProjectList = () => {
        if (isLoading) {
            return <div>Data loading...</div>
        }
        if (error) {
            return <div>Loading with error {error}</div>
        }
        if (!projects || projects.length === 0){
            return <div>No data...</div>
        }

        return projects.map(prj => 
            <ClickableSpan variant='secondary'
                key={`${prj?.id}`}
                currentValue={searchParams.get('project')}
                onClick={() => addParamWithNavigate('project', prj?.name)}>
                    {prj?.name}
            </ClickableSpan>
        )
    }

    return (
        <div className="flex flex-row flex-wrap gap-x-5 gap-y-3 justify-center">
            {renderProjectList()}
            <ClickableSpan title="Добавить направление/проект"
                variant='link'
                key="addNewProject"
                onClick={() => setIsPrjAdded(!isPrjAdded)}>
                {isPrjAdded === false ? 'Добавить...' : 'Скрыть'}
            </ClickableSpan>
            {isPrjAdded && 
                <Input placeholder="Например, 'Карьера', 'Учёба' или 'Спорт'"
                    isManuallySaved
                    labelValue="Добавить новое направление"
                    fetchFunc={createProject}/>
            }
        </div>
    )
}

export default ProjectPaginator
