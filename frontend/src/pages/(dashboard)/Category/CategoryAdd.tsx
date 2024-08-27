import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { addCategory } from '@/services/category';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Inputs {
    name: string;
    image: string
}

const CategoryAdd: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: Inputs) => {
            return await addCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast.success('Danh mục đã được thêm thành công');
            navigate('/category/list')
            reset();
        },
        onError: (error: any) => {
            toast.error(error.message || 'Có lỗi xảy ra khi thêm danh mục');
        },
    });

    const onSubmit = (data: Inputs) => {
        mutate(data);
    };

    return (
        <DefaultLayout>
            <div className="max-w-md mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Thêm danh mục mới</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        {...register('name', { required: 'Vui lòng nhập tên danh mục!' })}
                        placeholder="Tên danh mục"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )}
                    <input
                        type="text"
                        {...register('image', { required: true })}
                        placeholder='ảnh danh mục'
                        className="w-full my-2 p-2 border border-gray-300 rounded"
                    />
                    {errors.image && (
                        <span className="text-red-500">Vui lòng chọn ảnh</span>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Thêm Danh Mục
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CategoryAdd;
