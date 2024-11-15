import Banner from '@/components/Banner';
import ShopBenefits from '@/components/ShopBenefits';
import ShowMoreList from '@/components/ShowMoreList';
import { useGetProductBest } from '@/hooks/Products/Queries/useGetProductBest';

const demoProducts = [
    {
        _id: '887d827628771299',
        title: 'Áo Thun Chạy Bộ Nam Adidas Own The Run',
        price: 525000,
        discount: 30,
        image: 'https://supersports.com.vn/cdn/shop/products/FS9799-1.jpg?v=1668074981',
    },
    {
        _id: '887d827628771292',
        title: 'Áo thun adidas soccer logo tee',
        price: 399000,
        discount: 0,
        image: 'https://bizweb.dktcdn.net/100/413/756/products/image-1685005166848.png?v=1685009601090',
    },
    {
        _id: '887d827628771292',
        title: 'Áo Thun 3 Sọc Classics Adicolor',
        price: 950000,
        discount: 15,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dc06adf61aab4e499ba9aefb00f92577_9366/Ao_Thun_3_Soc_Classics_Adicolor_DJo_IA4852_01_laydown.jpg',
    },
];

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
