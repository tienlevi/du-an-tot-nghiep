import { Descriptions, Space } from 'antd';
import { DescriptionsProps } from 'antd/lib';

interface User {
    email: string;
    name: string;
    phone: string;
}

interface Props {
    customerInfo: User;
    receiverInfo: User;
    shippingAddress: {
        country: string;
        province: string;
        district: string;
        ward: string;
        address: string;
    };
}

const CustomerInfo = ({
    customerInfo,
    receiverInfo,
    shippingAddress,
}: Props) => {
    const customerItems: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: (
                <span className="font-semibold capitalize">Tên khách hàng</span>
            ),
            children: <p className="capitalize">{customerInfo?.name}</p>,
        },
        {
            key: 'email',
            label: <span className="font-semibold capitalize">Email</span>,
            children: <p className="capitalize">{customerInfo?.email}</p>,
        },
        {
            key: 'phone',
            label: (
                <span className="font-semibold capitalize">Số điện thoại</span>
            ),
            children: <p className="capitalize">{customerInfo?.phone}</p>,
        },
    ];

    const receiverItems: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: (
                <span className="font-semibold capitalize">Tên khách hàng</span>
            ),
            children: <p className="capitalize">{receiverInfo?.name}</p>,
        },
        {
            key: 'email',
            label: <span className="font-semibold capitalize">Email</span>,
            children: <p className="capitalize">{receiverInfo?.email}</p>,
        },
        {
            key: 'phone',
            label: (
                <span className="font-semibold capitalize">Số điện thoại</span>
            ),
            children: <p className="capitalize">{receiverInfo?.phone}</p>,
        },
    ];

    const shippingAddressItems: DescriptionsProps['items'] = [
        {
            key: 'country',
            label: <span className="font-semibold capitalize">Quốc gia</span>,
            children: <p className="capitalize">{shippingAddress?.country}</p>,
        },
        {
            key: 'province',
            label: (
                <span className="font-semibold capitalize">Tỉnh/Thành phố</span>
            ),
            children: <p className="capitalize">{shippingAddress?.province}</p>,
        },
        {
            key: 'district',
            label: <span className="font-semibold capitalize">Quận/Huyện</span>,
            children: <p className="capitalize">{shippingAddress?.district}</p>,
        },
        {
            key: 'ward',
            label: <span className="font-semibold capitalize">Phường/Xã</span>,
            children: <p className="capitalize">{shippingAddress?.ward}</p>,
        },
        {
            key: 'address',
            label: (
                <span className="font-semibold capitalize">
                    Địa chỉ liên hệ
                </span>
            ),
            children: <p className="capitalize">{shippingAddress?.address}</p>,
        },
    ];

    return (
        <Space
            className="mt-5 w-full  rounded-lg bg-[#fff] p-4 "
            direction="vertical"
        >
            <Descriptions title="Thông tin khách hàng" items={customerItems} />
            {receiverInfo && receiverInfo.name ? (
                <Descriptions
                    className="my-5"
                    title="Thông tin người nhận"
                    items={receiverItems}
                />
            ) : (
                ''
            )}
            <Descriptions
                title="Địa chỉ giao hàng"
                items={shippingAddressItems}
            />
        </Space>
    );
};

export default CustomerInfo;
