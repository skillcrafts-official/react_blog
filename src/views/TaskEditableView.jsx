import ActionButton from "@/components/ui/Button/ActionButton"
import Checkbox from "@/components/ui/Choice/Checkbox"
import Input from "@/components/ui/Input/Input"
import Textarea from "@/components/ui/Input/Textarea"
import Span from "@/components/ui/Label/Span"
import { useEffect } from "react"
import { Form, useActionData, useNavigate } from "react-router-dom"

function TaskEditableView() {
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.success) {
            navigate(-1);
        }
    }, [actionData, navigate]);
    
    return (
        <div className="flex flex-col items-center gap-3 justify-center">
            <Form 
                className="flex flex-col gap-3 w-80 items-center"
                // onSubmit={handleSubmit}
                // encType="multipart/form-data">
                action={"/workflows/create-task"}
                method="POST">
                <Input 
                    type="text"
                    name="todo"
                    // value={email}
                    placeholder="Введите название задачи"
                    required
                    // requirements={EMAIL_REQUIREMENTS}
                    // fieldValue={email}
                    // state={emailValidation}
                    // onChange={handleEm/ailChange}
                    // variant={email ? isEmailValid === true ? 'valid': 'invalid' : 'primary'}
                    getFloppy={false}/>
                <Textarea 
                    // type="password"
                    name="description"
                    placeholder="Введите описание задачи (необязательно)"
                    // requirements={PASSWORD_REQUIREMENTS}
                    // fieldValue={password}
                    // state={pwdValidation}
                    // onChange={handlePwdChange}
                    // variant={pass/word ? isPasswordValid === true ? 'valid': 'invalid' : 'primary'}
                    // value={password}
                    getFloppy={false}/>
                <ActionButton
                    type="submit"
                    aria-label="Создать задачу"
                    // disabled={!(isConfirmedPolicy && isConfirmedConsent && isEmailValid && isPasswordValid && isPasswordMatched)}
                    // variant={(isConfirmedPolicy && isConfirmedConsent && isEmailValid && isPasswordValid && isPasswordMatched) ? 'primary' : 'disabled'}
                    >
                    Создать задачу
                </ActionButton>
            </Form>
            
        </div>
    )
}

export default TaskEditableView
