import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DefaultLayout from '../_components/Layout/DefaultLayout';
import { addCategory } from '@/services/category';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadCloundinary from '@/common/utils/cloudinary';
import usePreview from '@/common/hooks/usePreview';

interface Inputs {
    name: string;
    image: string
}

const CategoryAdd: React.FC = () => {
    const { file, handleChangeFile } = usePreview();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();
    const queryClient = useQueryClient();
    const element = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: any) => {
            const fileImage = element.current?.files?.[0];
            const image = await UploadCloundinary(fileImage);
            return await addCategory({ ...data, image: image?.secure_url });
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
                    <p>Ảnh</p>
                    {file !== undefined && (
                        <img src={file} alt="" className="h-[450px]" />
                    )}
                    <input
                        ref={element}
                        type="file"
                        onChange={handleChangeFile}
                        className="w-full my-2 p-2"
                    />
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
