import {
  getUserProfile,
  lockUserAccount,
  unLockUserAccount
} from '@/services/userProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { TableColumnsType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from '../_components/Layout/DefaultLayout';

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const queryClient = useQueryClient();

  // Fetch user profiles
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUserProfile();
      return response;
    },
  });

  // State to manage the list of users for dynamic updates
  const [userList, setUserList] = useState(users || []);

  // Update state when users data changes
  useEffect(() => {
    setUserList(users || []);
  }, [users]);

  const { mutate: lockUser } = useMutation({
    mutationKey: ['lockUser'],
    mutationFn: async (id: string) => {
      try {
        const response = await lockUserAccount(id);
        toast.success('Tài khoản đã bị khóa');
        // Update user status locally to 'locked'
        setUserList(
          userList.map((user) =>
            user._id === id ? { ...user, isLocked: true } : user,
          ),
        );
        return response;
      } catch (error) {
        toast.error('Có lỗi xảy ra khi khóa tài khoản');
      }
    },
  });

  const { mutate: unlockUser } = useMutation({
    mutationKey: ['unlockUser'],
    mutationFn: async (id: string) => {
      try {
        const response = await unLockUserAccount(id);
        toast.success('Tài khoản đã được mở khóa');
        // Update user status locally to 'active'
        setUserList(
          userList.map((user) =>
            user._id === id ? { ...user, isLocked: false } : user,
          ),
        );
        return response;
      } catch (error) {
        toast.error('Có lỗi xảy ra khi mở khóa tài khoản');
      }
    },
  });

  const columns: TableColumnsType = [
    {
      title: 'User ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'isLocked',
      key: 'isLocked',
      render: (isLocked) => (
        <span>{isLocked ? 'Đã khóa' : 'Đang hoạt động'}</span>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => (
        <span>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</span>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.isLocked ? (
            <Button
              onClick={() => unlockUser(record._id!)}
              className="py-1 px-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Mở Khóa Tài Khoản
            </Button>
          ) : (
            <Button
              onClick={() => lockUser(record._id!)}
              className="py-1 px-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Khóa Tài Khoản
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <DefaultLayout>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">Danh sách người dùng</h2>
            <Link
              to={'/user/profile/add'}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Thêm người dùng mới
            </Link>
          </div>
          <Input
            placeholder="Tìm kiếm người dùng"
            value={searchQuery}
            onChange={handleSearch}
            className="mb-4"
          />
          <Table
            columns={columns}
            dataSource={userList}
            rowKey="_id"
            loading={isLoading}
          />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default UserList;
