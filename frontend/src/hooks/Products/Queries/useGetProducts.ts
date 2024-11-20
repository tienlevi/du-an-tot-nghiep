import { QUERY_KEY } from '@/constants/queryKey';
import { ProductServices } from '@/services/products.service';
import { useQuery } from '@tanstack/react-query';
import { Params } from 'react-router-dom';

const useGetProducts = (params?: Params) => {
    return useQuery({
        queryKey: [
            QUERY_KEY.PRODUCTS,
            ...Object.values(params || {}),
            ...Object.keys(params || {}),
        ],
        queryFn: () => ProductServices.getAll(params),
    });
};

export default useGetProducts;
