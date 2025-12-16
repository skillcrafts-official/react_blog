import styles from './Stories.module.css';
import { Link } from "react-router-dom";

function Stories() {
    return (
        <div className="w-full mt-15">
            <ul className="flex flex-row flex-wrap gap-3 items-center justify-between w-full">
            {/* <ul className={styles.stories}> */}
                <li className="flex items-center justify-center">
                    <Link className="relative flex h-[195px] w-[140px]">
                        <img className="rounded-md h-full w-full object-cover" src="src/assets/images/Rectangle 4-3.png" alt="" />
                        <div className="absolute flex flex-col justify-between h-full p-3">
                            <h6 className="text-left font-lato text-white text-[12px] font-[400]">Отдыхаю на природе</h6>
                            <span className="text-right font-lato text-white text-[12px] font-[400]">21.09.2020</span>
                        </div>
                    </Link>
                </li>
                <li className="flex items-center justify-center">
                    <Link className="relative flex h-[195px] w-[140px]">
                        <img className="rounded-md h-full w-full object-cover" src="src/assets/images/Rectangle 4-2.png" alt="" />
                        <div className="absolute flex flex-col justify-between h-full p-3">
                            <h6 className="text-left font-lato text-white text-[12px] font-[400]">Заканчиваю сложный проект</h6>
                            <span className="text-right font-lato text-white text-[12px] font-[400]">20.09.2020</span>
                        </div>
                    </Link>
                </li>
                <li className="flex items-center justify-center">
                    <Link className="relative flex h-[195px] w-[140px]">
                        <img className="rounded-md h-full w-full object-cover" src="src/assets/images/Rectangle 4-1.png" alt="" />
                        <div className="absolute flex flex-col justify-between h-full p-3">
                            <h6 className="text-left font-lato text-white text-[12px] font-[400]">Отдыхаю на природе</h6>
                            <span className="text-right font-lato text-white text-[12px] font-[400]">19.09.2020</span>
                        </div>
                    </Link>
                </li>
                <li className="flex items-center justify-center">
                    <Link className="relative flex h-[195px] w-[140px]">
                        <img className="rounded-md h-full w-full object-cover" src="src/assets/images/Rectangle 4.png" alt="" />
                        <div className="absolute flex flex-col justify-between h-full p-3">
                            <h6 className="text-left font-lato text-white text-[12px] font-[400]">Отдыхаю на природе</h6>
                            <span className="text-right font-lato text-white text-[12px] font-[400]">18.09.2020</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Stories
