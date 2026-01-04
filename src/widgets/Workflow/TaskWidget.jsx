import Span from '@/components/ui/Label/Span'
import styles from './TaskWidget.module.css'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Title from '@/components/ui/Label/Title'
import Textarea from '@/components/ui/Input/Textarea'
import PrivacyCheckBox from '@/features/compliance/PrivacyCheckBox';
import { useTaskPriority, useTaskPrivacy, useTaskTitle, useTaskStatus, useProject, useTaskTags } from '@/hooks/useWorkfolw';
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import PriorityCheckBox from '@/features/workflows/components/PriorityCheckBox';
import StatusCheckBox from '@/features/workflows/components/StatusCheckBox';
import AcceptanceCriterias from '@/features/workflows/components/AcceptanceCriterias';
import TimeEntries from '@/features/workflows/components/TimeEntries';
import ProjectTag from '@/features/workflows/components/ProjectTag';
import TaskTag from '@/features/workflows/components/TaskTag';

function TaskWidget({ variant = 'large', task }) {
    const { userId } = useGlobalState();
    const { projects } = useProject(userId);

    const {
        taskPrivacy, selectedTaskPrivacy,
        isUpdating: privacyUpdating, error: privacyError,
        updateSelectedTaskPrivacy
    } = useTaskPrivacy(task, userId);
    const {
        taskPriority, selectedTaskPriority,
        isUpdating: priorityUpdating, error: priorityError,
        updateSelectedTaskPriority
    } = useTaskPriority(task, userId);
    const {
        taskTitle, selectedTaskTitle, isTitleEdited,
        isUpdating: titleUpdating, error: titleError,
        updateSelectedTaskTitle, setIsTitleEdited
    } = useTaskTitle(task, userId);
    const {
        taskStatus, selectedTaskStatus, 
        isUpdating: statusUpdating, error: statusError,
        updateSelectedTaskStatus
    } = useTaskStatus(task, userId);
    const {
        taskTags,
        isLoading, isUpdating, error,
        updateSelectedTaskTags
    } = useTaskTags(task);
    // const {
    //     hoursSpent, hoursSpents, 
    //     isUpdating: timeEntryUpdating, error: timeEntryError,
    //     updateHoursSpent
    // } = useTimeEntries(task, userId);

    const STATUSES = {
        backlog: 'В бэклоге',
        ready: 'Готово к работе',
        in_progress: 'В работе',
        review: 'На проверке',
        done: 'Выполнено',
        cancelled: 'Отменено',
        deleted: 'Удалено',
    }
    // const STATUSES = Object.keys(STATUS_START_DATES);
    console.log(STATUSES)
    const PRIORITIES = {
        1: 'Несрочно и Неважно',
        2: 'Несрочно, но Важно',
        3: 'Срочно, но Неважно',
        4: 'Срочно и Важно',
    }
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
    console.log(task.id)
    // const rengerAcceptanceCriterias = () => {
    //     return <ul className='self-start'>
    //         {task.criterias.map(criteria => 
    //             <li key={criteria.id}>
    //                 <AcceptanceCritera 
    //                     isCompleted={criteria.status}
    //                     handleClick={(newValue) => newValue}>
    //                         {criteria.criteria}
    //                 </AcceptanceCritera>
    //             </li>)}
    //         <li key="addNewCriteria">+</li>
    //     </ul>
    // }
    return (
        // <div className="flex flex-col w-full h-fit gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
            
        // </div>
        // <div className="flex flex-col w-full rounded-t-[12px]">
        <div key={task.id}
            className={styles['task-box']}>
            {/* <img className="rounded-t-[12px]"
                src={"poster || defaultPoster"} alt="poster" /> */}
            {/* <nav className='flex flex-col p-2 justify-between items-center'>
                <ul >
                    <li>
                        <StatusCheckBox
                            currentValue={task.status}
                            currentField="status"
                            checkflow={Object.keys(STATUSES)}
                            verbose_names={STATUSES}
                            />
                    </li>
                </ul>
                
            </nav> */}
            <div className='flex flex-col justify-between items-center rounded-[12px]'>
                <header className='flex flex-col flex-wrap gap-x-2 py-3 w-full items-center bg-[#0d0d0dff]  rounded-t-[12px]'>
                    {['detailview', 'medium'].includes(variant) && <div className="flex flex-row flex-wrap gap-x-3 px-4 w-full items-center justify-center sd:justify-between">
                        <TimeEntries
                            task={task}
                            />
                        <PrivacyCheckBox
                            currentValue={taskPrivacy}
                            currentField="privacy"
                            checkflow={PRIVACY_FLOW}
                            verbose_names={PRIVACIES}
                            handleChange={updateSelectedTaskPrivacy}/>
                    </div>}
                    <PriorityCheckBox
                        currentValue={taskPriority}
                        currentField={"priority"}
                        checkboxValues={Object.keys(PRIORITIES)}
                        verbose_names={PRIORITIES}
                        handleOnClickPrev={updateSelectedTaskPriority}
                        handleOnClickNext={updateSelectedTaskPriority}/>
                    
                </header>
                <main className='flex flex-col gap-y-3 py-3 px-4 w-full h-full items-center rounded-[12px]'>
                    <div className='flex flex-row flex-wrap gap-3'>
                        <Title variant='tertiary'>
                            {`[#${task.id}]`}
                        </Title>
                        {isTitleEdited === false ? (
                            <Title variant='tertiary'
                                onClick={() => setIsTitleEdited(true)}
                                title="Нажмите для редактирования">
                                {taskTitle}
                            </Title>
                        ) : (<Textarea
                                rows="3"
                                fieldValue={taskTitle}
                                getFloppy isManuallySaved
                                fetchFunc={updateSelectedTaskTitle}/>)}
                    </div>
                    {variant === 'detailview' && <div className='flex flex-col'>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({node, ...props}) => (
                                <Span {...props} />
                              ),
                              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                              li: ({node, ...props}) => <Span variant='secondary' {...props} />,
                              a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                              code: ({node, inline, ...props}) => 
                                inline 
                                  ? <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />
                                  : <code className="block bg-gray-800 text-white p-4 rounded my-2" {...props} />,
                            }}>
                            {/* className="font-roboto text-[#d2d2d2ff] font-[400] text-[14px] leading-[21px] tracking-[0%]"> */}
                            {task.description}
                        </ReactMarkdown>
                    </div>}
                    {variant === 'detailview' && <AcceptanceCriterias task={task}/>}
                </main>
                {['detailview', 'medium'].includes(variant) && <footer className='flex flex-col py-3 px-4 w-full gap-2 items-center rounded-b-[12px] bg-[#181818ff]'>
                    {/* <ul role='meta-data'>
                        <li>
                            <div className="flex flex-row flex-wrap gap-x-3 items-center">
                                {['backlog', 'ready', 'in progress', 'review', 'done'].map( (tag) => (
                                    <Link
                                        className="font-roboto text-[#107effff] text-[14px] hover:font-black">
                                        {tag}</Link>
                                ))}
                            </div>
                        </li>
                    </ul> */}
                    <StatusCheckBox
                        currentValue={taskStatus}
                        checkflow={Object.keys(STATUSES)}
                        verbose_names={STATUSES}
                        handleChange={updateSelectedTaskStatus}/>
                    <div className='grid grid-cols-3'>
                        <div className='flex flex-row flex-wrap'>
                            <ProjectTag task={task}></ProjectTag>
                        </div>
                        <div className="flex flex-col flex-wrap gap-x-3 justify-center items-center">
                            <span className="font-lato text-[#828282ff] text-[12px] font-[400] text-center">
                                создано {new Date(task.date_created).toLocaleString()}</span>
                            {task.date_updated && <span className="font-lato text-[#828282ff] text-[12px] font-[400] text-center">
                                <i>последнее изменение {new Date(task.date_updated).toLocaleString()}</i></span>}
                            {/* <div className="w-[6px] h-[6px] bg-white rounded-full"></div> */}
                            
                        </div>
                        <div className='flex flex-row flex-wrap'>
                            <TaskTag taskTags={taskTags} 
                                handleUpdate={updateSelectedTaskTags}/>
                        </div>
                    </div>
                    {/* <div className="flex md:flex-row flex-col gap-3 justify-between">
                        
                        <Link to={"linkTo"}
                            className="font-roboto text-[#107effff] text-[14px] font-[400] hover:font-black">
                                редактировать
                        </Link>
                    </div> */}
                </footer>}
            </div>
        </div>
        // </div>
    )
}

export default TaskWidget
