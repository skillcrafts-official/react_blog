import ActionButton from "@/components/ui/Button/ActionButton"
import Input from "@/components/ui/Input/Input"
import Title from "@/components/ui/Label/Title"

function Feedback() {
    return (
        <form>
            <Title variant='tertiary'>
                Форма обратной связи...
            </Title>
            <Input></Input>
            <Input></Input>
            <ActionButton>Отправить</ActionButton>
        </form>
    )
}

export default Feedback
