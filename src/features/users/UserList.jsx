import { useEffect, useRef, useState } from "react"
import { API_BASE_URL, API_DATA, API_ENDPOINTS, LINKS } from "@/constants";
import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";
import { useGlobalState } from "@/lib/providers/GlobalProvider";

function UserList() {
    const containerRef = useRef();
    
    const { setUserId, setProfileStatus, updatedProfile } = useGlobalState();

    const apiEndpoint = API_BASE_URL + API_ENDPOINTS.PROFILES.LIST;
    const apiGetDataConfig = API_DATA('GET');

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const loader = async () => {
            try {
                const response = await fetch(
                    apiEndpoint, apiGetDataConfig
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch! Error: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setErrors('');
            } catch(error) {
                setErrors(error);
            } finally {
                setIsLoading(false)
            }
        }
        loader();

    }, [])

    const handleWheel = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        const scrollAmount = e.deltaY * 5
        containerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' // Плавная прокрутка
        });
    };

    const handleClick = ( user ) => {
        console.log(user);
        setUserId(user);
    }

    return (
        <div className="flex flex-row w-200 items-center">
            <div className="bg-[#828282ff] w-[12px] h-25 rounded-l-[12px]"></div>
            <div ref={containerRef} className='scrollable-container' onWheel={handleWheel}>
                {users.map((user) => (
                    <Link key={user.user} to={LINKS.USERS.DETAIL(user.user)}
                        onClick={() => handleClick(user.user)}
                        >
                        <UserIcon user={user} />
                    </Link>
                ))}
            </div>
            <div className="bg-[#828282ff] w-[12px] h-25 rounded-r-[12px]"></div>
        </div>
    )
}

export default UserList
