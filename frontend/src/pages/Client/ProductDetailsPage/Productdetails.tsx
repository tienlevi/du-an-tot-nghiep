import DefaultCard from '@/components/ProductCard/DefaultCard';
import ShopBenefits from '@/components/ShopBenefits';
import {
    HeartFilled,
    HeartOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Collapse,
    ConfigProvider,
    Divider,
    Flex,
    Image,
    Tooltip,
} from 'antd';
import { useState } from 'react';

const ProductDetailsPage = () => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const [selectedImage, setSelectedImage] = useState(0);

    const arr = [1, 2, 3, 4];

    return (
        <div className="mx-27">
            {/* BREADCRUMB */}
            <div className="breadcrumb">
                <Breadcrumb
                    className="text-lg py-4"
                    separator=">"
                    items={[
                        {
                            title: 'Trang chủ',
                            path: '',
                        },
                        {
                            title: <a href="">Bộ mặc nhà dài tay</a>,
                        },
                        {
                            title: <a href="">Bộ mặc nhà dài tay mickey</a>,
                        },
                    ]}
                />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex my-4">
                {/* GALLERY */}
                <div className="w-3/5 flex">
                    <div className="w-4/5">
                        <Image
                            className="w-full"
                            height={600}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>

                    <div className="w-1/5 flex flex-col gap-2 items-center">
                        <div
                            className={`p-1 ${selectedImage === 1 ? 'border-2 border-[#da291c]' : ''}`}
                            onClick={() => setSelectedImage(1)}
                        >
                            <Image
                                preview={false}
                                width={90}
                                height={105}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>

                        <div
                            className={`p-1 ${selectedImage === 2 ? 'border-2 border-[#da291c]' : ''}`}
                            onClick={() => setSelectedImage(2)}
                        >
                            <Image
                                preview={false}
                                width={90}
                                height={105}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>

                        <div
                            className={`p-1 ${selectedImage === 3 ? 'border-2 border-[#da291c]' : ''}`}
                            onClick={() => setSelectedImage(3)}
                        >
                            <Image
                                preview={false}
                                width={90}
                                height={105}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>
                    </div>
                </div>

                {/* DETAILS */}
                <div className="w-2/5">
                    <Flex vertical>
                        {/* NAME AND FAVOURITE BUTTON */}
                        <div className="flex justify-between items-center w-full my-1">
                            {/* PRODUCT NAME */}
                            <div className="text-2xl w-4/5">
                                Bộ mặc nhà bé trai in hình Mickey
                            </div>

                            {/* FAVORITE BUTTON */}
                            <div className="w-1/5 text-center">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultHoverColor: '#da291c',
                                                defaultHoverBorderColor:
                                                    '#da291c',
                                            },
                                        },
                                    }}
                                >
                                    {/* ADD BUTTON */}
                                    <Tooltip
                                        title="Thêm vào yêu thích"
                                        color={'#da291c'}
                                    >
                                        <Button
                                            className="text-red-500"
                                            type="default"
                                            shape="circle"
                                            icon={<HeartOutlined />}
                                        />
                                    </Tooltip>

                                    {/* REMOVE BUTTON */}
                                    {/* <Tooltip
                                        title="Bỏ yêu thích"
                                        color={'#da291c'}
                                    >
                                        <Button
                                            className="text-red-500"
                                            type="default"
                                            shape="circle"
                                            icon={<HeartFilled />}
                                        />
                                    </Tooltip> */}
                                </ConfigProvider>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="font-bold my-2 text-xl">349.000 ₫</div>

                        {/* COLOR */}
                        <div className="my-2">
                            <div>
                                <span className="text-[#333f48]">Màu sắc</span>:{' '}
                                <span className="text-[#333f48] font-semibold">
                                    {selectedColor}
                                </span>
                            </div>

                            <Flex className="my-2">
                                <div
                                    className={`p-1 mr-2 rounded-lg ${selectedColor === 'SB001' ? 'border-2 border-[#da291c]' : ''}`}
                                >
                                    <Button
                                        className={`rounded-full`}
                                        onClick={() =>
                                            setSelectedColor('SB001')
                                        }
                                    ></Button>
                                </div>

                                <div
                                    className={`p-1 rounded-lg ${selectedColor === 'SB002' ? 'border-2 border-[#da291c]' : ''}`}
                                >
                                    <Button
                                        className={`rounded-full`}
                                        onClick={() =>
                                            setSelectedColor('SB002')
                                        }
                                    ></Button>
                                </div>
                            </Flex>
                        </div>

                        {/* SIZE */}
                        <div className="my-2">
                            <div>
                                <span className="text-[#333f48]">Kích cỡ</span>:{' '}
                                <span className="text-[#333f48] font-semibold">
                                    {selectedSize}
                                </span>
                            </div>

                            <Flex className="my-2">
                                <Button
                                    className={`mr-1 py-5 rounded-lg ${selectedSize === '98' ? 'border-2 border-[#da291c] font-semibold' : ''}`}
                                    onClick={() => setSelectedSize('98')}
                                >
                                    98
                                </Button>

                                <Button
                                    className={`mr-1 py-5 rounded-lg ${selectedSize === '100' ? 'border-2 border-[#da291c] font-semibold' : ''}`}
                                    onClick={() => setSelectedSize('100')}
                                >
                                    100
                                </Button>
                            </Flex>
                        </div>

                        {/* ADD TO CART */}
                        <Flex gap={15}>
                            <div className="w-3/5">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBorderColor:
                                                    '#FFFFFF',
                                                defaultHoverBg: '#da291c',
                                                defaultHoverColor: '#FFFFFF',
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        block
                                        icon={
                                            <ShoppingCartOutlined className="text-2xl" />
                                        }
                                        className="bg-white border-[#da291c] text-lg text-[#da291c] font-semibold py-7"
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </ConfigProvider>
                            </div>

                            <div className="w-2/5">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultHoverBorderColor:
                                                    '#FFFFFF',
                                                defaultHoverBg: '#da291c',
                                                defaultHoverColor: '#FFFFFF',
                                            },
                                        },
                                    }}
                                >
                                    <Button block className="py-7 text-lg">
                                        Tìm tại cửa hàng
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </Flex>

                        {/* MORE INFORMATIONS */}
                        <div>
                            <Divider className="my-4" />

                            <Collapse
                                expandIconPosition="end"
                                bordered={false}
                                ghost
                                items={[
                                    {
                                        key: 'Mô tả',
                                        label: (
                                            <span className="text-base font-bold">
                                                Mô tả
                                            </span>
                                        ),
                                        children: (
                                            <p>
                                                Bộ mặc nhà bé trai in hình
                                                Mickey
                                            </p>
                                        ),
                                    },
                                ]}
                            />

                            <Divider className="my-4" />

                            <Collapse
                                expandIconPosition="end"
                                bordered={false}
                                ghost
                                items={[
                                    {
                                        key: 'Chất liệu',
                                        label: (
                                            <span className="text-base font-bold">
                                                Chất liệu
                                            </span>
                                        ),
                                        children: <p>95% cotton 5% spandex.</p>,
                                    },
                                ]}
                            />

                            <Divider className="my-4" />

                            <Collapse
                                expandIconPosition="end"
                                bordered={false}
                                ghost
                                items={[
                                    {
                                        key: 'hướng dẫn sử dụng',
                                        label: (
                                            <span className="text-base font-bold">
                                                Hướng dẫn sử dụng
                                            </span>
                                        ),
                                        children: (
                                            <p>
                                                Giặt máy ở chế độ nhẹ, nhiệt độ
                                                thường. Không sử dụng hóa chất
                                                tẩy có chứa Clo. Phơi trong bóng
                                                mát. Sấy khô ở nhiệt độ thấp. Là
                                                ở nhiệt độ thấp 110 độ C. Giặt
                                                với sản phẩm cùng màu. Không là
                                                lên chi tiết trang trí.
                                            </p>
                                        ),
                                    },
                                ]}
                            />

                            <Divider className="my-4" />
                        </div>
                    </Flex>
                </div>
            </div>

            <div className="my-10">
                <ShopBenefits />
            </div>

            {/* RELATED PRODUCTS */}
            <div className="text-global text-xl font-bold">Gợi ý mua cùng</div>

            <div className="flex flex-cols-4 flex-row-2">
                {arr.map(() => {
                    return (
                        <>
                            <DefaultCard />
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
