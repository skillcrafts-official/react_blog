import styles from './WorkFormat.module.css'

import Checkbox from '@/components/ui/Choice/Checkbox'
import { useGlobalState } from '@/lib/providers/GlobalProvider';
import { useState } from 'react';
import { snakeCase } from 'change-case';
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '@/constants';
import SimpleCheckBox from '@/components/ui/Choice/SimpleCheckBox';
import { useWorkFormat } from '@/hooks/useProfile';

function WorkFormat({ 
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
    // const { workFormats } = useWorkFormat(userId);
    
    const { workFormats, isLoading, error, updateSelectedWorkFormat } = useWorkFormat(userId);
    console.log('📦 Hook result:', workFormats);

    const formats = {
        "office": "Офис",
        "hybrid": "Гибрид",
        "remote": "Удалённо",
    }

    console.log(Object.entries(workFormats))

    const renderWorkFormats = () => {
        if (isLoading) return <div>Загрузка...</div>;
        if (error) return <div>Ошибка: {error}</div>;
        if (!workFormats || Object.keys(workFormats).length === 0) {
            return <div>Нет данных</div>;
        }

        return Object.entries(workFormats)
            .filter(([key, value]) => key !== 'id') // фильтруем id
            .map(([key, value]) => (
            <SimpleCheckBox
                activeStatus={value}
                currentField={key}
                checkboxValue={formats[key]}
                fetchFunc={updateSelectedWorkFormat}/>
        ))
    }

    return (
        <div className={`flex w-full gap-3 flex-${isRow ? 'row' : 'col'}`}>
            <label htmlFor={props.name} className={`${styles.label}`}>
                {labelValue}
                {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
            </label>
            {renderWorkFormats()}
            {/* <div className='flex flex-row justify-between'>
                <SimpleCheckBox
                    activeStatus={fieldValue?.office}
                    currentField='office'
                    checkboxValue='Офис'
                    fetchFunc={updateWorkFormat}/>
                <SimpleCheckBox
                    activeStatus={fieldValue?.hybrid}
                    currentField='hybrid'
                    checkboxValue='Гибрид'
                    fetchFunc={updateWorkFormat}/>
                <SimpleCheckBox
                    activeStatus={fieldValue?.remote}
                    currentField='remote'
                    checkboxValue='Удалённо'
                    fetchFunc={updateWorkFormat}/>
            </div> */}
        </div>
    )
}

export default WorkFormat
