import DefaultCard from '../ProductCard/DefaultCard';
import { Link } from 'react-router-dom';

type IPropsShowmoreList = {
  enableButton?: {
    enable: boolean;
    hrefClick: string;
    textButton?: string;
  };
};

export default function ShowMoreList({
  enableButton = { enable: true, hrefClick: '' },
}: IPropsShowmoreList) {
  const lengthResponse = 8;
  return (
    <div>
      <h3 className="text-xl text-global font-bold">Sản phẩm nổi bật</h3>
      <div className="grid grid-cols-3 xl:grid-cols-4 mt-4">
        {Array.from({ length: lengthResponse }).map((_, index) => (
          <DefaultCard key={index} />
        ))}
      </div>
      {lengthResponse >= 8 && enableButton.enable && (
        <div className="w-full flex justify-center mt-8">
          <Link
            className="bg-white duration-300 hover:bg-hover hover:text-white shadow-lg px-6 py-2 rounded-md text-global font-semibold"
            to={enableButton.hrefClick}
          >
            {enableButton.textButton || 'Xem thêm'}
          </Link>
        </div>
      )}
    </div>
  );
}
