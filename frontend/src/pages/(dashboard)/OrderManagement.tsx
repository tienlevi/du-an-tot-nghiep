import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {getAllOrders, updateOrderStatus } from '@/services/order';
import { Input, Select, Space, Table } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Order } from '@/types/order';
import { EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

// Component OrderManagement
const OrderManagement: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await getUserOrders();
            return response;
        },
    });

    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const { mutate } = useMutation({
        mutationKey: ['orders'],
        mutationFn: async (id: string) => {
            if (confirm('Bạn có muốn hủy đơn hàng này không?')) {
                try {
                    const response = await cancelOrder(id);
                    toast.success('Đơn hàng đã được hủy thành công');
                    queryClient.invalidateQueries({ queryKey: ['orders'] });
                    return response;
                } catch (error) {
                    toast.error('Có lỗi xảy ra khi hủy đơn hàng');
                }
            }
        },
    });

    const handleChange: OnChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    const columns: TableColumnsType<Order> = [
        {
            title: 'ID Đơn Hàng',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'productImage',
            key: 'productImage',
            render: (productImage) => (
                <img src={productImage} alt="Product" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Tên Người Nhận',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            render: (shippingAddress) => <span>{shippingAddress?.name}</span>,
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            sortOrder: sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            sortOrder: sortedInfo.columnKey === 'totalPrice' ? sortedInfo.order : null,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Chờ Xử Lý', value: 'pending' },
                { text: 'Đã Xử Lý', value: 'processed' },
                { text: 'Đã Giao Hàng', value: 'delivered' },
                { text: 'Đã Hủy', value: 'cancelled' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value as string),
            ellipsis: true,
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link
                        to={`/orders/${record._id}`}
                        className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Xem Chi Tiết
                    </Link>
                    <Button
                        onClick={() => mutate(record._id!)}
                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={record.status === 'cancelled'}
                    >
                        Hủy Đơn
                    </Button>
                </Space>
            ),
        },
    ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

    const filteredOrders = orders?.filter((order: Order) => {
        return (
            order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
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
                    <Option value="pending">Chờ Xử Lý</Option>
                    <Option value="processed">Đã Xử Lý</Option>
                    <Option value="delivered">Đã Giao Hàng</Option>
                    <Option value="cancelled">Đã Hủy</Option>
                </Select>
                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    onChange={handleChange}
                    rowKey="_id"
                />
            </div>
        </DefaultLayout>
    );
};

export default OrderManagement;
