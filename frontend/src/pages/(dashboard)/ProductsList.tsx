import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/common/types/product';
import { Category } from '@/common/types/category';
import { toast } from 'react-toastify';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { deleteProduct, getProducts } from '@/services/product';
import { Button, Input, Select, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '@/services/category';

const { Option } = Select;

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const ProductsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getProducts();
      return response;
    },
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response;
    },
  });
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { mutate } = useMutation({
    mutationKey: ['products'],
    mutationFn: async (id: string) => {
      if (confirm('Bạn có muốn xóa không ?')) {
        try {
          const response = await deleteProduct(id);
          toast.success('Xóa thành công');
          queryClient.invalidateQueries({ queryKey: ['products'] });
          return response;
        } catch (error) {
          toast.error('Có lỗi xảy ra');
        }
      }
    },
  });

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns: TableColumnsType = [
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => {
        return categories?.data?.map(
          (item: Category) =>
            item._id === text && <div key={item._id}>{item.name}</div>,
        );
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Số lượng trong kho',
      dataIndex: 'countInStock',
      key: 'countInStock',
    },
    {
      title: 'Sản phẩm nổi bật',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured) => (featured ? 'Có' : 'Không'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/products/edit/${record._id}`}
            className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredProducts = products?.filter((product: Product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true)
    );
  });

  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Danh sách sản phẩm</h2>
          <Link
            to={'/products/add'}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Thêm Sản Phẩm
          </Link>
        </div>
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />
        <Select
          placeholder="Chọn danh mục"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mb-4"
          allowClear
        >
          {categories?.data?.map((category: Category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          onChange={handleChange}
          rowKey="_id"
        />
      </div>
    </DefaultLayout>
  );
};

export default ProductsList;
