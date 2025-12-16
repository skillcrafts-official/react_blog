function AuthForm({ formType = 'login' }) {
    const formTypes = {
        login: {
            linkName: 'вход',
            linkTo: '/login/',
        },
        recovery: 'восстановление',
        registration: 'регистрация'
    }
    return (
        <div className="flex flex-col gap-5 m-12 items-center max-w-70">
            <form className="flex flex-col gap-5 items-center justify-center w-full">
                <Title>Вход</Title>
                <Input 
                    type="email"
                    placeholder="Email"
                ></Input>
                <Input 
                    type="password"
                    placeholder="Пароль"
                ></Input>
                <Link to="/">
                    <ActionButton>Войти</ActionButton>
                </Link>
            </form>
            <div className="flex flex-row gap-4">
                <Link to={'/recovery/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">восстановление</Link>
                <Link to={'/registration/'} className="font-roboto text-white text-[12px] leading-[100%] font-normal">регистрация</Link>
            </div>
        </div>
    )
}

export default AuthForm
