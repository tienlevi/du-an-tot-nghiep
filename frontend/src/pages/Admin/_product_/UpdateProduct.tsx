import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link, useParams } from 'react-router-dom';
import {
    nameValidator,
    variationsValidator,
} from '@/validation/Products/validators';
import WrapperCard from './_component/WrapperCard';
import { ADMIN_ROUTES } from '@/constants/router';
import WrapperPageAdmin from '@/pages/Admin/_common/WrapperPageAdmin';
import VariationItem from '@/pages/Admin/_product_/_component/VariationItem';
import useGetCategories from '@/hooks/categories/Queries/useGetCategories';
import useGetTags from '@/hooks/Tags/Queries/useGetTags';
import useGetColors from '@/hooks/Colors/Queries/useGetColors';
import useGetSizes from '@/hooks/Sizes/Queries/useGetSizes';
import { useEffect, useState } from 'react';
import useCreateProduct from '@/hooks/Products/Mutations/useCreateProduct';
import { FormProps } from 'antd/lib';
import { handleCreateProduct } from '@/pages/Admin/_product_/Helper/handleCreateProduct';
import { useGetDetailProduct } from '@/hooks/Products/Queries/useGetDetailProduct';
import convertApiResponseToFileList from '@/pages/Admin/_product_/Helper/convertImageUrlToFileList';

const UpdateProduct = () => {
    const [form] = Form.useForm<any>();
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState<any>();
    const [variantFile, setVariantFile] = useState<UploadFile[][]>([]);
    // @Query
    const { data: categories } = useGetCategories({ limit: '100000' });
    const { data: tags } = useGetTags({ limit: '100000' });
    const { data: sizes } = useGetSizes({ limit: '100000' });
    const { data: colors } = useGetColors({ limit: '100000' });
    const { mutate: createProduct } = useCreateProduct();
    const { data: targetProduct } = useGetDetailProduct(id as string);

    const onFinish: FormProps<any>['onFinish'] = (values) => {
        console.log(values, 'values');
        handleCreateProduct(values, createProduct);
    };
    const handleChangeAttributeThumbnail = (
        index: number,
    ): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...attributesFile];
            newAttributesFile[index] = newFileList;
            setAttributesFile(newAttributesFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newAttributesFile = [...attributesFile];
        newAttributesFile[index] = [];
        setAttributesFile(newAttributesFile);
    };

    useEffect(() => {
        if (targetProduct) {
            const { variants, ...rest } = targetProduct;

            let newVariantFile: UploadFile<any>[][] = [];
            const variaConverts = variants.map((varia, i) => {
                const image = convertApiResponseToFileList({
                    url: varia.image!,
                    urlRef: varia.imageUrlRef,
                    isArr: true,
                }) as UploadFile<any>[];
                newVariantFile = [...newVariantFile];
                newVariantFile[i] = image;
                setVariantFile((prev) => [...prev, image]);
                const newVaria: any = {
                    ...varia,
                    thumbnail: image,
                };
                delete newVaria.image;
                return newVaria;
            });

            const initial: any = {
                variants: variaConverts,
                ...rest,
            };
            setInitialValues({
                initialValue: initial,
                initialVariantFile: newVariantFile,
            });

            form.setFieldsValue(initial as any);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetProduct, id]);

    return (
        <WrapperPageAdmin
            title="Cập nhật mới sản phẩm"
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className="underline">
                    Quay lại
                </Link>
            }
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <div className="grid grid-cols-1 gap-4">
                    <WrapperCard title="Thông tin cơ bản">
                        <Form.Item name="isHide" className="hidden" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item<any>
                            label="Danh mục"
                            name="categoryId"
                            required
                            className="font-medium text-[#08090F]"
                        >
                            <Select
                                size="large"
                                placeholder="Chọn danh mục cho sản phẩm..."
                                className="w-full"
                                options={categories?.data?.categories?.map(
                                    (item: any) => ({
                                        label: item.name,
                                        value: item._id,
                                    }),
                                )}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Thẻ phân loại"
                            name="brandId"
                            required
                            className="font-medium text-[#08090F]"
                        >
                            <Select
                                size="large"
                                mode="multiple"
                                allowClear
                                className="w-full normal-case"
                                placeholder="Chọn các thẻ phân loại cho sản phẩm..."
                                options={tags?.data?.tags?.map((tag: any) => ({
                                    label: tag.name,
                                    value: tag._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Tên sản phẩm"
                            name="name"
                            required
                            className="font-medium text-[#08090F]"
                            rules={[
                                {
                                    validator: nameValidator,
                                },
                            ]}
                        >
                            <Input
                                placeholder="Nhập tên sản phẩm..."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<any>
                            className="font-medium flex text-[#08090F] capitalize"
                            name={'price'}
                            required
                            label="giá tiền (VNĐ)"
                        >
                            <InputNumber<number>
                                min={1}
                                placeholder="Nhập giá tiền..."
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ',',
                                    )
                                }
                                parser={(value) =>
                                    value?.replace(
                                        /VNĐ\s?|(,*)/g,
                                        '',
                                    ) as unknown as number
                                }
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<any>
                            label="Mô tả"
                            name="description"
                            className="font-medium text-[#08090F]"
                        >
                            <TextArea
                                placeholder="Nhập mô tả sản phẩm..."
                                rows={4}
                                className="w-full"
                            />
                        </Form.Item>
                    </WrapperCard>

                    <WrapperCard
                        // isLoading={isAttributeLoading}
                        title="Thông tin bán hàng"
                    >
                        <Form.List
                            name="variations"
                            rules={[
                                {
                                    validator: variationsValidator,
                                },
                            ]}
                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(
                                        (
                                            { key, name, ...restField },
                                            index,
                                        ) => {
                                            return (
                                                <VariationItem
                                                    key={key}
                                                    colors={
                                                        colors?.data.colors ||
                                                        []
                                                    }
                                                    handleChangeThumbnail={
                                                        handleChangeAttributeThumbnail
                                                    }
                                                    variantFile={attributesFile}
                                                    handleRemoveThumbnail={
                                                        handleRemoveAttributeThumbnail
                                                    }
                                                    sizes={
                                                        sizes?.data.sizes || []
                                                    }
                                                    index={index}
                                                    fieldName={name}
                                                    restField={restField}
                                                    removeVariation={remove}
                                                />
                                            );
                                        },
                                    )}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            htmlType="button"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Thêm biến thể
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </WrapperCard>
                </div>
                <Form.Item>
                    <div className="sticky bottom-0 right-0 my-2 flex justify-end rounded-md border-t-2 border-black border-opacity-5 bg-white p-4">
                        <Button
                            type="default"
                            htmlType="submit"
                            className="mr-3 px-5"
                            // loading={isPending && isHide}
                            // disabled={isPending}
                            size="large"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};
export default UpdateProduct;
