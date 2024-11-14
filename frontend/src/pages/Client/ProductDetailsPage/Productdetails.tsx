import ShopBenefits from '@/components/ShopBenefits';
import { useGetDetailProduct } from '@/hooks/Products/Queries/useGetDetailProduct';
import { Currency } from '@/utils/FormatCurreny';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
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
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface TransformedVariant {
    size: {
        name: string;
        _id: string;
    };
    colors: any[];
}
const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data } = useGetDetailProduct(id ? id : '');
    const [selectedColor, setSelectedColor] = useState<{
        _id: string;
        color: any;
        stock: number;
    } | null>();
    const [selectedSize, setSelectedSize] =
        useState<TransformedVariant | null>();
    const [selectedImage, setSelectedImage] = useState<{
        index: number;
        image: string;
    }>({ index: 0, image: '' });
    const [variantsList, setVariantsList] = useState<TransformedVariant[]>();
    // Mount State khi trang được khởi tạo để set mặc định variant đầu tiên
    useEffect(() => {
        if (data) {
            setSelectedImage({
                index: 0,
                image: data.variants[0].image,
            });
            const transformedVariants: TransformedVariant[] =
                data.variants.reduce((acc, variant) => {
                    let sizeIndex = acc.findIndex(
                        (item) => item.size._id === variant.size._id,
                    );
                    if (sizeIndex === -1) {
                        acc.push({
                            size: variant.size,
                            colors: [
                                {
                                    color: variant.color,
                                    stock: variant.stock,
                                    image: variant.image,
                                    _id: variant._id,
                                },
                            ],
                        });
                    } else {
                        acc[sizeIndex].colors.push({
                            color: variant.color,
                            stock: variant.stock,
                            image: variant.image,
                            _id: variant._id,
                        });
                    }

                    return acc;
                }, [] as TransformedVariant[]);
            setVariantsList(transformedVariants);
            const defaultVariant = transformedVariants.find((variant) => {
                return variant.colors.some((color) => color.stock > 0);
            });
            if (defaultVariant) {
                const defaultColor = defaultVariant.colors.find(
                    (color) => color.stock > 0,
                );
                setSelectedSize(defaultVariant);
                setSelectedImage({
                    index: 0,
                    image: defaultColor.image
                });
                setSelectedColor(defaultColor);
            }
        }
    }, [data]);
    const handleChooseSize = (item: any) => {
        let selectedColor = item.colors[0];
        if (selectedColor.stock === 0) {
            const availableColor = item.colors.find(
                (color: any) => color.stock > 0,
            );
            if (availableColor) {
                selectedColor = availableColor;
            } else {
                selectedColor = item.colors[1] || item.colors[0];
                alert('Tất cả các màu đều hết hàng.');
            }
        }
        setSelectedColor(selectedColor);
        setSelectedImage({
            index: 0,
            image: selectedColor.image,
        });
        setSelectedSize(item);
    };

    const handleChooseColor = (item: any) => {
        setSelectedColor({
            _id: item._id,
            color: item.color,
            stock: item.stock,
        });
        setSelectedImage({
            index: 0,
            image: item.image,
        });
    };
    const hasAvailableStock = variantsList?.some((variant) => 
        variant.colors.some((color) => color.stock > 0)
      );
      
    return (
        data && (
            <div className="max-w-screen-default default:mx-auto mx-4">
                {/* BREADCRUMB */}
                <div className="breadcrumb">
                    <Breadcrumb
                        className="text-base py-4"
                        separator=">"
                        items={[
                            {
                                title: <Link to={'/'}>Trang chủ</Link>,
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
                <div className="flex my-4 justify-around">
                    {/* GALLERY */}
                    <div className=" flex gap-3">
                        <div className="w-4/5 rounded-md overflow-hidden">
                            <Image
                                className="w-full"
                                height={600}
                                src={selectedImage.image}
                            />
                        </div>

                        <div className=" flex flex-col gap-2 items-center">
                            {data.variants.map((item, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setSelectedImage({
                                                index,
                                                image: item.image,
                                            })
                                        }
                                        className={`${index === selectedImage.index ? 'border-[1px] border-global' : 'border-none'}  w-24 cursor-pointer rounded-md overflow-hidden`}
                                    >
                                        <img
                                            className="object-cover"
                                            src={item.image}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="w-2/5">
                        <Flex vertical>
                            {/* NAME AND FAVOURITE BUTTON */}
                            <div className="flex justify-between items-center w-full my-1">
                                {/* PRODUCT NAME */}
                                <div className="text-2xl uppercase font-semibold text-global w-4/5">
                                    {data.name}
                                </div>

                                {/* FAVORITE BUTTON */}
                                <div className="w-1/5 text-center">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    defaultHoverColor:
                                                        '#da291c',
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
                            <div className="font-bold my-2 text-xl text-global">
                                {Currency(data.price)}
                            </div>
                            {hasAvailableStock ? (
                                <>
                                    <div className="my-2">
                                        <div>
                                            <span className="text-global">
                                                Kích cỡ
                                            </span>
                                            :{' '}
                                            <span className="text-global font-semibold">
                                                {selectedSize?.size.name}
                                            </span>
                                        </div>

                                        <Flex className="my-2">
                                            {variantsList?.map(
                                                (item, index) => {
                                                    const hasStock =
                                                        item.colors.some(
                                                            (color: any) =>
                                                                color.stock > 0,
                                                        );

                                                    return (
                                                        <button
                                                            key={index}
                                                            className={`relative mr-1 ${!hasStock ? 'text-[#777777]' :''} w-8 h-8 text-xs rounded-lg ${selectedSize?.size.name === item.size.name ? ' bg-hover text-white font-semibold' : 'border-[1px]'}`}
                                                            onClick={() =>
                                                                handleChooseSize(
                                                                    item,
                                                                )
                                                            }
                                                            disabled={!hasStock}
                                                        >
                                                            {item.size.name}
                                                            {!hasStock && (
                                                                <div className="absolute w-9 h-[2px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#777777] rotate-45"></div>
                                                            )}
                                                        </button>
                                                    );
                                                },
                                            )}
                                        </Flex>
                                    </div>

                                    <div className="my-2">
                                        <div>
                                            <span className="text-global">
                                                Màu sắc
                                            </span>
                                            :{' '}
                                            <span className="text-global font-semibold">
                                                {selectedColor?.color.name}
                                            </span>
                                        </div>

                                        <Flex className="my-2">
                                            {selectedSize?.colors.map(
                                                (item, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() =>
                                                                item.stock === 0
                                                                    ? null
                                                                    : handleChooseColor(
                                                                          item,
                                                                      )
                                                            }
                                                            className={`relative  mr-2 ${item.stock === 0 ? 'bg-opacity-60 border-opacity-60' : 'cursor-pointer'} w-8  h-8 rounded-lg ${selectedColor?._id === item._id ? `border-2 border-hover ` : 'border-global border-2'}`}
                                                            style={{
                                                                backgroundColor: `${item.color.hex}`
                                                            }}
                                                        >
                                                            {item.stock ===
                                                                0 && (
                                                                <div className="absolute w-9 h-[2px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#777777] rotate-45"></div>
                                                            )}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </Flex>
                                        <span className="text-global text-xs">
                                            Trong kho: {selectedColor?.stock}{' '}
                                            Sản phẩm
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center min-h-[20vh] items-center">
                                    <span className="text-hover uppercase font-bold text-base">
                                        Sản phẩm hết hàng
                                    </span>
                                </div>
                            )}

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
                                                    defaultHoverColor:
                                                        '#FFFFFF',
                                                },
                                            },
                                        }}
                                    >
                                        <Button
                                            disabled={!variantsList || !selectedSize}
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
                                                    defaultHoverColor:
                                                        '#FFFFFF',
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
                                            children: (
                                                <p>95% cotton 5% spandex.</p>
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
                                            key: 'hướng dẫn sử dụng',
                                            label: (
                                                <span className="text-base font-bold">
                                                    Hướng dẫn sử dụng
                                                </span>
                                            ),
                                            children: (
                                                <p>
                                                    Giặt máy ở chế độ nhẹ, nhiệt
                                                    độ thường. Không sử dụng hóa
                                                    chất tẩy có chứa Clo. Phơi
                                                    trong bóng mát. Sấy khô ở
                                                    nhiệt độ thấp. Là ở nhiệt độ
                                                    thấp 110 độ C. Giặt với sản
                                                    phẩm cùng màu. Không là lên
                                                    chi tiết trang trí.
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
                <div className="text-global text-xl font-bold">
                    Gợi ý mua cùng
                </div>

                {/* <div className="flex flex-cols-4 flex-row-2">
                {arr.map(() => {
                    return (
                        <>
                            <DefaultCard />
                        </>
                    );
                })}
            </div> */}
            </div>
        )
    );
};

export default ProductDetailsPage;
