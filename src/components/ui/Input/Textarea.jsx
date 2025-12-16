import styles from "./Textarea.module.css"
import { useState } from "react";
import Checkbox from "../Choice/Checkbox";

function Textarea({
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
    const [value, setValue] = useState(fieldValue);

    function handleInput(event) {
        setValue(event.target.value)
    }

    return (
        <>
            <div className={`flex w-full gap-3 flex-${isRow ? 'row' : 'col'}`}>
                <label htmlFor={props.name} className={`${styles.label}`}>
                    {labelValue}
                    {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
                </label>
                <textarea { ...props } value={value} onChange={handleInput} rows="5"
                    className={`${styles.input} ${styles.effects} ${styles[variant]}`}>
                </textarea>
            </div>
        </>
    )
}

export default Textarea
