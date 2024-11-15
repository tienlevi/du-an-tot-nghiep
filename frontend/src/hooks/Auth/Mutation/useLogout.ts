import { QUERY_KEY } from '@/constants/queryKey';
import { doLogout } from '@/store/slice/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const handleLogout = () => {
        queryClient.removeQueries({
            queryKey: [QUERY_KEY.CART],
        });
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        dispatch(doLogout());
        navigator('/');
        queryClient.removeQueries({ queryKey: [QUERY_KEY.USERS] });
        queryClient.resetQueries();
    };
    return handleLogout;
};

export default useLogout;
