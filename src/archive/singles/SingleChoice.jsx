import styles from './SingleChoice.module.css'

import SimpleCheckBox from "../ui/Choice/SimpleCheckBox";
import { useEffect, useState } from 'react';

function SingleChoice({ choiceList, selectedChoice, fetchFunc }) {

    return (
        <ul className={`flex flex-row flex-wrap ${styles.li}`}>
            {choiceList.map((choice, index) => 
                <li key={`singleChoice${index}`}>
                    <SimpleCheckBox 
                        // activeStatus={choice === selectedChoice}
                        selectedValue={selectedChoice}
                        checkboxValue={choice}
                        fetchFunc={fetchFunc}>
                        {choice}
                    </SimpleCheckBox>
                </li>
            )}
        </ul>
    )
}

export default SingleChoice
