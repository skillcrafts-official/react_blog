import RussianTemporaryCompliantBanner from "@/features/compliance/CompliantBunner"

function LoginGuestUser() {
    const renderComplianceBunner = () => {
        return <RussianTemporaryCompliantBanner/>
    }
    return (
        <div>
            {renderComplianceBunner()}
        </div>
    )
}

export default LoginGuestUser
