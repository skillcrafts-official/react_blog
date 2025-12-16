import { useState } from "react";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { useSkillLevel } from "@/hooks/useProfile";
import SimpleCheckBox from "@/components/ui/Choice/SimpleCheckBox";
import VerticalWheelList from "@/components/ui/Wheel/VerticalWheelList";
import HorisontalWheelList from "@/components/ui/Wheel/HorisontalWheel";


function SkillLevel({ skill }) {
    const { userId } = useGlobalState();
    const [isEdit, setIsEdit] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const {
        skillLevel, isUpdating, error, updateSelectedSkillLevel
    } = useSkillLevel(userId, skill);

    const renderCheckBoxList = () => {
        if (isUpdating) {
            return <div>Updating data...</div>
        }
        if (error) {
            return <div>Render faild with error: {error}</div>
        }
        if (skillLevel) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => 
                <SimpleCheckBox
                    selectedValue={skillLevel.level}
                    currentField={item}
                    checkboxValue={item}
                    fetchFunc={updateSelectedSkillLevel}/>
            )
        }
    }

    return (
        <div className='flex flex-row flex-wrap max-w-40'>
            {/* <li onClick={() => setIsEdit(!isEdit)}>
                {children}
            </li> */}
            {/* <VerticalWheelList>
                <SingleChoice fetchFunc={updateSelectedLevel}
                    selectedChoice={languageLevel.level}
                    choiceList={Object.keys(allLanguageLevels).sort()}/>
            </VerticalWheelList> */}
            <HorisontalWheelList>
                {renderCheckBoxList()}
            </HorisontalWheelList>
        </div>
    )
}

export default SkillLevel
