import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import categoryService from '@/services/category.service';

const useGetAllCategoriesNoParams = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: () => categoryService.getALLCategoriesNoParams(),
    });
};

export default useGetAllCategoriesNoParams;
