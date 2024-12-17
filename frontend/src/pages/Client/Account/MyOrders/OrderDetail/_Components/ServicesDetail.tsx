import { DescriptionsProps, Space } from 'antd';
import { PaymentMethod } from '@/constants/enum';
import { Currency } from '@/utils';

interface Props {
    services: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
        priceDiscount?: number;
    };
    totalQuantity: number;
}

const translatePaymentMethod = (method: string) => {
    const translations: { [key in string]: string } = {
        [PaymentMethod.card]: 'Thanh toán online',
        [PaymentMethod.cash]: 'Thanh toán khi nhận hàng (COD)',
        // Add more translations as needed
    };
    return translations[method] || method; // Fallback to original if not found
};

export default function ServicesDetail({ services, totalQuantity }: Props) {
    const items: DescriptionsProps['items'] = [
        {
            key: 'Payment Method',
            label: (
                <span className="font-semibold capitalize">
                    Phương Thức Thanh Toán:
                </span>
            ),
            children: (
                <p className="capitalize">
                    {translatePaymentMethod(services.paymentMethod)}
                </p>
            ),
        },
        {
            key: 'Shipping Fee',
            label: (
                <span className="font-semibold capitalize">Phí Giao Hàng:</span>
            ),
            children: <p>{Currency.format(Number(services.shippingFee))}</p>,
        },

        {
            key: 'Total Price',
            label: (
                <span className="font-semibold capitalize">
                    Tổng Tiền Thanh Toán:
                </span>
            ),
            children: <p>{Currency.format(services.totalPrice)}</p>,
        },
        {
            key: 'Payment Status',
            label: (
                <span className="font-semibold capitalize">Thanh Toán:</span>
            ),
            children: (
                <p>
                    {services.isPaid ? (
                        <span className="text-green-500">Đã Thanh Toán</span>
                    ) : (
                        <span className="text-red">Chưa Thanh Toán</span>
                    )}
                </p>
            ),
        },
        {
            key: 'Total Quantity',
            label: (
                <span className="font-semibold capitalize">Tổng sản phẩm:</span>
            ),
            children: <p>{totalQuantity}</p>,
        },
    ];

    // Add Discount item if priceDiscount exists
    if (services.priceDiscount) {
        items.splice(1, 0, {
            key: 'Discount',
            label: <span className="font-semibold capitalize">Giảm giá:</span>,
            children: <p>{Currency.format(Number(services.priceDiscount))}</p>,
        });
    }

    return (
        <Space
            className="mt-5 w-full rounded-lg bg-[#fff] p-4 "
            direction="vertical"
        >
            <h3 className="text-lg font-medium text-black">
                Thông tin đơn hàng
            </h3>
            <div className="grid grid-cols-3 gap-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        {item.label}
                        {item.children}
                    </div>
                ))}
            </div>
        </Space>
    );
}
