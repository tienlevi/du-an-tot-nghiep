import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllOrders, updateOrderStatus } from '@/services/order';
import { Input, Select, Space, Table } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Order } from '@/types/order';
import { EyeOutlined } from '@ant-design/icons';

const { Option } = Select;


const OrderManagement: React.FC = () => {
    const queryClient = useQueryClient();


    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    if (isError) {
        toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng.");
    }


    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

    const { mutate: updateStatusMutate } = useMutation({
        mutationFn: async ({ id, status }) => {
            await updateOrderStatus(id, status);
            toast.success('Trạng thái đơn hàng đã được cập nhật thành công');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });

    const columns = [
        {
            title: 'ID Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'items',
            key: 'productImage',
            render: (items) => (
                <img src={items[0]?.image} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Tên Người Nhận',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'items',
            key: 'totalPrice',
            sorter: (a, b) => {
                const totalA = a.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
                const totalB = b.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
                return totalA - totalB;
            },
            render: (items) => {
                const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
                return `${totalAmount.toLocaleString()} VNĐ`;
            },
        },

        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Chờ Xử Lý', value: 'chờ xử lý' },
                { text: 'Đã Xác Nhận', value: 'đã xác nhận' },
                { text: 'Đang Giao', value: 'đang giao' },
                { text: 'Đã Giao', value: 'đã giao' },
            ],
            onFilter: (value, record) => record.status.includes(value as string),
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(status) => updateStatusMutate({ id: record._id, status })}
                    style={{ width: 120 }}
                >
                    <Option value="chờ xử lý">Chờ Xử Lý</Option>
                    <Option value="đã xác nhận">Đã Xác Nhận</Option>
                    <Option value="đang giao">Đang Giao</Option>
                    <Option value="đã giao">Đã Giao</Option>
                </Select>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link
                        to={`/orders/${record.userId}/${record._id}`}
                        className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                    >
                        <EyeOutlined className="mr-1" />
                    </Link>
                </Space>
            ),
        }
    ];


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
    };

    const filteredOrders = orders.filter((order: Order) => {
        return (
            order.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedStatus ? order.status === selectedStatus : true)
        );
    });

    return (
        <DefaultLayout>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold">Danh sách đơn hàng</h2>
                </div>
                <Input
                    placeholder="Tìm kiếm theo tên người nhận"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mb-4"
                />
                <Select
                    placeholder="Chọn trạng thái đơn hàng"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="mb-4"
                    allowClear
                >
                    <Option value="chờ xử lý">Chờ Xử Lý</Option>
                    <Option value="đã xác nhận">Đã Xác Nhận</Option>
                    <Option value="đang giao">Đang Giao</Option>
                    <Option value="đã giao">Đã Giao</Option>
                </Select>

                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </DefaultLayout>
    );
};

export default OrderManagement;
