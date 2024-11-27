import SizeVariantItem from '@/components/ProductAttribute/SizeVariantItem';
import useFilter from '@/hooks/_common/useFilter';
import { ISize } from '@/types/Size';
import { useCallback } from 'react';

type SizeProps = {
    sizeData: ISize[];
};

const SizeList = ({ sizeData }: SizeProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback(
        (id: string) => {
            updateQueryParam({ ...query, ['size']: id, page: 1 });
        },
        [query],
    );
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center  gap-2 ">
            {sizeData?.map((item) => (
                <SizeVariantItem
                    item={item}
                    key={item._id}
                    updateQueryParam={handleFilter}
                />
            ))}
        </div>
    );
};

export default SizeList;
