import { HeartOutlined } from '@ant-design/icons';

export default function DefaultCard() {
  const discount = 2;
  return (
    <div className="h-[432px] group cursor-pointer">
      <div className="w-[310px] h-[310px] relative">
        <img
          className="object-contain "
          src="https://supersports.com.vn/cdn/shop/products/FS9799-1.jpg?v=1668074981"
          alt=""
        />
        <div className="opacity-0 px-2 py-1 group-hover:opacity-100 flex items-center w-full justify-between duration-300 absolute bottom-0">
          <button className="text-global hover:bg-hover duration-300 hover:text-white bg-white shadow-md flex justify-center w-3/4 bg- py-1.5 rounded-md text-sm font-medium">Thêm vào giỏ hàng</button>
          <button className='w-1/6 h-[32px] bg-global hover:bg-opacity-80 duration-300 rounded-lg text-white'>
            <HeartOutlined />
          </button>
        </div>
      </div>
      <div className="text-global text-sm">
        <h3 className=" font-semibold group-hover:text-hover mt-4 w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
          Áo Thun Chạy Bộ Nam Adidas Own The Run
        </h3>
        <p className="font-semibold mt-1">525.000đ</p>
        {discount && (
          <div className="mt-1">
            <div className="flex gap-2 items-center">
              <span className="line-through">750.000đ</span>
              <span className="text-hover font-semibold">- 30%</span>
            </div>
            <div className="mt-2">
              <span className="text-hover text-xs px-2  border-[1px] rounded-sm py-0.5">
                Giá độc quyền Online
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}