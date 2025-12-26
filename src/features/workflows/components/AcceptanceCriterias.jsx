import { useAcceptanceCriteria } from '@/hooks/useWorkfolw'
import styles from './AcceptanceCriterias.module.css'
import { useState } from "react"
import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Input/Textarea';
import Span from '@/components/ui/Label/Span';

function AcceptanceCriterias({
    task = {}, handleClick = () => null
}) {
    const [isEdit, setIsEdit] = useState(false);
    const { 
        acceptanceCriterias, isCreating, error,
        updateSelectedCriteria, updateCriteriaDone,
    } = useAcceptanceCriteria(task);
    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    };
    const rengerAcceptanceCriterias = () => {
        return <ul className='flex flex-row flex-wrap gap-1 gap-x-3 self-start'>
            {acceptanceCriterias.map(criteria => 
                <li key={criteria.id}>
                    <p onClick={() => updateCriteriaDone({ id: criteria.id, is_done: !criteria.is_done })}
                        className={`${styles['primary']} ${criteria.is_done && styles['completed']}`}>
                        {criteria.criteria}
                    </p>
                </li>)}
            <li key='addNewSkill'
                className={`${styles.primary} ${styles.low}`}
                onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? 'Скрыть' : 'Добавить критерий'}
            </li>
        </ul>
    }

    return (
        <div className="flex flex-col gap-y-3 w-fit h-fit">
            {/* <ul className={`flex flex-row flex-wrap`}> */}
            <Span variant='secondary-invert'>Критерии готовности</Span>
                {rengerAcceptanceCriterias()}
            {/* </ul> */}
            {isEdit && <>
                <hr className="border-red-100"/>
                <Textarea
                    rows="2"
                    // fieldValue={taskTitle}
                    placeholder="Сформулируйте критерий"
                    getFloppy isManuallySaved
                    fetchFunc={updateSelectedCriteria}/>
            </>}
        </div>
    )
}

export default AcceptanceCriterias
