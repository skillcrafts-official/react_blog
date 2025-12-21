import { useWorkSummary } from '@/hooks/useResume';
import styles from './ResumeView.module.css';
import WorkExperience from '@/features/resume/components/WorkExperience';
import WorkResult from '@/features/resume/components/WorkResult';
import WorkLanguage from '@/features/resume/components/WorkLanguage';
import WorkSkill from '@/features/profile/components/WorkSkill';
import Span from '@/components/ui/Label/Span';
import WorkLanguageWidget from '@/widgets/WorkLanguageWidget';
import WorkExperienceWidget from '@/widgets/WorkExperienceWidget';
import WorkSkillWidget from '@/widgets/WorkSkillWidget';

function ResumeView({ userId }) {
    const {
        workSummary, isLoading, error,
        updateSelectedUserId
    } = useWorkSummary(userId);

    const renderResume = () => {
        if (isLoading) {
            return <div>Data loading...</div>
        }

        if (error) {
            return <div>Loading with error: {error}</div>
        }

        if (!workSummary || workSummary?.length !== 1) {
            return <div>No data...</div>
        }

        const { experiences, languages } = workSummary[0];
        console.log(experiences)
        console.log(languages)
        return <>
            <section className={styles.first}>
                <Span variant="invert">Опыт сотрудничества</Span>
                {experiences.filter(exp => exp.start_year).map((exp) => (
                    <div className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                        <WorkExperienceWidget
                            exp={exp}/>
                    </div>
                ))}
            </section>
            <section className={styles.third}>
                <section className={styles.first}>
                    <Span variant="invert">Владение родными и инстранными языками</Span>
                    <WorkLanguageWidget languageList={languages} />
                </section>
                <section className={styles.first}>
                    <Span variant="invert">Владение инструментами и технологиями</Span>
                    <WorkSkillWidget />
                </section>
            </section>
        </>
    }

    return (
        <div className="flex flex-col gap-5">
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
