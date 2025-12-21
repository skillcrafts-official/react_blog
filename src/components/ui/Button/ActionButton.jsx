import styles from "./ActionButton.module.css"

function ActionButton({
        children,
        variant = "primary",
        ...props
}) {
    return (
        <button 
            // className={`${styles.button} ${styles[!isConfirmed || isChecked ? variant : 'disabled']}`}
            className={`${styles.button} ${styles[variant]}`}
            type="submit"
            { ...props }
            // disabled={variant !== "disabled"}
            >
                {/* {isConfirmed && 
                    <input type="checkbox"
                        checked={isChecked}
                        onChange={(event) => handleConfirmedChange(event)}/>} */}
                {children}
        </button>
    )
}

export default ActionButton
