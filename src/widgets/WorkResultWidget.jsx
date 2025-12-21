import styles from './WorkResultWidget.module.css';

function WorkResultWidget({ res, ...props }) {
    return (
        <ul {...props}>
            <li>
                {res}
            </li>
        </ul>
    )
}

export default WorkResultWidget
