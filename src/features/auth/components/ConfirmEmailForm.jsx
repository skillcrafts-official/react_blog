import { Form, Link } from "react-router-dom"
import Title from "@/components/ui/Label/Title"
import Input from "@/components/ui/Input/Input"
import ActionButton from "@/components/ui/Button/ActionButton"

function ConfirmEmailForm() {
    return (
        <div className="flex flex-col gap-5 m-12 items-center max-w-70">
            <Form method="POST"
                action="/auth/confirm-email"
                className="form">
                <Title>Подтверждение Email</Title>
                <Input 
                    type="text"
                    name="confirmCode"
                    placeholder="Код подтверждения из Email"
                ></Input>
                <ActionButton
                    type="submit">Подтвердить</ActionButton>
            </Form>
        </div>
    )
}

export default ConfirmEmailForm
