import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cancelOrder, getUserOrders } from '@/services/order';
import { Button, Input, Select, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Order } from '@/types/order';

const { Option } = Select;

type OnChange = NonNullable<TableProps<Order>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const OrderManagement: React.FC = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem('userId');
    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ['orders', userId],
        queryFn: async () => {
            if (userId) {
                console.log("Calling API with userId:", userId);
                const response = await getUserOrders(userId);
                console.log("Response from API:", response);
                return response.data; // Điều chỉnh nếu cần
            } else {
                console.error("User ID is undefined");
                throw new Error("User ID is undefined");
            }
        },
        enabled: !!userId,
    });

    // Kiểm tra lỗi
    if (isError) {
        console.error("Error fetching orders:");
    }

    // Kiểm tra dữ liệu đã nhận
    console.log(orders);


    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const { mutate } = useMutation({
        mutationKey: ['orders'],
        mutationFn: async (id: string) => {
            if (confirm('Bạn có muốn hủy đơn hàng này không?')) {
                try {
                    await cancelOrder(id);
                    toast.success('Đơn hàng đã được hủy thành công');
                    queryClient.invalidateQueries({ queryKey: ['orders', userId] });
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
            dataIndex: 'orderId',
            key: 'orderId',
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
                { text: 'Chờ Xử Lý', value: 'chờ xử lý' },
                { text: 'Đã Xác Nhận', value: 'đã xác nhận' },
                { text: 'Đang Giao', value: 'đang giao' },
                { text: 'Đã Giao', value: 'đã giao' },
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
                    onChange={handleChange}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </DefaultLayout>
    );
};

export default OrderManagement;
