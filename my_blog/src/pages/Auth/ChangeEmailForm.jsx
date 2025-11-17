import { useState } from "react";
import { Form } from "react-router-dom";
import { EMAIL_MATCHED, EMAIL_REQUIREMENTS } from "../../constants";
import { CHAR_REPLACER } from "../../components/utils";
import Title from "../../components/generals/Title";
import Input from "../../components/generals/Input";
import ActionButton from "../../components/generals/ActionButton";

function ChangeEmailForm() {
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [emailValidation, setEmailValidation] = useState({ emailFormat: false });
    const [email2Validation, setEmail2Validation] = useState({ emailFormat: false });
    const [emailIsNotMatched, setEmailIsNotMatched] = useState({ emailFormat: false });

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
    console.log(emailValidation)
    function validateEmail2( email ) {
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
        setEmail2Validation(newValidation);
    }

    function handleEmailChange( event ) {
        const newEmail = CHAR_REPLACER.email(event.target.value);
        setEmail(newEmail);
        validateEmail(newEmail);
    }

    function handleEmail2Change( event ) {
        const newEmail = CHAR_REPLACER.email(event.target.value);
        setEmail2(newEmail);
        validateEmail2(newEmail);
        validateEmailMatched(email, newEmail);
    }

    function validateEmailMatched( email1, email2 ) {
        const newValidation = {};
        EMAIL_MATCHED.forEach(( req ) => {
            switch(req.type) {
                case (req.required && 'isNotMatched'):
                    newValidation[req.type] = req.validate(email1, email2);
                    break;
                default:
                    newValidation[req.type] = false;
            }
        });
        setEmailIsNotMatched(newValidation);
    }

    const isEmailValid = Object.values(emailValidation).every((value) => value);
    const isEmail2Valid = Object.values(email2Validation).every((value) => value);
    const isEmailNotMatched = Object.values(emailIsNotMatched).every((value) => value);

    return (
        <div className="flex flex-col gap-5 m-12 items-center max-w-70">
            <Form 
                className="flex flex-col gap-5 items-center justify-center w-full"
                method="PUT" 
                action="/auth/email"
                >
                <Title>Изменение Email</Title>
                <Input 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Введите старый Email"
                    required
                    requirements={EMAIL_REQUIREMENTS}
                    fieldValue={email}
                    state={emailValidation}
                    onChange={handleEmailChange}
                    variant={email ? isEmailValid === true ? 'valid': 'invalid' : 'primary'}
                />
                <Input 
                    type="email2"
                    name="email2"
                    value={email2}
                    placeholder="Введите новый Email"
                    required
                    requirements={[...EMAIL_REQUIREMENTS, ...EMAIL_MATCHED]}
                    fieldValue={email2}
                    state={{ ...email2Validation, ...emailIsNotMatched }}
                    onChange={handleEmail2Change}
                    variant={email2 ? isEmail2Valid === true ? 'valid': 'invalid' : 'primary'}
                />
                <ActionButton
                    type="submit"
                    disabled={!(isEmailValid && isEmail2Valid && isEmailNotMatched)}
                    variant={(isEmailValid && isEmail2Valid && isEmailNotMatched) ? 'primary' : 'disabled'}
                    >
                    Изменить Email
                </ActionButton>
            </Form>
        </div>
    );
}

export default ChangeEmailForm
