import styles from './WorkFormat.module.css';

import ScrollCheckBox from '@/components/ui/Choice/ScrollCheckBox';
import Checkbox from '@/components/ui/Choice/Checkbox';
import { useEducatonLevel } from '@/hooks/useProfile';
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import SimpleCheckBox from '@/components/ui/Choice/SimpleCheckBox';

function EducationLevel({ 
        variant = "primary",
        labelValue = "",
        fieldValue = '',
        privacyValue='',
        requirements = [], 
        state = {},
        isRow = false,
        isProtected = false,
        ...props
}) {
    const { userId } = useGlobalState();

    const russianEduLevels = {
        nothing: 'first_middle',
        first_middle: 'primary_voc_edu',
        primary_voc_edu: 'secondary_voc_edu',
        secondary_voc_edu: 'higher_voc_edu',
        higher_voc_edu: 'nothing'
    }
    const verbose_names = {
        nothing: 'Не указано',
        first_middle: 'Среднее общеобразовательное',
        primary_voc_edu: 'Начальное профессиональное',
        secondary_voc_edu: 'Среднее профессиональное',
        higher_voc_edu_bachelor: 'Высшее (Бакалавриат)',
        higher_voc_edu: 'Высшее (Специалитет)',
        higher_voc_magistracy: 'Высшее (Магистратура)',
        higher_voc_postgraduate: 'Высшее (Аспирантура)',
    }

    const {
        userEducationLevel,
        educationLevels,
        isLoading,
        isUpdating,
        error,
        updateSelectedEduLevel,
    } = useEducatonLevel(userId);
    console.log('Hook with education level', userEducationLevel)

    const renderCheckBoxList = () => {
        if (isLoading) {
            return <div>Loading data...</div>
        }
        if (isUpdating) {
            return <div>Updating data...</div>
        }
        if (error) {
            return <div>Render faild with error: {error}</div>
        }
        if (educationLevels && Object.keys(educationLevels).length > 0) {
            return Object.entries(educationLevels).map(([key, value]) => 
                <SimpleCheckBox
                    selectedValue={educationLevels[userEducationLevel]}
                    currentField={key}
                    checkboxValue={value}
                    fetchFunc={updateSelectedEduLevel}/>
            )
        }
    }

    return (
        <div className={`flex w-full gap-3 flex-${isRow ? 'row' : 'col'}`}>
            <label htmlFor={props.name} className={`${styles.label}`}>
                {labelValue}
                {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
            </label>
            {/* <div className='flex flex-row justify-between'> */}
                {/* <ScrollCheckBox
                    currentValue={fieldValue}
                    currentField='edu_level'
                    checkboxValues={russianEduLevels}
                    verbose_names={educationLevels}/> */}
                {renderCheckBoxList()}
            {/* </div> */}
        </div>
    )
}

export default EducationLevel
