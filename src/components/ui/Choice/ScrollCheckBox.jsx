import styles from "./ScrollCheckBox.module.css";

import { snakeCase } from "change-case";
import { useState } from "react";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../../../constants";
import { useGlobalState } from "../../../lib/providers/GlobalProvider";

function ScrollCheckBox({ 
        currentValue,
        currentField,
        checkboxValues,
        verbose_names = {}
    }) {
    const { userId } = useGlobalState();

    const [choice, setChoice] = useState(currentValue);
    const [isLoading, setIsLoading] = useState(false);

    console.log(currentValue);

    
    
    return (
        <p 
            key={`scroll_checkbox_${currentField}`}
            role='scrolling-checkbox'
            className={`${styles.checkbox} ${choice === 'nothing' && styles.nothing}`}
            onClick={() => null}
            >
                {verbose_names[choice]}
        </p>
    )
}

export default ScrollCheckBox
