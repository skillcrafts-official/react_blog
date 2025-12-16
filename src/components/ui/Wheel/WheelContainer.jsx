import { useRef } from "react";

function WheelContainer( elements ) {
    const containerRef = useRef();

    const handleWheel = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        const scrollAmount = e.deltaY
        containerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' // Плавная прокрутка
        });
    };
    return (
        <div>
            {/* </div> */}
            {/* <div className='flex flex-row gap-3 items-center w-[800px]'>
            {logStatus === "login" ? (
            <> */}
                {/* <div className='relative flex flex-row items-center justify-start w-[full] h-[230px] mb-3'>

                    <div className='absolute top-[130px]'>
                        <ProtectedImage
                            src={state.profile.avatar === null ? (
                                "../src/assets/images/wallpaper.png"
                                ) : (`${API_BASE_URL}${state.profile.avatar}`
                            )}
                            alt="avatar"
                            className='w-[100px] h-[100px] border-3 border-white object-cover rounded-full'
                            fallback="/default-product.jpg"
                        />
                        <div className='absolute top-0 right-0 rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                            <p>5</p>
                        </div>
                    </div>
                </div> */}
                <div ref={containerRef} className='subscriptions' onWheel={handleWheel}>
                    {/* {elements.map((element) => element)} */}
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                    <div className='rounded-full w-6 h-6 bg-red-900 flex items-center justify-center text-white font-medium'>
                        <p>5</p>
                    </div>
                </div>
                {/* <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-white text-[18px] font-[400] font-roboto'>
                        {state.profile.first_name} {state.profile.last_name}</h1>
                    <p className='text-[#dededeff] text-[14px] font-[300] font-roboto'>
                        {state.profile.profession}</p>
                </div> */}
                {/* <div className='flex flex-row gap-4 items-center justify-center pb-3'>
                    <a href={state.profile.link_to_telegram} target="_blank">
                        <img className='w-6'
                            src={"../../../public/-5027246994669780956/Logo.svg"} alt="telegram" />
                    </a>
                    <a href={state.profile.link_to_github} target="_blank">
                        <img className='w-6'
                            src="../../../public/github-mark-c791e9551fe4/github-mark/github-mark-white.svg" alt="github" />
                    </a>
                </div> */}
                {/* <hr className='border-1 w-[260px] border-[#1c1c1cff]' /> */}
                {/* <p className='text-white text-[12px] font-[400] leading-[18px] tracking-[0%] text-center py-3 px-5 font-roboto'>
                    {state.profile.full_desc}
                </p> */}
                {/* <hr className='border-1 w-[260px] border-[#1c1c1cff]' /> */}
                {/* <div className='flex flex-row gap-5 items-center justify-center p-4'>
                    <Link to="/profile/1/portfolio">
                        <button className='text-white font-roboto text-button bg-[#ed3024ff] rounded-full w-[120px] h-[40px]' type='button'>Мои работы</button>
                    </Link>
                    <button className='text-white font-roboto text-button bg-[#3137c9ff] rounded-full w-[120px] h-[40px]' type='button'>Написать мне</button>
                </div> */}
                {/* <Link to={'/add-new-post/'}>
                    <ActionButton>
                        Создать пост
                    </ActionButton>
                </Link>
                
            </div>
        </div> */}
        </div>
    )
}

export default WheelContainer
