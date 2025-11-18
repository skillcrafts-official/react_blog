import styles from "./Title.module.css"

function Title({ children, variant = "primary", ...props }) {
    return (
        <h1
            className={`${styles.title} ${styles[variant]}`}
            { ...props }
            >
            {children}
        </h1>
    )
}

export default Title
