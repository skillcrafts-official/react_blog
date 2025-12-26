import styles from "./PriorityCheckBox.module.css";

import { snakeCase } from "change-case";
import { useState } from "react";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "@/constants";
import { useGlobalState } from "@/lib/providers/GlobalProvider";

function PriorityCheckBox({ 
        currentValue,
        currentField,
        // checkboxValues = [],
        verbose_names = {},
        handleOnClickPrev = () => null,
        handleOnClickNext = () => null,
    }) {

    const variants = {
        1: 'low',
        2: 'middle',
        3: 'high',
        4: 'critical',
    }

    return (
        <div className="flex flex-row gap-1 items-center">
            <button type="button"
                title="Снизить приоритет"
                className={styles['button']}
                onClick={() => handleOnClickPrev(
                    parseInt(currentValue) > 0 ? parseInt(currentValue) - 1 : parseInt(currentValue)
                )}>
                {"<<<"}
            </button>
            <p 
                key={`permissions_${currentField}`}
                role='multi-checkbox'
                className={`${styles['value']} ${styles[variants[currentValue]]}`}
                >
                    {verbose_names[currentValue]}
            </p>
            <button type="button"
                title="Повысить приоритет"
                className={styles['button']}
                onClick={() => handleOnClickNext(
                    parseInt(currentValue) < 4 ? parseInt(currentValue) + 1 : parseInt(currentValue)
                )}>
                {">>>"}
            </button>
        </div>
    )
}

export default PriorityCheckBox;
