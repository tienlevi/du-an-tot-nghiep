import { Table, Tag } from 'antd';
import { TableProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface OrderItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    tags: string[];
    quantity: number;
    price: number;
    image: string;
    isReviewed: boolean;
    isReviewDisabled: boolean;
}

interface Props {
    orderItems: OrderItem[];
}

const TableOrderItems: React.FC<Props> = ({ orderItems }) => {
    const navigate = useNavigate();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-vn', {
            style: 'currency',
            currency: 'vnd',
        }).format(amount);
    };

    const columns: TableProps<OrderItem>['columns'] = [
        {
            title: 'Sản phẩm',
            key: 'product',
            width: '50%',
            render: (_, record) => (
                <div className="flex items-center gap-19 py-3 cursor-pointer" onClick={() => navigate(`/products/${record.productId}`)}>
                    <div className="relative group">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={record.image}
                                alt={record.name}
                                className="w-20 h-20 object-cover transform transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute bottom-2 left-2">
                            <Tag 
                                color="blue-inverse" 
                                className="rounded-full shadow-lg backdrop-blur-sm bg-opacity-90"
                            >
                                {record.category}
                            </Tag>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-3">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1 leading-tight">
                                {record.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                ID: {record.productId.slice(-8)}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Tag 
                                color="purple" 
                                className="rounded-full px-4 py-1 flex items-center gap-1 text-sm"
                            >
                                Size: {record.size}
                            </Tag>
                            <Tag 
                                color="orange" 
                                className="rounded-full px-4 py-1 flex items-center gap-1 text-sm"
                            >
                                {record.color}
                            </Tag>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            key: 'unitPrice',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-4 py-2 shadow-sm">
                        <span className="text-gray-700 font-medium">
                            {formatCurrency(record.price)}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-4 py-2 shadow-sm">
                        <span className="text-gray-700 font-medium flex items-center gap-2">
                            <span className="">{record.quantity}</span>
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            width: '20%',
            align: 'center',
            render: (_, record) => (
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-4 py-2 shadow-sm">
                        <span className="text-gray-700 font-medium">
                            {formatCurrency(record.price * record.quantity)}
                        </span>
                    </div>
                </div>
            ),
        }
    ];

    return (
        <div className="bg-white overflow-hidden">
            <Table
                columns={columns}
                dataSource={orderItems}
                pagination={false}
                rowKey="productId"
                className="modern-table"
            />
        </div>
    );
};

export default TableOrderItems;