import ColorVariantItem from '@/components/ProductAttribute/ColorVariantItem';
import useFilter from '@/hooks/_common/useFilter';
import { IColor } from '@/types/Color';
import { useCallback } from 'react';

type ColorProps = {
    colorData: IColor[];
};

const ColorList = ({ colorData }: ColorProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback((id: string) => {
        updateQueryParam({ ...query, color: id });
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 justify-center items-center gap-4">
            {colorData?.map((item) => (
                <ColorVariantItem
                    item={item}
                    key={item._id}
                    updateQueryParam={handleFilter}
                />
            ))}
        </div>
    );
};

export default ColorList;
