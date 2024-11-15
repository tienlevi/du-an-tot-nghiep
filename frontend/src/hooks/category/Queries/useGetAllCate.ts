import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { cateServices } from '@/services/categoy.service';

const useGetAllCate = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: () => cateServices.getALLCate(),
    });
};

export default useGetAllCate;
