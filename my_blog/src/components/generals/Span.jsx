function Span({ children, variant = "primary", ...props }) {
    const baseStyles = "font-roboto w-fit"

    const variants = {
        primary: "text-[#d2d2d2ff] text-[12px] leading-[100%] font-normal",
        link: "cursor-pointer text-[#107effff] text-[14px] leading-[100%] font-normal"
    }

    return (
        <h1
            className={`${baseStyles} ${variants[variant]}`}
            { ...props }
            >
            {children}
        </h1>
    )
}

export default Span
