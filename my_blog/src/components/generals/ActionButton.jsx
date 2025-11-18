import styles from "./ActionButton.module.css"

function ActionButton({ children, variant = "primary", ...props }) {
    return (
        <button 
            className={`${styles.button} ${styles[variant]}`}
            type="submit"
            { ...props }>
                {children}
        </button>
    )
}

export default ActionButton
