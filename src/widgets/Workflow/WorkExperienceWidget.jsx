import { useEffect, useState } from 'react'
import styles from './WorkExperienceWidget.module.css'
import WorkResultWidget from '../WorkResultWidget'
import Title from '@/components/ui/Label/Title';
import Span from '@/components/ui/Label/Span';
import ClickableSpan from '@/components/ui/Label/ClickableSpan';
import Paragraph from '@/components/ui/Label/Paragraph';
import Input from '@/components/ui/Input/Input';
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import { API_BASE_URL, API_DATA } from '@/constants';
import { API_ENDPOINTS } from '@/api/endpoints';
import Textarea from '@/components/ui/Input/Textarea';
import { useWorkResult } from '@/hooks/useResume';
import Checkbox from '@/components/ui/Choice/Checkbox';
import PriorityCheckBox from '@/features/workflows/components/PriorityCheckBox';
import PrivacyCheckBox from '@/features/compliance/PrivacyCheckBox';

function WorkExperienceWidget({ exp }) {
    const { userId } = useGlobalState();
    const [isEditable, setIsEditable] = useState(false);
    const [isExperienceEdit, setIsExperienceEdit] = useState(false);
    const [isResultEdit, setIsResultEdit] = useState(false);
    const {
        workResults,
        isCreating, error,
        updateSelectedWorkResult
    } = useWorkResult(exp);

    const PRIVACY_FLOW = {
        all: 'not_all',
        not_all: 'no_one_except',
        no_one_except: 'nobody',
        nobody: 'all'
    };
    const PRIVACIES = {
        all: 'видно всем',
        not_all: 'видно всем, кроме...',
        no_one_except: 'невидно никому, кроме...',
        nobody: 'невидно никому'
    }

    const renderOnlyReadWidget = () => {
        return <>
            <header className='flex flex-col gap-y-2 justify-center items-center mx-5 my-2'>
                
                <div className='flex flex-row w-full justify-between items-end'>
                    <section className='flex flex-col gap-y-1 items-center'>
                        <ClickableSpan variant='link'
                            onClick={() => setIsEditable(!isEditable)}>
                                {isEditable ? 'смотреть' : 'изменить'}
                        </ClickableSpan>
                        <Title variant='tertiary'>{exp.start_year}</Title>
                        <Span variant='secondary'>по {exp.is_current ? 'настоящее время' : exp.end_year}</Span>
                    </section>
                    <section className='flex flex-col gap-y-1 items-center'>
                        <PrivacyCheckBox
                            currentValue={"all"}
                            currentField="privacy"
                            checkflow={PRIVACY_FLOW}
                            verbose_names={PRIVACIES}
                            handleChange={() => null}/>
                        <Title variant='tertiary'>{exp.company}</Title>
                        <Span variant='secondary'>{exp.indastry_desc}</Span>
                    </section>
                </div>
            </header>
            <main className={styles['main']}>
                <section className={styles['section']}>
                    <Title variant='quaternary'>{'Позиция (роль):'}</Title>
                    <ul>
                        <li className={styles['li']}
                            key={`positionStart`}>
                            {!isEditable ? <Paragraph variant='tertiary'>{exp.start_position}</Paragraph> :
                                <Input isManuallySaved
                                    fetchFunc={() => null}
                                    value={exp.start_position}
                                    placeholder="Начальная позиция (при трудоустройстве)"/>}
                            {!isEditable && <div className='flex flex-row items-center'>
                                {/* <ClickableSpan variant='link'>изменить</ClickableSpan> */}
                                {/* <ClickableSpan variant='link'>скрыть</ClickableSpan> */}
                                {/* <ClickableSpan variant='link'>удалить</ClickableSpan> */}
                                <PrivacyCheckBox
                                    currentValue={"all"}
                                    currentField="privacy"
                                    checkflow={PRIVACY_FLOW}
                                    verbose_names={PRIVACIES}
                                    handleChange={() => null}/>
                            </div>}
                        </li>
                        {exp.finish_position ? <li className={styles['li']}
                            key={`positionFinish`}>
                            {!isEditable ? <Paragraph variant='tertiary'>{`-> ${exp.finish_position}`}</Paragraph> :
                                <Input isManuallySaved
                                    fetchFunc={() => null}
                                    value={exp.finish_position}
                                    placeholder="Финишная или текущая позиция"/>}
                            {!isEditable && <div className='flex flex-row items-center'>
                                {/* <ClickableSpan variant='link'>изменить</ClickableSpan> */}
                                {/* <ClickableSpan variant='link'>скрыть</ClickableSpan> */}
                                {/* <ClickableSpan variant='link'>удалить</ClickableSpan> */}
                                <PrivacyCheckBox
                                    currentValue={"all"}
                                    currentField="privacy"
                                    checkflow={PRIVACY_FLOW}
                                    verbose_names={PRIVACIES}
                                    handleChange={() => null}/>
                            </div>}
                        </li> : isEditable && 
                            <Input isManuallySaved
                                fetchFunc={() => null}
                                value={exp.finish_position}
                                placeholder="Финишная или текущая позиция"/>
                        }
                    </ul>
                </section>
                <section className={styles['section']}>
                    <Title variant='quaternary'>{'Функции (должностные обязанности):'}</Title>
                    <div className='grid'>
                    <ul className={styles['ul']}>
                        {workResults.map((result, index) => (
                            !isEditable ? <li className={styles['li']}
                                key={`result_${index}`}>
                                    {/* {res.result} */}
                                <Paragraph variant='tertiary'>{result}</Paragraph>
                                {!isEditable && <section className='flex flex-row items-center'>
                                    {/* <ClickableSpan variant='link'>изменить</ClickableSpan> */}
                                    {/* <ClickableSpan variant='link'>скрыть</ClickableSpan> */}
                                    {/* <ClickableSpan variant='link'>удалить</ClickableSpan> */}
                                    <Checkbox privacyValue={'all'}></Checkbox>
                                </section>}
                            </li> : <Textarea placeholder='Введите результат работы, шаблон: [Действие] [Результат с цифрой] для [Контекст/Масштаб], используя [Метод/Инструмент], чтобы [Решаемая проблема]'
                                isManuallySaved rows={4}
                                fetchFunc={updateSelectedWorkResult}
                                value={result}/>
                        ))}
                    </ul>
                    </div>
                    <ClickableSpan
                        variant='link'
                        key="addNewExperience"
                        onClick={() => setIsResultEdit(!isResultEdit)}>
                        {isResultEdit === false ? 'Добавить результат работы' : 'Скрыть'}
                    </ClickableSpan>
                    {isResultEdit && <Textarea placeholder='Введите результат работы, шаблон: [Действие] [Результат с цифрой] для [Контекст/Масштаб], используя [Метод/Инструмент], чтобы [Решаемая проблема]'
                        isManuallySaved rows={4}
                        fetchFunc={updateSelectedWorkResult}
                        name='result' type="text" required/>}
                </section>
            </main>
            <footer className='flex flex-row flex-wrap gap-x-5 justify-between items-center m-2'>
                <Span variant='secondary'><i>Последнее изменение: dd.mm.yyyy hh24:mi:ss</i></Span>
            </footer>
        </>
    }

    return (
        <div className={styles['work-experience-widget']}>
            {renderOnlyReadWidget()}
        </div>
    )
}

export default WorkExperienceWidget
