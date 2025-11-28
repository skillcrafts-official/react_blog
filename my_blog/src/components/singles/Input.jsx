import styles from "./Textarea.module.css"
import { useState } from "react"

function Input({ 
        variant = "primary", 
        requirements = [], 
        fieldValue = '',
        state = {},
        ...props }) {
    const [value, setValue] = useState(fieldValue);

    function handleInput(event) {
        setValue(event.target.value)
    }

    return (
        <>
            <input 
                className={`${styles.input} ${styles.effects} ${styles[variant]}`}
                onChange={handleInput} value={value} { ...props } />
            <ul>
                {requirements.map((req) => (
                    <li className={
                        fieldValue ? (
                            `${styles.requirements} ${state[req.type] ? (
                                styles.valid) : (styles.invalid)}`
                            ) : (`${styles.requirements}`
                        )}
                        key={req.type}
                    >
                    {state[req.type] ? '✓' : '✗'} {req.short_msg}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Input
