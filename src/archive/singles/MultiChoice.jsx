import styles from './MultiChoice.module.css'

import SimpleCheckBox from "../ui/Choice/SimpleCheckBox";

function MultiChoice({ choiceList, fetchFunc }) {
    
    return (
        <ul className={`flex flex-row flex-wrap ${styles.li}`}>
            {choiceList.map((choice, index) => 
                <li key={`multiChoice${index}`}>
                    <SimpleCheckBox 
                        selectedValue={choice}
                        checkboxValue={choice}
                        fetchFunc={fetchFunc}>
                        {/* {choice} */}
                    </SimpleCheckBox>
                </li>
            )}
        </ul>
    )
}

export default MultiChoice
