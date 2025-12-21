import styles from './ConfirmEmail.module.css'

import { Form, Link, useActionData } from "react-router-dom"
import Title from "@/components/ui/Label/Title"
import Input from "@/components/ui/Input/Input"
import ActionButton from "@/components/ui/Button/ActionButton"
import { useEffect, useState } from "react"

function ConfirmEmail() {
    const actionData = useActionData();
    const [value, setValue] = useState('');

    const handleChangeCode = (event) => {
        if (event.target.value) {
            setValue(event.target.value);
        } else {
            setValue('');
        }
    }

    return (
        <div className="flex flex-col gap-3 min-w-80 max-w-160">
            <Form method="POST"
                action={"/auth/confirm-email"}
                className="flex flex-col gap-3 w-80 items-center">
                <Title>Подтверждение Email</Title>
                <Input 
                    type="email"
                    name="email"
                    placeholder="Email, указанный при регистрации"
                    value={localStorage.getItem('auth:email')}
                    onChange={handleChangeCode}
                    getFloppy={false}/>
                <Input 
                    type="text"
                    name="confirmCode"
                    placeholder="Код подтверждения из Email"
                    value={value}
                    onChange={handleChangeCode}
                    getFloppy={false}/>
                <section className={styles['section']}>
                    <ActionButton
                        onClick={() => null}
                        type='button'
                        variant={true ? 'primary' : 'disabled'}
                        >Отправить код повторно</ActionButton>
                    <ActionButton
                        type="submit"
                        // disabled={value ? true: false}
                        variant={value ? 'primary' : 'disabled'}
                        >Подтвердить</ActionButton>
                </section>
            </Form>
        </div>
    )
}

export default ConfirmEmail;
