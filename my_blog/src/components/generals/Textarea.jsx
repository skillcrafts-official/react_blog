import styles from "./Textarea.module.css"
import { useState } from "react";

function Textarea({ variant = "primary", fieldValue = "", ...props }) {
    const [value, setValue] = useState(fieldValue);

    function handleInput(event) {
        setValue(event.target.value)
    }

    return (
        <>
            <textarea { ...props } value={value} onChange={handleInput} rows="5"
                className={`${styles.input} ${styles.effects} ${styles[variant]}`}>
            </textarea>
        </>
    )
}

export default Textarea
