import Banner from '@/components/Banner';
import DefaultCard from '@/components/ProductCard/DefaultCard';
import ShopBenefits from '@/components/ShopBenefits';

export default function Homepage() {
  return (
    <>
      <Banner />
      <div className="py-6 border-b-[1px] border-[#c0c0c0] mt-2">
        <div className="max-w-screen-default default:mx-auto mx-4">
          <ShopBenefits />
        </div>
      </div>
      <div className="mt-4 max-w-screen-default default:mx-auto mx-4">
        <h3 className='text-xl text-global font-bold'>Sản phẩm nổi bật</h3>
        <div className='flex justify-between mt-4'>
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
        </div>
      </div>
    </>
  );
}
