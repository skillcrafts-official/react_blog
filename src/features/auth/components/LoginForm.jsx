import { Link, Form, useActionData, useNavigate } from "react-router-dom"

import ActionButton from "@/components/ui/Button/ActionButton";
import Input from "@/components/ui/Input/Input";
import Title from "@/components/ui/Label/Title";
import { useEffect } from "react";
import { useGlobalState } from "@/lib/providers/GlobalProvider";

function LoginForm() {
    const actionData = useActionData();
    const navigate = useNavigate();

    const {
        userId,
        handleUserId,
        handleLogStatus
    } = useGlobalState();

    useEffect(() => {
        if (actionData?.success) {
            handleUserId(actionData.userData.user_id);
            navigate(actionData.redirect);
        }
    }, [actionData, userId, navigate, handleUserId])

    function handleLogin() {
        handleLogStatus("login");
    }
    return (
        <div className="flex flex-col items-center gap-3 justify-center">
            <Form 
                className="flex flex-col gap-3 w-75"
                method="POST"
                action="/auth/login"
                >
                <Title>Вход</Title>
                <section className="section">
                    <Link to={'/recovery/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">восстановление</Link>
                    <Link to={'/registration/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">регистрация</Link>
                </section>
                <Input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                ></Input>
                <Input 
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                ></Input>
                <ActionButton
                    type="submit"
                    onClick={handleLogin}
                    >Войти</ActionButton>
            </Form>
            
        </div>
    );
}

export default LoginForm
