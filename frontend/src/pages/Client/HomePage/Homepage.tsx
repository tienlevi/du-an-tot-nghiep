import Banner from '@/components/Banner';
import ShopBenefits from '@/components/ShopBenefits';
import ShowMoreList from '@/components/ShowMoreList';
import { useGetProductBest } from '@/hooks/Products/Queries/useGetProductBest';

export default function Homepage() {
    const { data, isLoading } = useGetProductBest();
    return (
        <>
            <Banner />
            <div className="py-6 border-b-[1px] border-[#c0c0c0] mt-2">
                <div className="max-w-screen-default default:mx-auto mx-4">
                    <ShopBenefits />
                </div>
            </div>
            <div className="mt-4 max-w-screen-default default:mx-auto mx-4">
                {!isLoading && data && <ShowMoreList data={data} />}
            </div>
        </>
    );
}
