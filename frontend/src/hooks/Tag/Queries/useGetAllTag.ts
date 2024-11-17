import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { tagServices } from '@/services/tag.service';

const useGetAllTag = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TAGS],
        queryFn: () => tagServices.getAllTag(),
    });
};

export default useGetAllTag;
