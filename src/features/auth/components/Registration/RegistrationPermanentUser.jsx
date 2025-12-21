import { Link, Form, useActionData, useNavigate } from "react-router-dom"
import { EMAIL_REQUIREMENTS, PASSWORD_REQUIREMENTS, PASSWORD_MATCHED } from "@/constants";

import ActionButton from "@/components/ui/Button/ActionButton";
import Input from "@/components/ui/Input/Input";

import { useEffect, useState } from "react";
import { CHAR_REPLACER } from "@/components/utils";
import Span from "@/components/ui/Label/Span";
import Checkbox from "@/components/ui/Input/Checkbox";
// import { useRegistrationPermanentUser } from "@/hooks/useAuthenticate";

function RegistrationPermanentUser() {
    const actionData = useActionData();
    const navigate = useNavigate();
    // const { handleSubmit } = useRegistrationPermanentUser();

    useEffect(() => {
        if (actionData?.success) {
            console.log(actionData)
            localStorage.setItem('auth:userId', actionData.user.pk);
            localStorage.setItem('user:isConfirmed', actionData.user.is_comfirmed);
            console.log(localStorage)
            navigate(actionData.redirect);
        }
    }, [actionData, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [pwdValidation, setPwdValidation] = useState({ base: false });
    const [pwdMatched, setPwdMatched] = useState({ isMatched: false });
    const [emailValidation, setEmailValidation] = useState({ emailFormat: false });
    const [isConfirmedPolicy, setIsConfirmedPolicy] = useState(false);
    const [isConfirmedConsent, setIsConfirmedConsent] = useState(false);

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

    function handleEmailChange( event ) {
        const newEmail = CHAR_REPLACER.email(event.target.value);
        setEmail(newEmail);
        validateEmail(newEmail);
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

    const handleChangeConfirmedPolicy = (event) => {
        setIsConfirmedPolicy(event.target.checked);
    }

    const handleChangeConfirmedConsent = (event) => {
        setIsConfirmedConsent(event.target.checked);
    }

    const renderConfirmedPolicy = () => {
        return <Span variant="secondary">принимаете <a href="/privacy" target="_blank">
            <Span variant='link' className='text-[#107effff] text-[12px] underline'>Политику конфиденциальности</Span></a>
        </Span>
    }

    const renderConfirmedConsent = () => {
        return <Span variant="secondary">
            даёте согласие на обработку персональных данных
        </Span>
    }

    const isEmailValid = Object.values(emailValidation).every((value) => value);
    const isPasswordValid = Object.values(pwdValidation).every((value) => value);
    const isPasswordMatched = Object.values(pwdMatched).every((value) => value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event)
        const formData = new FormData(event.target);

        const submitData = new FormData();
    }

    return (
        // <div className="flex flex-col gap-5 m-12 items-center max-w-70">
        <div className="flex flex-col items-center gap-3 justify-center">
            <Form 
                className="flex flex-col gap-3 w-80 items-center"
                // onSubmit={handleSubmit}
                // encType="multipart/form-data">
                action={"/auth/registration"}
                method="POST">
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
                    getFloppy={false}/>
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
                    getFloppy={false}/>
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
                    getFloppy={false}/>
                <div className="flex flex-col gap-1 my-2">
                    <Span variant="secondary-large">Нажимая кнопку <strong>Зарегистрироваться</strong>,
                        вы:
                    </Span>
                    <Checkbox 
                        type="checkbox"
                        name="policy"
                        required
                        onChange={(event) => handleChangeConfirmedPolicy(event)}>
                        {renderConfirmedPolicy()}
                    </Checkbox>
                    <Checkbox 
                        type="checkbox"
                        name="consent"
                        required
                        onChange={(event) => handleChangeConfirmedConsent(event)}>
                        {renderConfirmedConsent()}
                    </Checkbox>
                </div>
                <ActionButton
                    type="submit"
                    aria-label="Зарегистрироваться"
                    disabled={!(isConfirmedPolicy && isConfirmedConsent && isEmailValid && isPasswordValid && isPasswordMatched)}
                    variant={(isConfirmedPolicy && isConfirmedConsent && isEmailValid && isPasswordValid && isPasswordMatched) ? 'primary' : 'disabled'}
                    >
                    Зарегистрироваться
                </ActionButton>
            </Form>
            
        </div>
    );
}

export default RegistrationPermanentUser;
