import { Link } from "react-router-dom"

function Comments() {
    return (
        <section className="my-12">
            <ul className="flex flex-col gap-7">
                <li className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 items-center">
                        <img className="w-[30px] h-[30px]" 
                            src="../src/assets/images/avatars/Ellipse 2-1.png" alt="" />
                        <div className="flex flex-col">
                            <p className="font-roboto text-white text-[12px] font-medium">
                                Дмитрий Валак
                            </p>
                            <span className="font-roboto text-[#828282ff] text-[12px] font-[400]">
                                1 неделю назад
                            </span>
                        </div>
                    </div>
                    <p className="font-roboto text-white text-[12px] font-[400]">Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                    <button className="w-fit font-roboto text-[#107effff] text-[14px] font-[400]" type="button">ответить</button>
                </li>
                <li className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 items-center">
                        <img className="w-[30px] h-[30px]" 
                            src="../src/assets/images/avatars/Ellipse 2-1.png" alt="" />
                        <div className="flex flex-col">
                            <p className="font-roboto text-white text-[12px] font-medium">
                                Дмитрий Валак
                            </p>
                            <span className="font-roboto text-[#828282ff] text-[12px] font-[400]">
                                1 неделю назад
                            </span>
                        </div>
                    </div>
                    <p className="font-roboto text-white text-[12px] font-[400]">Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                    <button className="w-fit font-roboto text-[#107effff] text-[14px] font-[400]" type="button">ответить</button>
                    <ul className="flex flex-col gap-3 ml-7 mt-2">
                        <li className="flex flex-col gap-3">
                            <div className="flex flex-row gap-3 items-center">
                                <img className="w-[30px] h-[30px]" 
                                    src="../src/assets/images/avatars/Ellipse 2.png" alt="" />
                                <div className="flex flex-col">
                                    <p className="font-roboto text-white text-[12px] font-medium">
                                        Дмитрий Валак
                                    </p>
                                    <span className="font-roboto text-[#828282ff] text-[12px] font-[400]">
                                        1 неделю назад
                                    </span>
                                </div>
                            </div>
                            <p className="font-roboto text-white text-[12px] font-[400]">Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                            <button className="w-fit font-roboto text-[#107effff] text-[14px] font-[400]" type="button">ответить</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    )
}

export default Comments
