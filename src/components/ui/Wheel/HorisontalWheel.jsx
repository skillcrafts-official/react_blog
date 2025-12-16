import styles from './HorisontalWheel.module.css';
import { useRef } from "react";

function HorisontalWheelList({ children }) {
    const containerRef = useRef();
    
    const handleWheel = (e) => {
        e.stopPropagation();
        const scrollAmount = e.deltaY
        containerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' // Плавная прокрутка
        });
    };

    return (
        <div ref={containerRef} 
            className={styles['scrollable-container']} 
            onWheel={handleWheel}>
            {children}
        </div>
    )
}

export default HorisontalWheelList;