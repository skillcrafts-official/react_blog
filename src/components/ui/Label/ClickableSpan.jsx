import styles from './ClickableSpan.module.css';

function ClickableSpan({ children, variant = "primary", ...props }) {
    const baseStyles = "font-roboto w-fit"

    const variants = {
        primary: "text-[#d2d2d2ff] text-[12px] leading-[100%] font-normal",
        invert: "bg-[#d2d2d2ff] text-[#181818ff] p-1 text-[12px] leading-[100%] font-normal",
        secondary: "text-[#828282ff] text-[11px] leading-[120%] font-normal",
        "secondary-invert": "bg-[#828282ff] text-[#181818ff] p-1 text-[11px] leading-[120%] font-medium",
        link: "cursor-pointer text-[#107effff] text-[14px] leading-[100%] font-normal",
        "secondary-large": "text-[#828282ff] text-[12px] leading-[120%] font-normal",
        tracking: "text-[#828282ff] text-[12px] leading-[112%] font-normal text-[12px] tracking-wider text-center",
    }

    return (
        <span
            className={`${baseStyles} ${styles[variant]}`}
            { ...props }
            >
            {children}
        </span>
    )
}

export default ClickableSpan;
