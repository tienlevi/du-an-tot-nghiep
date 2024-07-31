import { editCategory, getCategoryById } from '@/services/category';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultLayout from '../_components/Layout/DefaultLayout';

interface Inputs {
    name: string;
}

const CategoryEdit = () => {
    const { id }: any = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();
    const navigate = useNavigate();

    const { data: category }: any = useQuery({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await getCategoryById(id);
            return response;
        },
    });

    const { mutate } = useMutation({
        mutationKey: ['categories'],
        mutationFn: async (data: any) => {
            return await editCategory(id, data);
        },
        onSuccess: (data: any) => {
            if (data) {
                toast.success('Sửa danh mục thành công');
                navigate('/category/list');
            } else {
                toast.error('Sửa danh mục thất bại');
            }
        },
        onError: (error: any) => {
            toast.error(error.message || 'Có lỗi xảy ra khi sửa danh mục');
        },
    });

    const onSubmit = (data: any) => {
        mutate(data);
    };

    useEffect(() => {
        reset(category);
    }, [category]);
    console.log(category, 'i');

    return (
        <DefaultLayout>
            <div className="max-w-md mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4">Sửa Danh Mục</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        defaultValue={category?.category?.name}
                        {...register('name', { required: 'Vui lòng nhập tên danh mục!' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Sửa Danh Mục
                    </button>
                    <br />
                    {errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )}
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CategoryEdit;
