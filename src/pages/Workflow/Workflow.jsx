import ProjectPaginator from "@/features/workflows/components/ProjectPaginator";
import styles from "./Workflow.module.css"

import Span from "@/components/ui/Label/Span"
import StatusPaginator from "@/features/workflows/components/StatusPaginator";
import { useWorkflowTaskList } from "@/hooks/useWorkfolw"
import TaskWidget from "@/widgets/Workflow/TaskWidget"
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useEffect } from "react";
import TaskTagPaginator from "@/features/workflows/components/TaskTagPaginator";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useWorkflowState } from "@/lib/providers/WorkflowProvider";

function Workflow() {
    const { userId } = useGlobalState();
    const navigate = useNavigate();
    const location = useLocation();
    const { taskProject, setTaskProject } = useWorkflowState();

    const {
        taskList, isLoading, error,
        updateStatusFilter
    } = useWorkflowTaskList();

    console.log(localStorage.getItem('workflowSearchParams'))
    useEffect(() => {
        if (!location.search) {
            // Берем из localStorage или используем значения по умолчанию
            const savedParams = localStorage.getItem('workflowSearchParams') || 
                               '?project=Общее&status=in_progress&tags=';

            setTaskProject((new URLSearchParams(savedParams)).get('project'));
            console.log(taskProject);
            navigate({
                pathname: location.pathname,
                search: savedParams
            }, { replace: true });
            // updateStatusFilter(new URLSearchParams(savedParams));
        }
    }, [navigate, location])

    console.log(localStorage.getItem('workflowSearchParams'))

    const renderTaskList = (variant) => {
        if (isLoading) {
            return <div>Loading data...</div>
        }

        if (error) {
            return <div>Loading with error: {error}...</div>
        }

        if (!taskList || taskList?.length === 0) {
            return <div>No data...</div>
        }

        return taskList.map(task => 
            <TaskWidget variant={variant} task={task}/>
        )
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            {/* Для обычного человека это, по факту, направления (а не портфели) */}
            {/* <div className="flex flex-row flex-wrap gap-10">
                <Span variant="secondary-invert">Карьера</Span>
                <Span>Учёба</Span>
                <Span>Музыка</Span>
                <Span>Спорт</Span>
            </div> */}
            <ProjectPaginator profile={userId}
                handleChange={updateStatusFilter}/>
            {/* Это программы, они легко кладутся в теги
                <div className="flex flex-row flex-wrap gap-10">
                <Span>Бэкенд</Span>
                <Span>UI</Span>
                <Span>Тестирование</Span>
                <Span variant="secondary-invert">UX</Span>
                <Span>Маркетинг и продвижение</Span>
            </div> */}
            {/* Это проекты, они легко кладутся в теги
                <div className="flex flex-row flex-wrap gap-10">
                <Span variant="secondary-invert">МОИ ДЕЛА</Span>
                <Span>МОЁ РЕЗЮМЕ</Span>
                <Span>МОЙ ПРОФИЛЬ</Span>
                <Span>МОЙ БЛОГ</Span>
            </div> */}
            <StatusPaginator
                handleChange={updateStatusFilter}/>
            {/* <div className="grid grid-cols-2 grid-rows-2 gap-5 max-w-200 m-5"> */}
            {/* <div className="flex flex-col flex-wrap justify-center items-start gap-5 max-w-200 "> */}
            <div className="flex flex-row flex-wrap items-center gap-1">
                {/* <TaskFilter tags={workflowTags}/> */}
                <TaskTagPaginator taskList={taskList}
                    handleChange={updateStatusFilter}/>
            </div>
            <div className={`${styles['task-box']} ${styles['detailview']}`}>
                {renderTaskList('detailview')}
            </div>
        </div>
    )
}

export default Workflow
