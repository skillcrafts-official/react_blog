import styles from "./Textarea.module.css"
import { useState } from "react";
import Checkbox from "../Choice/Checkbox";
import FloppyDisk from "../Button/FloppyDisk";
import WasteBasket from "../Button/WasteBasket";

function Textarea({
        rows = 5,
        variant = "primary",
        labelValue = "",
        fieldValue = '',
        privacyValue='',
        requirements = [], 
        state = {},
        getFloppy = true,
        isRow = false,
        isProtected = false,
        isManuallySaved = false,
        fetchFunc = () => null,
        ...props
    }) {
    const [value, setValue] = useState(fieldValue);

    function handleInput(event) {
        setValue(event.target.value)
    }

    const handleSave = () => {
        console.log('Ckick-cluck to save...')
        fetchFunc(value);
        setValue('');
    }

    return (
        <>
            <div className={`flex w-full gap-3 flex-${isRow ? 'row' : 'col'}`}>
                <label htmlFor={props.name} className={`${styles.label}`}>
                    {labelValue}
                    {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
                </label>
                <div className="flex flex-row justify-around items-start gap-3">
                    <textarea value={value} onChange={handleInput} rows={rows}
                        className={`${styles.input} ${styles.effects} ${styles[variant]}`}
                        { ...props }>
                    </textarea>
                    {getFloppy && <div className={`${styles.floppy} ${(isManuallySaved) ? '' : styles.adaptive}`}
                            onClick={handleSave}>
                            <FloppyDisk />
                        </div>}
                    {/* <p className="text-[18px] m-0 p-0 w-fit text-white">&#128465;&#128270;&#10000;</p> */}
                    <div className={`${styles.floppy}`}>
                        <WasteBasket/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Textarea
