import { useState } from 'react';
import { deleteCategory, getCategories } from '@/services/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from './_components/Layout/DefaultLayout';

type OnChange = NonNullable<TableProps<any>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const CategoryList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data || response;
    },
  });

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { mutate } = useMutation({
    mutationKey: ['category'],
    mutationFn: async (id: string) => {
      if (confirm('Bạn có muốn xóa không ?')) {
        try {
          const response = await deleteCategory(id);
          toast.success('Xóa thành công');
          queryClient.invalidateQueries({ queryKey: ['categories'] });
          return response;
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        }
      }
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleChange = (pagination: any, filters: Filters, sorter: Sorts) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category: any) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const columns: TableColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img
          src={record?.image}
          alt={record.name}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/category/edit/${record._id}`}
            className="py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <Button
            onClick={() => mutate(record._id!)}
            className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Danh sách danh mục</h2>
          <Link
            to="/category/add"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Thêm Danh Mục
          </Link>
        </div>
        <Input
          placeholder="Tìm kiếm danh mục"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />
        <Table
          columns={columns}
          dataSource={filteredCategories}
          loading={isLoading}
          onChange={handleChange}
          rowKey="_id"
        />
      </div>
    </DefaultLayout>
  );
};

export default CategoryList;
