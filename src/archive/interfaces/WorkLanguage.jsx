import styles from "./WorkLanguage.module.css"

import VerticalWheelList from "../../components/ui/Wheel/VerticalWheelList";
import MultiChoice from "../../../components/singles/MultiChoice";
import { useLanguage } from "../../hooks/useResume";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalState } from "../../lib/providers/GlobalProvider";
import LanguageLevel from "../../features/resume/components/LanguageLevel";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../../constants";
import SimpleCheckBox from "../../components/ui/Choice/SimpleCheckBox";

function WorkLanguage() {
    const { userId } = useGlobalState();
    const [isActive, setIsActive] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    
    const {
        allLanguages, userLanguages,
        deleteUserLanguage, updateSelectedLanguage
    } = useLanguage(userId);

    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    };
    
    const renderLanguages = () => {
        if (!userLanguages || typeof userLanguages !== 'object') {
            return <div>Нет данных о языках</div>;
        }
        
        const values = Object.values(userLanguages);
        console.log(values)
        if (values.length === 0) {
            return <div>Список языков пуст</div>;
        }
        
        return Object.values(userLanguages).map((language) => (
            <li>
                <ul className='flex flex-row' >
                    <li key={`${language.name}${language.id}`}
                        onClick={() => deleteUserLanguage(language.id)}
                        className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}>
                        {allLanguages[language.name]}
                    </li>
                    <li key={`${language.level}${language.id}`}
                        className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}>
                        <LanguageLevel
                            language={language}>
                            {/* {language.level} */}
                        </LanguageLevel>
                    </li>
                </ul>
            </li>
        ));
    };

    const renderAllLanguages = () => {
        if (!allLanguages || typeof allLanguages !== 'object') {
            return <div>Нет данных о языках</div>;
        }
        
        const values = Object.entries(allLanguages);

        if (values.length === 0) {
            return <div>Список языков пуст</div>;
        }
        
        return (
            <ul className={`flex flex-row flex-wrap ${styles.li}`}>
                {Object.entries(allLanguages).map(([key, value]) => (
                    <li key={`lang${key}`}>
                        <SimpleCheckBox
                            activeStatus={true}
                            currentField={key}
                            checkboxValue={value}
                            fetchFunc={updateSelectedLanguage}/>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col w-100 h-100">
            <ul className={`flex flex-row flex-wrap ${styles.li}`}>
                {renderLanguages()}
                <li key='addNewLang'
                    className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}
                    onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? '-' : '+'}
                </li>
            </ul>
            {isEdit && <>
                <hr className="border-red-100"/>
                <VerticalWheelList>
                    {/* <MultiChoice fetchFunc={updateSelectedLanguage}
                        choiceList={Object.values(allLanguages).sort()}/> */}
                    {renderAllLanguages()}
                </VerticalWheelList>
            </>}
        </div>
    )
}

export default WorkLanguage;
