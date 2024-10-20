import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Input, Select, Space, Table, TableColumnType } from 'antd';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import { getOrderByUserId, updateOrderStatus } from '@/services/order';
import { useState } from 'react';
import { Order } from '@/types/order';

function OrderProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch orders
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      return await getOrderByUserId(user?._id!);
    },
  });

  console.log(orders);

  if (isError) {
    toast.error('Có lỗi xảy ra khi lấy danh sách đơn hàng.');
  }

  // State quản lý lọc và tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: async ({ id, status }: any) => {
      await updateOrderStatus(id, status);
      toast.success('Trạng thái đơn hàng đã được cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const columns: TableColumnType<Order>[] = [
    {
      title: 'ID Đơn Hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Ảnh Sản Phẩm',
      dataIndex: 'items',
      key: 'productImage',
      render: (items) => {
        return (
          <p>
            {items?.map((item: any, index: number) => {
              return (
                <p>
                  {item.name} {index !== items.length - 1 && ', '}
                </p>
              );
            })}
          </p>
        );
      },
    },

    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
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
          <Select.Option value="chờ xử lý">Chờ Xử Lý</Select.Option>
          <Select.Option value="đã xác nhận">Đã Xác Nhận</Select.Option>
          <Select.Option value="đang giao">Đang Giao</Select.Option>
          <Select.Option value="đã giao">Đã Giao</Select.Option>
        </Select>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const filteredOrders = orders?.filter((order: any) => {
    return (
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus ? order.status === selectedStatus : true)
    );
  });

  return (
    <>
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

        <Table
          columns={columns as []}
          dataSource={filteredOrders}
          rowKey="_id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </>
  );
}

export default OrderProfile;
