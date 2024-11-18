import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import tagService from '@/services/tag.service';

const useGetAllTagNoParams = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TAGS],
        queryFn: () => tagService.getAllTagsNoParams(),
    });
};

export default useGetAllTagNoParams;
