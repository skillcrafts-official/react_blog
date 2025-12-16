import styles from './WorkExperience.module.css';

import Input from '@/components/ui/Input/Input';
import Span from '@/components/ui/Label/Span';
import { useEffect, useState } from 'react';
import ActionButton from '@/components/ui/Button/ActionButton';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '@/constants';
import { useWorkExperience, useWorkResult } from '@/hooks/useResume';
import { useGlobalState } from '@/lib/providers/GlobalProvider';

function WorkResult({ res, epxId }) {
    const [isEdit, setIsEdit] = useState(false);

    const { userId } = useGlobalState();
    const { id: resultId, result, update } = useWorkResult();

    useEffect(() => {
        update({ ...res });
    }, [res])
    
    console.log(res)
    
    // Добавляем состояние для загрузки
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Обработчик сабмита формы
    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        console.log(res.id)
        try {
            const formData = new FormData(event.target);
            console.log(event.target)
            const resData = {
                result: formData.get('result'),
                work_experience: epxId,
            };

            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS.RESUME.WORK_RESULT.PATCH(resultId, userId)}`,
                    API_DATA("PATCH", resData)
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
            key={resultId} 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
            <ul className={`${styles.li} flex w-full flex-col`}>
                <li onClick={() => setIsEdit(!isEdit)}>
                    <ul className={`${styles.li} flex flex-row justify-between`}>
                        <ul className={`${styles.li} flex flex-row gap-2`}>
                            <li>{result}</li>
                        </ul>
                    </ul>
                </li>
                <ul className={`${styles.li} ${!isEdit ? styles.hidden : 'flex w-full flex-col gap-5 p-5'}`}>
                    <li className={`${styles.experience} ${!isEdit ? styles.hidden : ''}`}>
                        <Input name="result" type="text"
                            isProtected
                            fieldValue={res.result}
                            privacyValue={res.result}
                            labelValue="Результат работы"
                            placeholder="Результат работы"/>
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

export default WorkResult
