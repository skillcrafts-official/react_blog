import styles from './WasteBasket.module.css'

function WasteBasket() {
    return (
        <div className={styles['external-outline']} title='Удалить'>
            <div className={styles['cap']}>
                <div className='border-[1px] w-[20%] border-red-600 rounded-2xl'></div>
                <div className='border-[1px] w-[100%] border-red-600 rounded-2xl'></div>
            </div>
            <div className={styles['basket']}>
                <div className='flex flex-row justify-center items-center border-[1.5px] w-[75%] h-[100%] border-red-600 rounded-[15%]'>
                    {/* <div className='h-[30%] w-[20%] bg-red-600'></div>
                    <div className='h-[60%] w-[10%] bg-red-600'></div>
                    <div className='h-[30%] w-[20%] bg-red-600'></div> */}
                    <p className='leading-0 mb-1 p-0 text-red-600'>&#65794;</p>
                </div>
            </div>
        </div>
    )
}

export default WasteBasket
