import { useWorkSummary } from '@/hooks/useResume';
import styles from './ResumeView.module.css';
import Span from '@/components/ui/Label/Span';
import WorkExperienceWidget from '@/widgets/Workflow/WorkExperienceWidget';
import { useState } from 'react';
import ClickableSpan from '@/components/ui/Label/ClickableSpan';
import WorkExperienceForm from '@/features/resume/components/WorkExperienceForm';

function ResumeView({ userId }) {
    const [isExperienceEdit, setIsExperienceEdit] = useState(false);
    const {
        workSummary, isLoading, error,
        updateSelectedUserId
    } = useWorkSummary(userId);

    console.log(workSummary)
    // Object.entries(workSummary).map((key, value) => console.log('key', key, 'value', value));

    const renderResume = () => {
        if (isLoading) {
            return <div>Data loading...</div>
        }

        if (error) {
            return <div>Loading with error: {error}</div>
        }

        if (!workSummary || workSummary?.length === 0) {
            return <div>No data...</div>
        }

        const { experiences, languages } = workSummary[0];
        console.log(experiences)
        console.log(languages)
        return <section className={styles.first}>
            <Span variant="invert">Опыт сотрудничества</Span>
            <ClickableSpan
                variant='link'
                key="addNewExperience"
                onClick={() => setIsExperienceEdit(!isExperienceEdit)}>
                {isExperienceEdit === false ? 'Добавить место работы' : 'Скрыть'}
            </ClickableSpan>
            {isExperienceEdit && <WorkExperienceForm/>}
            {experiences.filter(exp => exp.start_year).map((exp) => (
                // <div className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                    <WorkExperienceWidget
                        exp={exp}/>
                // </div>
            ))}
        </section>
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            {/* // onSubmit={handleSubmit}
            // encType="multipart/form-data"> */}
            {/* <Title>Профиль</Title> */}
            
            <div className={styles.resume}>
                {renderResume()}
            </div>
        </div>
    )
}

export default ResumeView
