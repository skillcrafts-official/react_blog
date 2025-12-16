import styles from "./Title.module.css"

function Title({ children, variant = "primary", style, ...props }) {
    return (
        <h1
            className={`${styles.title} ${styles[variant]} ${style}`}
            { ...props }
            >
            {children}
        </h1>
    )
}

export default Title
