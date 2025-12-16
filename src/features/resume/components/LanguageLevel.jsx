import styles from "./LanguageLevel.module.css"
import { useEffect, useState } from "react";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useLanguageLevel } from "@/hooks/useResume";
import VerticalWheelList from "@/components/ui/Wheel/VerticalWheelList";
import SimpleCheckBox from "@/components/ui/Choice/SimpleCheckBox";

function LanguageLevel({ language }) {
    const { userId } = useGlobalState();
    const [isEdit, setIsEdit] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const {
        languageLevel, allLanguageLevels,
        loadingLevels, updatingLevel, error,
        updateSelectedLevel,
    } = useLanguageLevel(language, userId);
    
    const renderCheckBoxList = () => {
        if (loadingLevels) {
            return <div>Loading data...</div>
        }
        if (updatingLevel) {
            return <div>Updating data...</div>
        }
        if (error) {
            return <div>Render faild with error: {error}</div>
        }
        if (allLanguageLevels && Object.keys(allLanguageLevels).length > 0) {
            return Object.entries(allLanguageLevels).map(([key, value]) => 
                <SimpleCheckBox
                    selectedValue={languageLevel.level}
                    currentField={key}
                    checkboxValue={key}
                    fetchFunc={updateSelectedLevel}/>
            )
        }
    }

    return (
        <div>
            {/* <li onClick={() => setIsEdit(!isEdit)}>
                {children}
            </li> */}
            {/* <VerticalWheelList>
                <SingleChoice fetchFunc={updateSelectedLevel}
                    selectedChoice={languageLevel.level}
                    choiceList={Object.keys(allLanguageLevels).sort()}/>
            </VerticalWheelList> */}
            {renderCheckBoxList()}
        </div>
    )
}

export default LanguageLevel
