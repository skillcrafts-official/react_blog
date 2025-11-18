function AddPost() {
    return (
        <div className="w-full mt-7">
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center justify-center shadow-add-post rounded-md bg-[#121212ff]">
                <input 
                    className="focus:outline-none w-full text-white text-[15px] font-[400] leading-[18px] tracking-[0%] p-7 font-roboto"
                    type="text" name="add-post" placeholder="Напишите что-нибудь..."/>
                <button className="flex items-center justify-center bg-[#ebebebff] w-11     h-11 rounded-full" type="button">
                    <img src="src/assets/images/Vector.svg" alt="" />
                </button>
                <button className="flex items-center justify-center bg-[#3137c9ff] w-11     h-11 rounded-full mr-5" type="button">
                    <img src="src/assets/images/Vector-1.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default AddPost
