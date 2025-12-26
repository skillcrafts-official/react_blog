import styles from "./ScrollCheckBox.module.css";

import { snakeCase } from "change-case";
import { useState } from "react";
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from "../../../constants";
import { useGlobalState } from "../../../lib/providers/GlobalProvider";

function ScrollCheckBox({ 
        currentValue,
        currentField,
        // checkboxValues = [],
        // verbose_names = {},
        // handleChange = () => null,
        handleOnPrevClick = () => null,
        handleOnNextClick = () => null,
    }) {
    const { userId } = useGlobalState();
    const [value, setValue] = useState(currentValue);

    return (
        <div className="flex flex-row gap-5">
            <button type="button"
                onClick={handleOnPrevClick}>
                {"<"}
            </button>
            <p 
                key={`permissions_${currentField}`}
                role='multi-checkbox'
                className={styles.customCheckbox}
                >
                    {currentValue}
            </p>
            <button type="button"
                onClick={handleOnNextClick}>
                {">"}
            </button>
        </div>
    )
}

export default ScrollCheckBox
