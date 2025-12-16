import { useEffect } from "react";
import { useGlobalState } from "../../lib/providers/GlobalProvider";
import { useParams } from "react-router-dom";
import Title from "../../components/ui/Label/Title";

function UserDetail() {
    const params = useParams();
    const { userId, handleUserId } = useGlobalState();

    useEffect(() => {
        handleUserId(params.userId);
    }, [userId, params.userId, handleUserId])

    return (
        <div>
            <Title>Место для резюме и сертификатов (дипломов, деклараций, договоров и пр.)</Title>
        </div>
    )
}

export default UserDetail
