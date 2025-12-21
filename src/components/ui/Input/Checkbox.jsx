function Checkbox({ children, ...props }) {
    return (
        <div className="flex flex-row gap-2">
            <input { ...props } />
            {children}
        </div>
    )
}

export default Checkbox
