import styles from "./Paragraph.module.css"

function Paragraph({ children, variant = "primary", style, ...props }) {
    return (
        <h1
            className={`${styles.paragraph} ${styles[variant]} ${style}`}
            { ...props }
            >
            {children}
        </h1>
    )
}

export default Paragraph
