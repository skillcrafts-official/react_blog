import { NavLink } from "react-router-dom"

function PageNav() {
    return (
        <nav className="w-full flex justify-center mt-12">
            <ul className="flex flex-row gap-2">
                <NavLink className={"shadow-pagenav-base flex items-center justify-center w-10 h-10 bg-[#0d0d0dff] rounded-md"}>
                    <li className="text-white font-roboto text-[14px] font-normal">
                       {"<"}
                    </li>
                </NavLink>
                <NavLink className={"shadow-pagenav-base flex items-center justify-center w-10 h-10 bg-[#0d0d0dff] rounded-md"}>
                    <li className="text-white font-roboto text-[14px] font-normal">
                       1
                    </li>
                </NavLink>
                <NavLink className={"shadow-pagenav-selected flex items-center justify-center w-10 h-10 bg-[#106ce3ff] rounded-md"}>
                    <li className="text-white font-roboto text-[14px] font-normal">
                       2
                    </li>
                </NavLink>
                <NavLink className={"shadow-pagenav-base flex items-center justify-center w-10 h-10 bg-[#0d0d0dff] rounded-md"}>
                    <li className="text-white font-roboto text-[14px] font-normal">
                       3
                    </li>
                </NavLink>
                <NavLink className={"shadow-pagenav-base flex items-center justify-center w-10 h-10 bg-[#0d0d0dff] rounded-md"}>
                    <li className="text-white font-roboto text-[14px] font-normal">
                       {">"}
                    </li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default PageNav
