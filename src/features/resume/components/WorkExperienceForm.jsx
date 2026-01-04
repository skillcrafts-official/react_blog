import { useState } from 'react'
import styles from './WorkExperienceForm.module.css'
import WorkResultWidget from '../../../widgets/WorkResultWidget'
import Title from '@/components/ui/Label/Title';
import Span from '@/components/ui/Label/Span';
import ClickableSpan from '@/components/ui/Label/ClickableSpan';
import Paragraph from '@/components/ui/Label/Paragraph';
import Input from '@/components/ui/Input/Input';
import { Form } from 'react-router-dom';
import { API_BASE_URL, API_DATA } from '@/constants';
import { API_ENDPOINTS } from '@/api/endpoints';
import ActionButton from '@/components/ui/Button/ActionButton';
import { useGlobalState } from '@/lib/providers/GlobalProvider';

function WorkExperienceForm({ exp }) {
    const { userId } = useGlobalState();
    const [isEditable, setIsEditable] = useState(false);
    const [isExperienceEdit, setIsExperienceEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const formData = new FormData(event.target);
            const payload = {
                company: formData.get('company'),
                indastry_desc: formData.get('industry_desc'),
                start_position: formData.get('start_position'),
                final_position: formData.get('final_position') || null,
                start_year: formData.get('start_year'),
                end_year: formData.get('end_year') || null,
                is_current: formData.get('end_year') ? false : true,
                profile: userId,
            };
            
            const response = await fetch(
                `${API_BASE_URL}${API_ENDPOINTS.RESUME.WORK_EXPERIENCE.POST}`,
                API_DATA("POST", payload)
            );
            
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            // console.log('Profile updated:', data);
        } catch (error) {
            console.error('Error updating profile:', error);
            setSubmitError('Ошибка добавлении места работы:', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const renderForm = () => {
        // if (isSubmitting) {
        //     return <div>Submitting...</div>
        // }
        // if (submitError) {
        //     return <div>Submit error: {submitError}</div>
        // }
        return <form className="flex flex-col gap-5"
            onSubmit={handleSubmit}>
            <Input labelValue='Название компании'
                placeholder='Введите название компании'
                getFloppy={false}
                name='company' type="text" required/>
            <Input labelValue='Производственная сфера деятельности компании'
                placeholder='Введите сферу деятельности (если известно)'
                getFloppy={false}
                name='industry_desc' type="text"/>
            <Input labelValue='Ваша должность при приёме на работу'
                placeholder='Введите название должности (роли)'
                getFloppy={false}
                name='start_position' type="text" required/>
            <Input labelValue='Ваша текущая должность'
                placeholder='Оставьте пустым, если должность не менялась'
                getFloppy={false}
                name='final_position' type="text"/>
            <Input labelValue='Год приёма на работу'
                placeholder='Введите число в формате XXXX'
                getFloppy={false}
                name='start_year' type="number" required/>
            <Input labelValue='Год увольнения с работы'
                placeholder='Оставьте пустым, если это ваше теущее место'
                getFloppy={false}
                name='end_year' type="number"/>
            <ActionButton
                type="submit" 
                disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </ActionButton>
        </form>
    }

    return (
        <div className={styles['work-experience-widget']}>
            {renderForm()}
        </div>
    )
}

export default WorkExperienceForm;
