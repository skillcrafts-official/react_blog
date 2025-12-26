import Span from "@/components/ui/Label/Span"
import StatusPaginator from "@/features/workflows/components/StatusPaginator";
import { useWorkflowTaskList } from "@/hooks/useWorkfolw"
import TaskWidget from "@/widgets/Workflow/TaskWidget"

function Workflow() {
    const {
        taskList, isLoading, error,
        updateStatusFilter
    } = useWorkflowTaskList();
    console.log(typeof updateStatusFilter)
    const renderTaskList = () => {
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
            <TaskWidget task={task}/>
        )
    }

    return (
        <div className="flex flex-col gap-5 items-center">
            <div className="flex flex-row flex-wrap gap-10">
                <Span>Направление 1</Span>
                <Span>Направление 2</Span>
                <Span>Направление 3</Span>
            </div>
            <StatusPaginator
                handleChange={updateStatusFilter}/>
            {/* <div className="grid grid-cols-2 grid-rows-2 gap-5 max-w-200 m-5"> */}
            <div className="flex flex-col flex-wrap justify-center items-start gap-5 max-w-200 ">
                {renderTaskList()}
            </div>
        </div>
    )
}

export default Workflow
