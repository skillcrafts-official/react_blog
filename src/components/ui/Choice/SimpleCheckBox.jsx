import { useEffect, useState } from 'react';
import styles from './SimpleCheckBox.module.css'

function SimpleCheckBox({
        activeStatus = null, currentField, selectedValue = null, checkboxValue, fetchFunc
}) {
    const [isActive, setIsActive] = useState(activeStatus);

    useEffect(() => {
        if (activeStatus === null) {
            setIsActive(selectedValue === checkboxValue);
        } else {
            setIsActive(activeStatus)
        }
    }, [activeStatus, selectedValue, checkboxValue])
    
    const checkboxStyle = {
        true: 'active',
        false: 'notActive'
    }
    
    return (
        <p 
            key={`checkbox_${currentField}`}
            role='simple-checkbox'
            className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}
            onClick={() => fetchFunc(currentField)}
            >
                {checkboxValue}
        </p>
    )
}

export default SimpleCheckBox
