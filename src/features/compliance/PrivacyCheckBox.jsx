import styles from './PrivacyCheckBox.module.css'

function PrivacyCheckBox({ 
        currentValue,
        currentField,
        checkflow = {},
        verbose_names = {},
        handleChange = () => null,
    }) {

    return (
        <p 
            key={`permissions_${currentField}`}
            role='multi-checkbox'
            className={styles.customCheckbox}
            onClick={() => handleChange(checkflow[currentValue])}
            >
                {verbose_names[currentValue]}
        </p>

    )
}

export default PrivacyCheckBox;
