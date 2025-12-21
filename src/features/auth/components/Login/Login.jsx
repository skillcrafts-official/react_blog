import { Link, Form, useActionData, useNavigate } from "react-router-dom"

import ActionButton from "@/components/ui/Button/ActionButton";
import Input from "@/components/ui/Input/Input";
import Title from "@/components/ui/Label/Title";

import { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import LoginGuestUser from "./LoginGuestUser";
import SimpleCheckBox from "@/components/ui/Choice/SimpleCheckBox";
import LoginFullyUser from "./LoginFullyUser";

function Login() {
    const actionData = useActionData();
    const navigate = useNavigate();

    const [selectedUserType, setSelectedUserType] = useState('fully');
    
    const verbose_names = {
        fully: 'Войти',
        guest: 'Войти как Гость',
    }

    const handleChangeUserType = useCallback((value) => {
        setSelectedUserType(value);
    }, [])

    const { userId, handleUserId } = useGlobalState();

    useEffect(() => {
        if (actionData?.success) {
            handleUserId(actionData.userData.user_id);
            navigate(actionData.redirect);
        }
    }, [actionData, userId, navigate, handleUserId])

    const renderFullyLogin = () => {
        return <LoginFullyUser/>
    }

    const renderGuestLogin = () => {
        return <LoginGuestUser/>
    }

    return (
        <div className="flex flex-col gap-3 min-w-80 max-w-160">
            <section className="flex flex-row gap-5 justify-center">
                <Link to={'/recovery/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">восстановление</Link>
                <p className="font-roboto text-[#ffffff77] text-[12px] leading-[100%] font-normal">или</p>
                <Link to={'/registration/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">регистрация</Link>
            </section>
            <Title>Вход</Title>
            <section className="flex flex-row justify-center">
                <SimpleCheckBox
                    selectedValue={verbose_names[selectedUserType]}
                    currentField='guest'
                    checkboxValue='Войти как Гость'
                    fetchFunc={handleChangeUserType}/>
                <SimpleCheckBox
                    selectedValue={verbose_names[selectedUserType]}
                    currentField='fully'
                    checkboxValue='Войти'
                    fetchFunc={handleChangeUserType}/>
            </section>
            {selectedUserType === 'fully' ? renderFullyLogin() : renderGuestLogin()}
            
            
        </div>
    );
}

export default Login
