import { useProject, useTaskProject } from "@/hooks/useWorkfolw";
import styles from "./ProjectTag.module.css"
import { useEffect, useState } from "react";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import Span from "@/components/ui/Label/Span";

function ProjectTag({ task }) {
    const [isEdit, setIsEdit] = useState(false);
    const { projects } = useProject(task?.profile);
    const [currentPrj, setCurrentPrj] = useState(task?.project);

    // console.log(Object.fromEntries(
    //     projects.map(item => [item.id, item.name])
    // ))
    // console.log(task?.project?.id)
    // console.log(Object.fromEntries(
    //     projects.map(item => [item.id, item.name])
    // )[task?.project?.id])
    console.log(task?.project)
    console.log(currentPrj)
    const { selectedTaskProject, updateSelectedTaskProject } = useTaskProject(task);

    useEffect(() => {
        if (selectedTaskProject?.id) {
            setCurrentPrj(selectedTaskProject);
        }
    }, [selectedTaskProject])

    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    };
    return (
        <div className="flex flex-col">
            <ul className='flex flex-row flex-wrap gap-1 gap-x-3 self-start'>
                <li key={currentPrj?.id}>
                    <Span variant='primary'>
                        {currentPrj?.name}
                    </Span>
                </li>
            </ul>
            <ul className='flex flex-row flex-wrap gap-1 gap-x-3 self-start'>
                <li key='addNewSkill'
                    // className={`${styles.primary} ${styles.low}`}
                    onClick={() => setIsEdit(!isEdit)}>
                    <Span>{isEdit ? 'Скрыть' : 'Добавить критерий'}</Span>
                </li>
            </ul>
            <ul className='flex flex-row flex-wrap gap-1 gap-x-3 self-start'>
                {isEdit && projects.map((prj) => 
                    <li key={`prj_${prj?.id}`}>
                        <Span onClick={() => updateSelectedTaskProject({ ...prj })}
                            variant="primary">
                            {prj?.name}
                        </Span>
                    </li>)}
            </ul>
        </div>
    )
}

export default ProjectTag
