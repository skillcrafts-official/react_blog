import styles from "./WorkSkill.module.css";

import Input from "@/components/ui/Input/Input";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useState } from "react";
import { useWorkSkill } from "@/hooks/useProfile";
import SkillLevel from "./SkillLevel";

function WorkSkill() {
    const { userId } = useGlobalState();
    const [isActive, setIsActive] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    
    const {
        allSkills, userSkills, isLoading, isUpdating, isCreating,
        status404,error,
        updateEnteredSkill, deleteUserSkill
    } = useWorkSkill(userId);

    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    };

    const renderUserSkills = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (isUpdating) {
            return <div>Skill updating...</div>
        }
        if (status404 || !userSkills || userSkills.length === 0) {
            return <div>Ничего нет...</div>
        }
        if (error ) {
            return <div>Error {error}</div>
        }

        return userSkills.map(skill => (
            <li className="w-25">
                <ul className='flex flex-row w-25' >
                    <li key={`deleteSkill${skill.id}`}
                        className={`${styles.checkbox} ${styles[checkboxStyle['active']]}`}
                        onClick={() => deleteUserSkill(skill.id)}>
                            -</li>
                    <li key={`${skill.skill_name}${skill.id}`}
                        className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}>
                        <p className="text-nowrap">{skill.skill_info.name}</p>
                    </li>
                    <li key={`${skill.level}${skill.id}`}
                        className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}>
                        <SkillLevel
                            skill={skill}>
                        </SkillLevel>
                    </li>
                </ul>
        </li>
        ))
    }

    return (
        <div className="flex flex-col w-full h-fit">
            <ul className={`flex flex-row flex-wrap ${styles.li}`}>
                {renderUserSkills()}
                <li key='addNewSkill'
                    className={`${styles.checkbox} ${styles[checkboxStyle['active']]}`}
                    onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? '-' : '+'}
                </li>
            </ul>
            {isEdit && <>
                <hr className="border-red-100"/>
                <Input name="workSkill" type="text"
                    isProtected
                    isManuallySaved
                    isSearched
                    // labelValue="Добавить навык:"
                    fetchFunc={updateEnteredSkill}
                    placeholder="Введите название навыка"/>
            </>}
        </div>
    )
    // return (
    //     <Input name="workSkill" type="text"
    //         isProtected
    //         isManuallySaved
    //         labelValue="Добавить навык:"
    //         placeholder="Введите название навыка"/>
    // )
}

export default WorkSkill
