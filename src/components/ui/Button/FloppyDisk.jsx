import styles from './FloppyDisk.module.css';

function FloppyDisk() {
    return (
        // <div className={styles.outbox}>
            <div className={styles.outbackContur}>
                <div className={styles.topContur}>
                    <div className={styles.inTopContur}></div>
                    <div className={styles.inTopContur}></div>
                </div>
                <div className={styles.bottomContur}>
                    <hr className={styles.horisontalLine}/>
                    <hr className={styles.horisontalLine}/>
                    <hr className={styles.horisontalLine}/>
                </div>
            </div>
        // </div>
    )
}

export default FloppyDisk
