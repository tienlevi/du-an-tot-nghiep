import { deleteCategory, getCategories } from '@/services/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Space, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from '../_components/Layout/DefaultLayout';

const CategoryList: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await getCategories();
            const res = await response.data; // Đảm bảo đúng định dạng dữ liệu trả về
            return res
        },
    });


    const { mutate } = useMutation({
        mutationKey: ['category'],
        mutationFn: async (id: string) => {
            if (confirm('Bạn có muốn xóa không ?')) {
                try {
                    const response = await deleteCategory(id);
                    toast.success('Xóa thành công');
                    queryClient.invalidateQueries({ queryKey: ['edit_categories'] });
                    return response;
                } catch (error) {
                    toast.error('Có lỗi xảy ra');
                }
            }
        },
    });

    const columns = [
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
                <Table columns={columns} dataSource={categories?.length > 0 ? categories : []} loading={isLoading} />
            </div>
        </DefaultLayout>
    );
};

export default CategoryList;
