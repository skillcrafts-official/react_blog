import { API_BASE_URL, API_ENDPOINTS, API_DATA } from '../../../constants';
import { camelCase, snakeCase } from 'change-case';
import { useEffect, useState } from 'react';
import styles from './Checkbox.module.css'
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../../lib/providers/GlobalProvider';

function Checkbox({ forItem, privacyValue }) {
    const { userId } = useGlobalState();
    // const location = useLocation();

    const privacies = {
        all: 'not_all',
        not_all: 'nobody',
        nobody: 'all'
    };
    const verbose_privacy_names = {
        all: 'видно всем',
        not_all: 'всем, кроме...',
        nobody: 'никому'
    }

    const [privacy, setPrivacy] = useState(privacyValue);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {

    // }, [privacy])

    const handleChange = async () => {
        const oldValue = privacy;
        const newValue = privacies[oldValue];
        const fieldName = snakeCase(forItem)
        const payload = { [fieldName]: newValue }
        setPrivacy(newValue);
        setIsLoading(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}${
                    API_ENDPOINTS
                    .PROFILES.PRIVACY_SETTINGS.UPDATE(userId)
                }`,
                API_DATA("PATCH", payload)
            );
        
            if (!response.ok) {
                throw new Error('Update failed');
            }
            const data = await response.json();
            console.log(data)
            console.log(forItem)
            const currentValue = data[snakeCase(forItem)]
            if (currentValue != newValue) {
                throw new Error()
            }
        } catch(error) {
            console.error('Error:', error);
            setPrivacy(oldValue);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <p 
            key={`permissions_${forItem}`}
            role='multi-checkbox'
            className={styles.customCheckbox}
            onClick={handleChange}
            >
                {verbose_privacy_names[privacy]}
        </p>

    )
}

export default Checkbox
