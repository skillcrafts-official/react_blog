import { Link } from "react-router-dom"

import ActionButton from "@/components/ui/Button/ActionButton";
import Input from "@/components/ui/Input/Input";
import Title from "@/components/ui/Label/Title";
import { EMAIL_REQUIREMENTS } from "@/constants";
import { useState } from "react";
import { CHAR_REPLACER } from "@/components/utils";

function RecoveryForm() {
    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState({ emailFormat: false });

    function validateEmail( email ) {
        const newValidation = {};
        EMAIL_REQUIREMENTS.forEach(( req ) => {
            switch(req.type) {
                case (req.required && 'emailFormat'):
                    newValidation[req.type] = req.validate(email);
                    break;
                default:
                    newValidation[req.type] = false;
            }
        });
        setEmailValidation(newValidation);
    }

    function handleEmailChange( event ) {
        const newEmail = CHAR_REPLACER.email(event.target.value);
        setEmail(newEmail);
        validateEmail(newEmail);
    }

    const isEmailValid = Object.values(emailValidation).every((value) => value);

    return (
        // <div className="flex flex-col gap-5 m-12 items-center max-w-70">
        <div className="flex flex-col items-center gap-3 justify-center w-[800px]">
            <form className="flex flex-col gap-3 w-75">
                <Title>Восставновление</Title>
                <div className="section">
                    <Link to={'/login/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">вход</Link>
                    <Link to={'/registration/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">регистрация</Link>
                </div>
                <Input 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Введите Email"
                    required
                    requirements={EMAIL_REQUIREMENTS}
                    fieldValue={email}
                    state={emailValidation}
                    onChange={handleEmailChange}
                    variant={email ? isEmailValid === true ? 'valid': 'invalid' : 'primary'}
                />
                <Link to="/">
                    <ActionButton
                        disabled={!(isEmailValid)}
                        variant={(isEmailValid) ? 'primary' : 'disabled'}
                        >
                        Восстановить
                    </ActionButton>
                </Link>
            </form>
        </div>
    );
}

export default RecoveryForm
