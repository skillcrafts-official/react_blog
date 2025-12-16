import { Link, useNavigate } from "react-router-dom"
import ActionButton from "../ui/Button/ActionButton"
import { useState } from "react"

function PortfolioItem({ variant = "primary", poster, title, note, tags, linkTo }) {
    const navigate = useNavigate()
    const [ isPrimary, setIsPrimary ] = useState(true)

    return (
        <div className="flex flex-row bg-[#202020ff] shadow-simple-post h-[552px] w-150">
            <img className="w-75 object-cover" src={ poster } alt="" />
            <section className="flex flex-col justify-between m-7 gap-8 ">
                <h1 className="font-roboto text-white text-[24px] font-medium leading-[100%]">
                    {title}
                </h1>
                <p className="font-roboto text-[#d2d2d2ff] text-[16px] font-light leading-7">
                    {note}
                </p>
                <ul className="flex flex-row flex-wrap gap-3">
                    { tags.map( (tag) => (
                        <Link>
                            <li className="font-roboto text-white text-[11px] font-normal rounded-sm py-1 px-2 bg-[#EA8C1EFF]">
                                {tag}</li>
                        </Link>)
                    )}
                </ul>
                <div className="flex justify-end">
                    <ActionButton onClick={ () => window.open(linkTo, '_blank') }>Перейти на сайт</ActionButton>
                </div>
            </section>
        </div>
    )
}

export default PortfolioItem
