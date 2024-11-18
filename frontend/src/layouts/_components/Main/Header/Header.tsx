import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserToolBar from './UserToolbar/UserToolBar';
export default function Header() {
    return (
        <>
            <div className="h-[40px] bg-[#333f48] flex items-center justify-center">
                <p className="text-[#f2c75c] uppercase font-medium text-sm">
                    ĐỔI HÀNG MIỄN PHÍ - Tại tất cả cửa hàng trong 30 ngày
                </p>
            </div>
            <header
                dir="ltr"
                className="sticky top-0 left-0 w-full z-50 bg-white shadow-md"
            >
                <div className="flex items-center justify-between max-w-screen-default py-1.5 mx-4 default:mx-auto">
                    <div className="flex gap-10 items-center">
                        <div>
                            <img
                                src="https://res-console.cloudinary.com/dpplfiyki/thumbnails/v1/image/upload/v1731678493/bG9nb193dDJlZWQ=/drilldown"
                                className="w-[55px]"
                                alt=""
                            />
                        </div>
                        <div>
                            <ul className="flex ">
                                <li>
                                    <Link
                                        to={'/'}
                                        className="text-base text-global uppercase font-bold hover:text-hover duration-300"
                                    >
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/'}
                                        className="text-base text-global uppercase font-bold hover:text-hover duration-300 ml-8"
                                    >
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/'}
                                        className="text-base text-global uppercase font-bold hover:text-hover duration-300 ml-8"
                                    >
                                        Nam
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/'}
                                        className="text-base text-global uppercase font-bold hover:text-hover duration-300 ml-8"
                                    >
                                        Nữ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex  items-center">
                        <div className="flex items-center gap-2 border-[1px] border-[#7777] py-2 px-4 rounded-full">
                            <button className="flex items-center">
                                <SearchOutlined className="text-xl" />
                            </button>
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="text-sm outline-none"
                            />
                        </div>
                        <UserToolBar />
                    </div>
                </div>
            </header>
        </>
    );
}
