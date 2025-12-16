import styles from "./Textarea.module.css"
import { useState } from "react"
import Checkbox from "../Choice/Checkbox";
import FloppyDisk from "../Button/FloppyDisk";

function Input({ 
        variant = "primary",
        labelValue = "",
        fieldValue = '',
        privacyValue='',
        requirements = [], 
        state = {},
        isRow = false,
        isProtected = false,
        isManuallySaved = false,
        isSearched = false,
        fetchFunc = () => null,
        ...props
    }) {
    const [value, setValue] = useState(fieldValue);

    function handleInput(event) {
        setValue(event.target.value);
    }

    const handleSave = () => {
        console.log('Ckick-cluck to save...')
        fetchFunc(value);
        setValue('');
    }

    const handleSearch = () => {
        console.log('Ckick-cluck to search...')
        fetchFunc(value);
        setValue('');
    }

    console.log(isManuallySaved)
    
    return (
        <>
            <div className={`flex w-full gap-3 flex-${isRow ? 'row' : 'col'}`}>
                <label htmlFor={props.name} className={`${styles.label}`}>
                    {labelValue}
                    {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
                </label>
                <div className="flex flex-row justify-around items-center gap-3">
                    <input 
                        className={`${styles.input} ${styles.effects} ${styles[variant]}`}
                        onChange={handleInput}
                        value={value}
                        { ...props } />
                    <div className={`${styles.floppy} ${isManuallySaved ? '' : styles.adaptive}`}
                        onClick={handleSave}>
                        <FloppyDisk />
                    </div>
                    {/* <div className={`${styles.floppy} ${isSearched ? '' : styles.adaptive}`}
                        onClick={handleSearch}>
                        <FloppyDisk />
                    </div> */}
                </div>
            </div>
            {requirements.length ? (<ul>
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
            </ul>) : null}
        </>
    )
}

export default Input
