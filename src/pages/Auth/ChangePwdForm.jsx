import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { PASSWORD_MATCHED, PASSWORD_REQUIREMENTS } from "@/constants";
import { CHAR_REPLACER } from "@/components/utils";
import Title from "@/components/ui/Label/Title";
import Input from "@/components/ui/Input/Input";
import ActionButton from "@/components/ui/Button/ActionButton";
import { useGlobalState } from "@/lib/providers/GlobalProvider";

function ChangePwdForm() {
    const [title, setTitle] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [pwdValidation, setPwdValidation] = useState({ base: false });
    const [pwdMatched, setPwdMatched] = useState({ isMatched: false });

    function validatePassword( pwd ) {
        const newValidation = {};
        PASSWORD_REQUIREMENTS.forEach(( req ) => {
            switch(req.type) {
                case (req.required && 'min_length'):
                    newValidation[req.type] = req.validate(pwd);
                    break;
                case (req.required && 'uppercase'):
                    newValidation[req.type] = req.validate(pwd);
                    break;
                case (req.required && 'lowercase'):
                    newValidation[req.type] = req.validate(pwd);
                    break;
                case (req.required && 'digits'):
                    newValidation[req.type] = req.validate(pwd);
                    break;
                case (req.required && 'special_chars'):
                    newValidation[req.type] = req.validate(pwd);
                    break;
                default:
                    newValidation[req.type] = false;
            }
        });
        setPwdValidation(newValidation);
        console.log(pwdValidation)
    };

    function validatePasswordMatched( pwd1, pwd2 ) {
        const newValidation = {};
        PASSWORD_MATCHED.forEach(( req ) => {
            switch(req.type) {
                case (req.required && 'isMatched'):
                    newValidation[req.type] = req.validate(pwd1, pwd2);
                    break;
                default:
                    newValidation[req.type] = false;
            }
        });
        setPwdMatched(newValidation);
    }

    function handlePwdChange( event ) {
        const newPwd = CHAR_REPLACER.pwd(event.target.value);
        setPassword(newPwd);
        validatePassword(newPwd);
    };

    function handlePwd2Change( event ) {
        const newPwd = CHAR_REPLACER.pwd(event.target.value);
        setPassword2(newPwd);
        validatePasswordMatched(password, newPwd);
    };

    const isPasswordValid = Object.values(pwdValidation).every((value) => value);
    const isPasswordMatched = Object.values(pwdMatched).every((value) => value);
    const isOldPasswordValid = Object.values(pwdMatched).every((value) => value);

    return (
        <Form className="flex flex-col gap-7 w-100"
            method="PUT" 
            action="/auth/password"
            >
            <Title>Изменение пароля</Title>
            {/* <Input 
                type="password"
                name="oldPassword"
                placeholder="Введите пароль"
                required
                fieldValue={oldPassword}
            /> */}
            <Input 
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                requirements={PASSWORD_REQUIREMENTS}
                fieldValue={password}
                state={pwdValidation}
                onChange={handlePwdChange}
                variant={password ? isPasswordValid === true ? 'valid': 'invalid' : 'primary'}
                value={password}
            />
            <Input 
                type="password"
                name="password2"
                placeholder="Подтвердите пароль"
                required
                requirements={PASSWORD_MATCHED}
                fieldValue={password2}
                state={pwdMatched}
                onChange={handlePwd2Change}
                variant={password2 ? isPasswordMatched ? 'valid': 'invalid' : 'primary'}
                value={password2}
            />
            <ActionButton
                type="submit"
                disabled={!(isOldPasswordValid && isPasswordValid && isPasswordMatched)}
                variant={(isOldPasswordValid && isPasswordValid && isPasswordMatched) ? 'primary' : 'disabled'}
                >
                Изменить пароль
            </ActionButton>
        </Form>
    );
}

export default ChangePwdForm
