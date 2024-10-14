import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cancelOrder, getAllOrders, updateOrderStatus, } from '@/services/order'; // Sửa API để lấy và cập nhật trạng thái đơn hàng
import { Button, Input, Select, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Order } from '@/types/order';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

type OnChange = NonNullable<TableProps<Order>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

// Component OrderManagement
const OrderManagement: React.FC = () => {
    const queryClient = useQueryClient();

    // Fetch orders
    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await getAllOrders(); // Sử dụng API lấy tất cả đơn hàng
            return response; // Trả về data trực tiếp từ response
        },
    });

    if (isError) {
        console.error("Error fetching orders");
        toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng.");
    }

    // State quản lý lọc và tìm kiếm
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const { mutate: cancelMutate } = useMutation({
        mutationKey: ['orders'],
        mutationFn: async (id: string) => {
            if (confirm('Bạn có muốn hủy đơn hàng này không?')) {
                try {
                    const response = await cancelOrder(id); // Gọi API để hủy đơn hàng
                    toast.success('Đơn hàng đã được hủy thành công');
                    queryClient.invalidateQueries({ queryKey: ['orders'] }); // Làm mới danh sách đơn hàng
                } catch (error) {
                    console.error("Error canceling order", error); // Log lỗi
                    toast.error('Có lỗi xảy ra khi hủy đơn hàng');
                }
            }
        },
    });

    const { mutate: updateStatusMutate } = useMutation({
        mutationKey: ['orders', 'updateStatus'],
        mutationFn: async ({ id, status }: { id: string, status: string }) => {
            try {
                const response = await updateOrderStatus(id, status); // Gọi API để cập nhật trạng thái
                toast.success('Trạng thái đơn hàng đã được cập nhật thành công');
                queryClient.invalidateQueries({ queryKey: ['orders'] }); // Làm mới danh sách đơn hàng
            } catch (error) {
                console.error("Error updating order status", error); // Log lỗi
                toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
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
            render: (text, record) => (
                <Select
                    defaultValue={text}
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
                        to={`/orders/${record._id}`}
                        className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                    >
                        <EyeOutlined className="mr-1" /> {/* Biểu tượng con mắt */}
                    </Link>
                    <Button
                        onClick={() => cancelMutate(record._id!)}
                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                        disabled={record.status === 'cancelled'}
                    >
                        <DeleteOutlined className="mr-1" /> {/* Biểu tượng thùng rác */}
                    </Button>
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
