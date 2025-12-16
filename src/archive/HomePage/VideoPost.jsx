import { Link } from "react-router-dom"

function VideoPost() {
    return (
        <div className="w-full mt-7">
            <div className="flex flex-col gap-3 p-6 bg-[#202020ff] rounded-md shadow-simple-post">
                <div className="flex items-center justify-center">
                    <img className="w-full object-cover" src="src/assets/images/Rectangle 5.png" alt="" />
                    <Link className="absolute">
                        <img src="src/assets/images/Vector2.svg" alt="" />
                    </Link>
                </div>
                <h6 className="font-roboto text-white text-[18px] font-[500]">
                    Купил новый ноутбук за 150 000 руб</h6>
                <div className="flex md:flex-row flex-col gap-3 justify-between">
                    <div className="flex flex-row gap-3 items-center">
                        <span className="font-lato text-[#828282ff] text-[12px] font-[400]">
                            21.06.2020</span>
                        <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                        <Link className="font-lato text-[#828282ff] text-[12px] font-[400]">
                            продвижение видео</Link>
                    </div>
                    <Link className="font-roboto text-[#107effff] text-[14px] font-[400]">
                    оставить комментарий</Link>
                </div>
            </div>
        </div>
    )
}

export default VideoPost
