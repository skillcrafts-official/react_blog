import { useLanguage, useLanguageLevel } from '@/hooks/useResume'
import styles from './WorkLanguageWidget.module.css'

function WorkLanguageWidget({ languageList }) {
    const { allLanguages } = useLanguage();
    const { allLanguageLevels } = useLanguageLevel();

    return (
        <ul className={styles['li']}>
            {languageList.map(lang => (
                <li key={lang.id}
                    className={`${styles.checkbox} ${styles['active']}`}>
                    {allLanguages[lang.name]}
                    <ul>
                        <li className={`${styles.checkbox} ${styles['active']}`}>
                            {allLanguageLevels[lang.level]}
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default WorkLanguageWidget
