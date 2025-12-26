import { API_BASE_URL, API_ENDPOINTS, API_DATA } from '../../../constants';
import { camelCase, snakeCase } from 'change-case';
import { useEffect, useState } from 'react';
import styles from './Checkbox.module.css'
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../../lib/providers/GlobalProvider';

function MultiCheckBox({ 
        currentValue,
        currentField,
        checkboxValues,
        checkflow = {},
        verbose_names = {},
        handleChange = () => null,
    }) {
    const { userId } = useGlobalState();

    const [value, setValue] = useState(currentValue);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {

    // }, [privacy])

    // const handleChange = async () => {
    //     const oldValue = privacy;
    //     const newValue = privacies[oldValue];
    //     const fieldName = snakeCase(forItem)
    //     const payload = { [fieldName]: newValue }
    //     setPrivacy(newValue);
    //     setIsLoading(true);

    //     try {
    //         const response = await fetch(
    //             `${API_BASE_URL}${
    //                 API_ENDPOINTS
    //                 .PROFILES.PRIVACY_SETTINGS.UPDATE(userId)
    //             }`,
    //             API_DATA("PATCH", payload)
    //         );
        
    //         if (!response.ok) {
    //             throw new Error('Update failed');
    //         }
    //         const data = await response.json();
    //         console.log(data)
    //         console.log(forItem)
    //         const currentValue = data[snakeCase(forItem)]
    //         if (currentValue != newValue) {
    //             throw new Error()
    //         }
    //     } catch(error) {
    //         console.error('Error:', error);
    //         setPrivacy(oldValue);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return (
        <p 
            key={`permissions_${currentField}`}
            role='multi-checkbox'
            className={styles.customCheckbox}
            onClick={handleChange}
            >
                {verbose_names[value]}
        </p>

    )
}

export default MultiCheckBox;
