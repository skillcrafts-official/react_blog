import styles from './WorkExperience.module.css';

import Input from '@/components/ui/Input/Input';
import Span from '@/components/ui/Label/Span';
import { useEffect, useState } from 'react';
import ActionButton from '@/components/ui/Button/ActionButton';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '@/constants';
import { useWorkExperience } from '@/hooks/useResume';
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import WorkResult from './WorkResult';

function WorkExperience({ exp, children }) {
    const [isEdit, setIsEdit] = useState(false);
    const { userId } = useGlobalState();

    const {
        id, 
        company,
        indastry_desc,
        start_year,
        end_year,
        start_position,
        final_position,
        is_current,
        update,
        reset
    } = useWorkExperience();

    useEffect(() => {
        update({ ...exp });
    }, [exp])
    
    console.log(exp)
    
    // Добавляем состояние для загрузки
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Обработчик сабмита формы
    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        console.log(exp.id)
        try {
            const formData = new FormData(event.target);
            console.log(event.target)
            const expData = {
                // company: "Test Test Company",
                // profile: Number(userId),
                // start_year: 2024
                company: formData.get('company'),
                indastry_desc: formData.get('industryDesc'),
                start_position: formData.get('startPosition'),
                final_position: formData.get('finalPosition'),
                start_year: formData.get('startYear'),
                end_year: formData.get('endYear'),
                is_current: formData.get('isCurrent') || false,
                profile: Number(userId),
            };

            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.RESUME.WORK_EXPERIENCE.PATCH(exp.id)}`,
                    API_DATA("PATCH", expData)
            );

            if (!response.ok) {
                throw new Error(`Failed to update profile`);
            }

            const data = await response.json();
            update({ ...data })
            console.log('Profile updated:', data);
                        
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Ошибка при обновлении профиля');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        // <div className="flex flex-col w-full h-full gap-3 items-center justify-center m-3 p-3 border-1 rounded-[12px] border-[#828282ff]"></div>
        <form 
            key={exp.id} 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
            <ul className={`${styles.li} flex w-full flex-col`}>
                <li onClick={() => setIsEdit(!isEdit)}>
                    <ul className={`${styles.li} flex flex-row justify-between`}>
                        <li>{company}</li>
                        <ul className={`${styles.li} flex flex-row gap-2`}>
                            {is_current ? (
                                <li>в настоящем</li>
                            ) : (
                                <>
                                    <li>{start_year}</li>
                                    <li>{'-'}</li>
                                    <li>{end_year}</li>
                                </>
                            )}
                        </ul>
                    </ul>
                    {children}
                </li>
                <ul className={`${styles.li} ${!isEdit ? styles.hidden : 'flex w-full flex-col gap-5 p-5'}`}>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="company" type="text"
                            isProtected
                            fieldValue={exp.company}
                            privacyValue={exp.company}
                            labelValue="С кем вы сотрудничали?"
                            placeholder="Наименовании организации"/>
                    </li>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="industryDesc" type="text"
                            isProtected
                            fieldValue={exp.indastry_desc}
                            privacyValue={exp.indastry_desc}
                            labelValue="В какой сфере?"
                            placeholder="Введите сферу деятельности"/>
                    </li>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="startYear" type="number"
                            isProtected
                            fieldValue={exp.start_year}
                            privacyValue={exp.start_year}
                            labelValue="Когда начали?"
                            placeholder="Введите год начала сотрудничества"/>
                    </li>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="endYear" type="number"
                            isProtected
                            fieldValue={exp.end_year}
                            privacyValue={exp.end_year}
                            labelValue="Когда завершили?"
                            placeholder="Введите год завершения сотрудничества"/>
                    </li>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="startPosition" type="text"
                            isProtected
                            fieldValue={exp.start_position}
                            privacyValue={exp.start_position}
                            labelValue="С какой позиции начала?"
                            placeholder="Введите стартовую роль"/>
                    </li>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="finalPosition" type="text"
                            isProtected
                            fieldValue={exp.final_position}
                            privacyValue={exp.final_position}
                            labelValue="На какой позиции завершили"
                            placeholder="Введите финальную роль"/>
                    </li>
                </ul>
            </ul>
            <ActionButton 
                type="submit" 
                hidden={!isEdit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </ActionButton>
        </form>
    )
}

export default WorkExperience
