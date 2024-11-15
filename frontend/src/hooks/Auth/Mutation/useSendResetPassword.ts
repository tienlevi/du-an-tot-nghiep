import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';
import showMessage from '@/utils/ShowMessage';

const useSendResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['SEND_RESET_PASSWORD'],
        mutationFn: (body: { email: string }) =>
            AuthService.sendResetPassword(body),
        onSuccess: (data: any) => {
            navigate('/checkEmail');
            showMessage(data.data.message, 'success', 5000);
        },
        onError: (error: any) => {},
    });
};

export default useSendResetPassword;
