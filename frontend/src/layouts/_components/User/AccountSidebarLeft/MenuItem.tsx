import { CaretRightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ name, path }: { name: string; path: string }) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => {
                const classActive = isActive ? 'translate-x-6 bg-[#16bcdc] font-medium text-white' : '';
                return `rounded-sm border  p-2 transition-transform duration-150 ease-in-out ${classActive} flex justify-between`;
            }}
        >
            <p>{name}</p> <CaretRightOutlined className='text-white' />
        </NavLink>
    );
};

export default MenuItem;
