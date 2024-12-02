import Banner from '@/components/Banner';
import ShopBenefits from '@/components/ShopBenefits';
import ShowMoreList from '@/components/ShowMoreList';
import useWindowSize from '@/hooks/_common/useWindowSize';
import { useGetProductBest } from '@/hooks/Products/Queries/useGetProductBest';

export default function Homepage() {
    const { data, isLoading } = useGetProductBest();
    const { windowWidth } = useWindowSize();
    console.log(windowWidth);
    return (
        <>
            <Banner />
            <div className="py-6 border-b-[1px] border-[#c0c0c0] mt-2">
                <div className="max-w-screen-default default:mx-auto mx-8">
                    <ShopBenefits />
                </div>
            </div>
            <div className="mt-4 lg:max-w-[1200px] 2xl:max-w-screen-default w-full default:mx-auto mx-6">
                {!isLoading && data && (
                    <ShowMoreList
                        enableButton={{
                            enable: true,
                            hrefClick: '/products',
                            limit: windowWidth < 1650 ? 6 : 8,
                        }}
                        data={data}
                    />
                )}
            </div>
        </>
    );
}
