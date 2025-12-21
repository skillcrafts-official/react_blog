import styles from './SimpleRadioBtn.module.css'
import { useEffect, useState } from 'react';

function SimpleRadioBtn({
        selectedValue, radioValues, fetchFunc
}) {
    const [isActive, setIsActive] = useState();

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
    
    return <>
            <p 
                key={`radioButton1`}
                role='simple-checkbox'
                className={`${styles.checkbox} ${styles[checkboxStyle[isActive]]}`}
                onClick={() => fetchFunc(radioValues[0])}
                >
                    {radioValues[0]}
            </p>
            <p 
                key={`radioButton2`}
                role='simple-checkbox'
                className={`${styles.checkbox} ${styles[checkboxStyle[!isActive]]}`}
                onClick={() => fetchFunc(radioValues[1])}
                >
                    {radioValues[1]}
            </p>
        </>
}

export default SimpleRadioBtn;
