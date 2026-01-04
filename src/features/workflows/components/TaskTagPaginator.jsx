import Span from "@/components/ui/Label/Span"
import styles from "./TaskTagPaginator.module.css"
import ClickableSpan from "@/components/ui/Label/ClickableSpan"
import { useTaskTags } from "@/hooks/useWorkfolw"
import { useEffect, useState } from "react"
import Input from "@/components/ui/Input/Input"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useWorkflowState } from "@/lib/providers/WorkflowProvider"

function TaskTagPaginator(
    {
        taskList,
        handleChange = () => null
    }
) {
    const [tagsChecked, setTagsChecked] = useState([]);
    const { searchParams, handleSearchParams} = useWorkflowState();
    const navigate = useNavigate();

    const taskTags = taskList.flatMap(task => task.tags);

    const addParamWithNavigate = (key, value) => {
        const params = new URLSearchParams(searchParams);
        console.log(params.get('tags'));
        let values = params.get('tags')?.split(',');
        if (values && values[0] === '') {
            values = values.slice(1);
        }
        if (values.includes(value)) {
            values = values.filter(item => item !== value);
        } else {
            values = typeof(values) === 'object' ? [...new Set([...values, value])] : [value];
        }
        // setTagsChecked(values);
        console.log(values)
        params.set(key, values.join(',')); 
        console.log(params)
        handleSearchParams(params)
        navigate(`?${params.toString()}`, { replace: true });
        handleChange(params);
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const values = params.get('tags')?.split(',');
        setTagsChecked(values);
    }, [searchParams])

    function counter(arr) {
        return arr.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
    }

    const renderTaskTagList = () => {
        // if (isLoading) {
        //     return <div>Data loading...</div>
        // }
        // if (error) {
        //     return <div>Loading with error {error}</div>
        // }
        if (!taskTags || taskTags.length === 0){
            return <ClickableSpan variant='secondary'
                key={`noTags`}
                isActive={false}>
                    задач нет...
            </ClickableSpan>
        }
        console.log(Object.keys(counter(taskTags)))
        return Object.entries(counter(taskTags))
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count], index) => 
            <ClickableSpan variant='secondary'
                key={`tag_${index}`}
                isActive={tagsChecked.includes(tag)}
                // currentValue={searchParams.get('tags')}
                onClick={() => addParamWithNavigate('tags', tag)}>
                    {tag} <sup><strong>{count}</strong></sup>
            </ClickableSpan>
        )
    }

    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-1 mx-1">
            {renderTaskTagList()}
        </div>
    )
}

export default TaskTagPaginator;
