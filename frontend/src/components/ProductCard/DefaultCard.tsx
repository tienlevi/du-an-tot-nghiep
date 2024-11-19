import { HeartOutlined } from '@ant-design/icons';
import DrawerAddCart from '../DrawerAddCart';
import { Rate } from 'antd';
import { Currency } from '@/utils/FormatCurreny';
import { Link } from 'react-router-dom';
import { IProduct } from '@/types/ProductNew';
interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
export default function DefaultCard({ item }: { item: IProduct }) {
    const originalPrice = item.discount
        ? item.price / (1 - item.discount / 100)
        : item.price;
    return (
        <div className="h-[452px] group cursor-pointer">
            <div className="w-[310px] h-[310px] relative">
                <Link to={`/products/${item._id}`}>
                    <img
                        className="object-contain "
                        src={item.variants[0].image}
                        alt=""
                    />
                </Link>
                <div className="opacity-0 px-2 py-1 group-hover:opacity-100 flex items-center w-full justify-between duration-300 absolute bottom-0">
                    <DrawerAddCart item={item} classNameBtn="text-global hover:bg-hover px-10 duration-300 hover:text-white bg-white shadow-md flex justify-center w-full h-[32px] flex items-center justify-center rounded-md text-sm font-medium">
                        Thêm vào giỏ hàng
                    </DrawerAddCart>
                    <button className="w-1/6 h-[32px] bg-global hover:bg-opacity-80 duration-300 rounded-lg text-white">
                        <HeartOutlined />
                    </button>
                </div>
            </div>
            <Link to={`/products/${item._id}`} className="text-global text-sm">
                <h3 className=" font-semibold group-hover:text-hover mt-4 w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
                    {item.name}
                </h3>
                <div className="flex items-center ">
                    <Rate allowHalf value={5} disabled className="text-xs" />{' '}
                    {!item._id && (
                        <span className="text-xs text-global">( 5 )</span>
                    )}
                </div>
                <p className="font-semibold mt-1">{Currency(item.price)}</p>
                {item.discount !== 0 ? (
                    <div className="mt-1">
                        <div className="flex gap-2 items-center">
                            <span className="line-through">
                                {Currency(originalPrice)}
                            </span>
                            <span className="text-hover font-semibold">
                                {item.discount}%
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-hover text-xs px-2  border-[1px] rounded-sm py-0.5">
                                Giá độc quyền Online
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className=" flex justify-end flex-col">
                        <div className="flex opacity-0 gap-2 items-center">
                            <span className="text-hover font-semibold">
                                Không được giảm giá
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="text-hover text-xs px-2  border-[1px] rounded-sm py-0.5">
                                Hàng chính Hãng
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}
