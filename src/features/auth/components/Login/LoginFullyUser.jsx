import ActionButton from "@/components/ui/Button/ActionButton";
import Input from "@/components/ui/Input/Input";
import { useGlobalState } from "@/lib/providers/GlobalProvider";
import { Form } from "react-router-dom";

function LoginFullyUser() {
    const { handleLogStatus } = useGlobalState();
    
    function handleLogin() {
        handleLogStatus("login");
    }

    return (
        <Form 
            className="flex flex-col gap-3 items-center"
            method="POST"
            action="/auth/login"
            >
            <Input 
                type="email"
                name="email"
                placeholder="Email"
                required
                getFloppy={false}/>
            <Input 
                type="password"
                name="password"
                placeholder="Пароль"
                required
                getFloppy={false}/>
            <ActionButton
                type="submit"
                onClick={handleLogin}
                >Войти</ActionButton>
        </Form>
    )
}

export default LoginFullyUser;
