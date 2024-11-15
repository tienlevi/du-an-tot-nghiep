import { Descriptions, Input, Space } from 'antd';
import { DescriptionsProps } from 'antd/lib';

interface Props {
    serviceInfo: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
    };
    description: string;
}

const ServiceInfo = ({ serviceInfo, description }: Props) => {
    const items: DescriptionsProps['items'] = [
        {
            key: 'Payment Method',
            label: (
                <span className="font-semibold capitalize">
                    Phương thức thanh toán
                </span>
            ),
            children: (
                <p className="capitalize">
                    {serviceInfo.paymentMethod === 'cash'
                        ? 'Thanh toán khi nhận hàng'
                        : 'Thanh toán Online'}
                </p>
            ),
        },
        {
            key: 'ShippingFee',
            label: (
                <span className="font-semibold capitalize">
                    Cước phí vận chuyển
                </span>
            ),
            children: (
                <p>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(serviceInfo.shippingFee)}
                </p>
            ),
        },
        {
            key: 'Tax',
            label: <span className="font-semibold capitalize">Thuế</span>,
            children: <p>{`${Number(serviceInfo.tax) * 100}% VAT `}</p>,
        },
        {
            key: 'Total Price',
            label: <span className="font-semibold capitalize">Tổng tiền</span>,
            children: (
                <p>
                    {new Intl.NumberFormat('vi-vn', {
                        style: 'currency',
                        currency: 'vnd',
                    }).format(serviceInfo.totalPrice)}
                </p>
            ),
        },
        {
            key: 'Payment Status',
            label: (
                <span className="font-semibold capitalize">
                    Trạng thái thanh toán
                </span>
            ),
            children: (
                <p>
                    {serviceInfo.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </p>
            ),
        },
    ];

    return (
        <Space
            className="mt-5 w-full rounded-lg bg-[#fff] p-4"
            direction="vertical"
        >
            <Descriptions title="Thông tin dịch vụ" items={items} />
            <Input.TextArea
                className="mt-3"
                rows={3}
                readOnly
                value={
                    description
                        ? description
                        : 'Không có ghi chú nào cho đơn hàng này'
                }
            />
        </Space>
    );
};

export default ServiceInfo;
