import { useCallback, useMemo } from "react";

export const useRegistrationPermanentUser = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event);
        const submitData = FormData(event.target);

        console.log(submitData.get('email'));
    };
    
    const value = useMemo(() => ({
        handleSubmit
    }), [
        // handleSubmit
    ]);

    return value;
}