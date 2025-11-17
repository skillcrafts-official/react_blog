import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom'
import { API_BASE_URL, API_DATA, API_ENDPOINTS } from '../../constants';
import { useGlobalState } from '../GlobalProvider';

const initialState = {
    profile: {},
    status: "loading",
}

function reducer(state, action) {
    switch (action.type) {
        case "profileData":
            return {
                ...state,
                profile: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error"
            };
        case "logout":
            return {
                ...state,
                status: "logout"
            }
        default:
            console.log(state);
            return
    }
}

export default function Sidebar() {
    const [state, dispatch ] = useReducer(reducer, initialState);
    const { userId, accessToken, updatedProfile } = useGlobalState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`, 
                    API_DATA("GET")
                );
                console.log(`${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch! Error: ${response.status}`)
                }
                const data = await response.json()
                dispatch({ type: "profileData", payload: data })
            } catch (error) {
                dispatch({ type: "dataFailed", payload: error })
            }
        };
        fetchData();
    }, [userId, accessToken, updatedProfile])

    if (state.status === "loading"){
      return <p className='text-[#dededeff]'>Loading data, please wait...</p>
    }
    if (state.status === "error"){
        return <p className='text-[#dededeff]'>Failed to fetch data. Please try again!</p>
    }

    return (
        <>
        {/* {logStatus === "login" ? (
        <> */}
            <div className='relative flex flex-col items-center justify-start w-full h-[230px] mb-3'>
                <img className='w-[300px] max-h-[180px] object-cover object-center'
                    src={state.profile.wallpaper === null ? (
                        "../src/assets/images/wallpaper.png"
                        ) : (`${API_BASE_URL}${state.profile.wallpaper}`
                    )} alt="wallpaper" />
                <div className='absolute top-[130px]'>
                    <img className='w-[100px] h-[100px] border-3 border-white object-cover rounded-full '
                        src={`${API_BASE_URL}${state.profile.avatar}`} alt="avatar" />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-white text-[18px] font-[400] font-roboto'>
                    {state.profile.first_name} {state.profile.last_name}</h1>
                <p className='text-[#dededeff] text-[14px] font-[300] font-roboto'>
                    {state.profile.profession}</p>
            </div>
            <div className='flex flex-row gap-4 items-center justify-center pb-3'>
                <a href={state.profile.link_to_instagram} target="_blank">
                    <img className='w-6'
                        src={"../../../public/-5027246994669780956/Logo.svg"} alt="instagram" />
                </a>
                <a href={state.profile.link_to_vk} target="_blank">
                    <img className='w-6'
                        src="../../../public/github-mark-c791e9551fe4/github-mark/github-mark-white.svg" alt="vk" />
                </a>
            </div>
            <hr className='border-1 w-[260px] border-[#1c1c1cff]' />
            <p className='text-white text-[12px] font-[400] leading-[18px] tracking-[0%] text-center py-3 px-5 font-roboto'>
                {state.profile.full_desc}
            </p>
            {/* <hr className='border-1 w-[260px] border-[#1c1c1cff]' />
            <div className='flex flex-row gap-5 items-center justify-center p-4'>
                <Link to="/profile/1/portfolio">
                    <button className='text-white font-roboto text-button bg-[#ed3024ff] rounded-full w-[120px] h-[40px]' type='button'>Мои работы</button>
                </Link>
                <button className='text-white font-roboto text-button bg-[#3137c9ff] rounded-full w-[120px] h-[40px]' type='button'>Написать мне</button>
            </div> */}
            
            
        {/* </>) : (<div></div>)} */}
        </>
    );
}
