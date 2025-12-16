import styles from './UserIcon.module.css';
import defaultAvatar from '@/assets/images/defaults/default-avatar.svg'

import ProtectedImage from '@/components/ui/Image/ProtectedImage';
import Span from '@/components/ui/Label/Span';
import Title from '@/components/ui/Label/Title';

function UserIcon({ user }) {
    

    return (
        // <div className='flex flex-row gap-3'>
            <div className="grid grid-cols-[1fr_2fr] h-[100px] w-[263px] gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff]">
                <ProtectedImage
                    src={user.avatar ? `${user.avatar}` : ''}
                    alt="avatar"
                    className={styles.avatar}
                    fallback={defaultAvatar}
                />
                <div className='flex flex-col gap-1'>
                    <Span>{`${user.first_name} ${user.last_name}`}</Span>
                    <Span variant='secondary'>{`${user.profession}`}</Span>
                </div>
            </div>
    )
}

export default UserIcon
