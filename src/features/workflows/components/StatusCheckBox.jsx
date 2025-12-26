import styles from './StatusCheckBox.module.css'

import SimpleCheckBox from "@/components/ui/Choice/SimpleCheckBox";
import VerticalWheelList from '@/components/ui/Wheel/VerticalWheelList';
import { useState } from "react";

function StatusCheckBox({
        currentValue,
        currentField,
        checkflow = [],
        verbose_names = {},
        handleChange = () => null,
    }) {
    console.log(currentValue)
    console.log(checkflow)
    console.log(verbose_names)
    const [isActive, setIsActive] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    };

    const renderStatusList = () => {
        return checkflow.map((phase) => 
            // <li>{phase}</li>
            <SimpleCheckBox
                selectedValue={verbose_names[currentValue]}
                currentField={phase}
                checkboxValue={verbose_names[phase]}
                fetchFunc={handleChange}/>
        )
    }
    return (
        // <div className="flex flex-row flex-wrap"
        //     onClick={() => setSelected(!isSelected)}>
        //     <SimpleCheckBox
        //         selectedValue={verbose_names[currentValue]}
        //         // currentField={phase}
        //         checkboxValue={verbose_names[currentValue]}/>
        //     {isSelected && renderStatusList()}
        // </div>
        <div className="flex flex-row flex-wrap w-fit h-fit justify-center">
            {renderStatusList()}
        </div>
    )
}

export default StatusCheckBox;
