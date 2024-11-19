import { Table } from 'antd';
import { TableProps } from 'antd/lib';

interface DataType {
    key: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
    variant: {
        variantAttributes: { name: string; key: string; value: string }[];
    };
}

interface Props {
    orderItems: DataType[];
}

const TableOrderItems = ({ orderItems }: Props) => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <p>{key + 1}</p>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img
                    src={image}
                    alt="product"
                    className="h-20 w-20 object-cover"
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'variant',
            key: 'variant',
            render: (variant) => {
                return (
                    <>
                        <div className="flex gap-2">
                            {variant.variantAttributes.map(
                                (item: any, i: number) => (
                                    <span key={i} className="text-xs">
                                        {item.value}
                                    </span>
                                ),
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <p>
                    {new Intl.NumberFormat('vi-vn', {
                        style: 'currency',
                        currency: 'vnd',
                    }).format(price)}
                </p>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => (
                <p>
                    {new Intl.NumberFormat('vi-vn', {
                        style: 'currency',
                        currency: 'vnd',
                    }).format(record.price * record.quantity)}
                </p>
            ),
        },
    ];

    const data: DataType[] = orderItems.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
        variant: item.variant,
    }));

    return (
        <Table
            className="mt-5 w-full"
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
};

export default TableOrderItems;
