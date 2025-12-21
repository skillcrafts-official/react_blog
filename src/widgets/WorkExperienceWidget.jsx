import styles from './WorkExperienceWidget.module.css'
import WorkResultWidget from './WorkResultWidget'

function WorkExperienceWidget({ exp }) {
    return (
        <ul className={styles['li']}>
            <li>
                {exp.company}
            </li>
            <li>
                {exp.indastry_desc}
            </li>
            <li>
                {exp.start_year}
            </li>
            <li>
                {exp.is_current ? 'по настоящее время' : exp.end_year}
            </li>
            <li>
                {exp.start_position}
            </li>
            <li>
                {exp.finish_position && exp.finish_position}
            </li>
            <li>
                {exp.results.map((res) => (
                    <WorkResultWidget
                        key={res.id}
                        res={res.result}/>
                ))}
            </li>
        </ul>
    )
}

export default WorkExperienceWidget
