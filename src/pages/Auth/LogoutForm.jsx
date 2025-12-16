import { Link, Form, useNavigate } from "react-router-dom";
import Title from "../../components/ui/Label/Title";
import ActionButton from "../../components/ui/Button/ActionButton";
import { useGlobalState } from "../../lib/providers/GlobalProvider";

function LogoutForm() {
    const {
        handleUserId,
        handleAccess,
        handleLogStatus,
        setProfileStatus,
    } = useGlobalState();

    const navigate = useNavigate();
      
    const handleGoBack = () => {
        navigate(-1);
    };

    function handleLotout() {
        handleAccess("");
        handleLogStatus("logout");
        handleUserId(null);
        setProfileStatus('old');
        
    }

    return (
        <div className="grid items-center justify-center">
            <Form 
                // className="form"
                method="POST"
                action="/auth/logout"
                >
                <Title>Подтвердите выход</Title>
                <section className="section w-75">
                    <ActionButton
                        type="submit"
                        onClick={handleLotout}
                        >Выйти</ActionButton>
                    <Link to="/">
                        <ActionButton
                            type="button"
                            onClick={handleGoBack}
                            >Остаться</ActionButton>
                    </Link>
                </section>
            </Form>
        </div>
    );
}

export default LogoutForm
