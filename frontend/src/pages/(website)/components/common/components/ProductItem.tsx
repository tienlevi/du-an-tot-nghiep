import i18n from './LangConfig';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import RatingComp from './Rating';

interface Props {
  _id: string | number;
  title: string;
  price: number;
  image: string;
  discount: number;
}

const ProductItem = (item: Props) => {
  return (
    <div className="relative mx-2 ">
      <div className="relative rounded flex items-center justify-center bg-zinc-100 w-[270px] h-80 md:h-60 transform transition-transform duration-300 hover:scale-105 focus:outline-none hover:-translate-y-2">
        {item.discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white py-1 px-3 m-2 rounded">
            -{item.discount}%
          </div>
        )}
        <Link to={{ pathname: `/allProducts/${item.title}` }}>
          <img
            loading="lazy"
            src={item.image}
            className="max-h-52  w-full object-contain"
          />
        </Link>
      </div>
      <div className="flex md:items-start items-center flex-col ">
        <h3 className="text-lg font-base mt-4">{item.title}</h3>
        <p className="text-red-500  text-sm font-semibold line-clamp-2">
          ${item.price}
          {item.discount && (
            <span className="ml-2 text-gray-500 text-sm font-semibold line-through">
              ${item.price + (item.price * item.discount) / 100}
            </span>
          )}
        </p>
        {/* <span>
          <div className="flex mt-2 text-gray-500 text-sm font-semibold gap-2 items-center ">
            <RatingComp
              text={i18n.t('productPage.review')}
              variant="primary"
            />
          </div>
        </span> */}
      </div>
    </div>
  );
};

export default ProductItem;
