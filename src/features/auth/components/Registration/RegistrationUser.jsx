import { useCallback, useEffect, useState } from "react"
// import RegistrationTemporaryUser from "../Login/LoginGuestUser"
import Title from "@/components/ui/Label/Title";
import ActionButton from "@/components/ui/Button/ActionButton";
import { Link } from "react-router-dom";
import SimpleCheckBox from "@/components/ui/Choice/SimpleCheckBox";
import { RussianPermanentCompliantBanner } from "@/features/compliance/CompliantBunner";
import RegistrationPermanentUser from "./RegistrationPermanentUser";

function RegistrationUser() {
    const renderFullyRegistration = () => {
        return <RegistrationPermanentUser/>
    }

    return (
        <div className="flex flex-col gap-3 min-w-80 max-w-160">
            <section className="flex flex-row gap-5 justify-center">
                <Link to={'/recovery/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">восстановление</Link>
                <p className="font-roboto text-[#ffffff77] text-[12px] leading-[100%] font-normal">или</p>
                <Link to={'/login/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">вход</Link>
            </section>
            <Title>Регистрация</Title>
            {renderFullyRegistration()}
        </div>
    )
}

export default RegistrationUser;
