import styles from './VerticalWheelList.module.css';
import { useRef } from "react";

function VerticalWheelList({ children }) {
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

export default VerticalWheelList;
