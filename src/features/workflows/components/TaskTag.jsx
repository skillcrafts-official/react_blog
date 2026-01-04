import Input from "@/components/ui/Input/Input";
import Span from "@/components/ui/Label/Span"
import { useState } from "react";

function TaskTag({
    taskTags,
    handleUpdate = () => null,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const renderTaskTags = () => {
        return taskTags.map((tag, index) => <li key={`tag_${index}`}>
                <Span variant='link'>
                    {tag}
                </Span>
            </li>)
    }
    return (
        <div className="flex flex-col">
            <ul className='flex flex-row flex-wrap gap-1 gap-x-3 self-start'>
                {renderTaskTags()}
            </ul>
            <ul>
                <li key='addNewTag'
                    // className={`${styles.primary} ${styles.low}`}
                    onClick={() => setIsEdit(!isEdit)}>
                    <Span>{isEdit ? 'Скрыть' : 'Добавить тег'}</Span>
                </li>
                {isEdit &&
                    <Input isManuallySaved
                        fetchFunc={handleUpdate}/>}
            </ul>
        </div>
    )
}

export default TaskTag
