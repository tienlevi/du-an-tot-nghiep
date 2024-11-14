import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    Image,
    Input,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useGetAllAtributes } from '@/hooks/attributes/Queries/useGetAttributesByCate';
// import useCreateProduct from '@/hooks/products/Mutations/useCreateProduct';
// import useGetCategoriesAndBrands from '@/hooks/useGetCategoriesAndBrands';
// import { IAttributesValue } from '@/types/Attributes';
import { IAxiosResponse } from '@/types/AxiosResponse';
import { IProductForm } from '@/types/Product';
import {
    brandValidator,
    categoryValidator,
    imagesValidator,
    nameValidator,
    thumbnailValidator,
    variationsValidator,
} from '@/validation/Products/validators';
import AttributesItem from './_component/AttributesItem';
import VariationItem from './_component/VariationItem';
import { handleCreateProduct } from './Helper/handleCreateProduct';
import { FileType, getBase64 } from './Helper/_helper_';
import { UploadButton } from './_component/UploadButton';
import WrapperCard from './_component/WrapperCard';
import { ADMIN_ROUTES } from '@/constants/router';
import WrapperPageAdmin from '@/pages/Admin/_common/WrapperPageAdmin';

const CreateProduct = () => {
    const [isHide, setIsHide] = useState<boolean>(false);
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] =
        useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const [isChooseCategory, setIsChooseCategory] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>('');
    // const { data: attributesRes, isLoading: isAttributeLoading } = useGetAllAtributes(categoryId);
    // const attributesForProduct = attributesRes?.data?.productAttributes?.attributeIds;
    // const attributesForVariant = attributesRes?.data?.variantAttribute?.attributeIds;
    // const categoriesAndBrandData = useGetCategoriesAndBrands();
    // const {
    //     mutateAsync: createProduct,
    //     data: createProductData,
    //     isError,
    //     isSuccess,
    //     error,
    //     isPending,
    // } = useCreateProduct();
    const [form] = Form.useForm<IProductForm>();
    const dataIndex = {
        brands: 0,
        categories: 1,
    };
    // const firstElement = 0;
    // const categories = categoriesAndBrandData?.[dataIndex.categories].data?.data;
    // const brands = categoriesAndBrandData?.[dataIndex.brands].data?.data;

    const handlePreview = async (file: UploadFile, multiple: boolean) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        if (multiple) {
            setPreviewImages(file.url || (file.preview as string));
            setPreviewImagesOpen(true);
        } else {
            setPreviewThumbnail(file.url || (file.preview as string));
            setPreviewThumbnailOpen(true);
        }
    };

    const handleChangeImages: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => setImagesFileList(newFileList);
    const handleChangeThumbnail: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => setThumbnailFile(newFileList);

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

    // const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
    //     handleCreateProduct(values, createProduct);
    // };
    const handleSaveAndShow = () => {
        setIsHide(false);
        form.setFieldsValue({ isHide: false });
    };

    const handleSaveAndHide = () => {
        setIsHide(true);
        form.setFieldsValue({ isHide: true });
    };
    const handleChangeCat = (value: string) => {
        setCategoryId(value);
        setIsChooseCategory(true);
    };

    /* eslint-disable */
    // useEffect(() => {
    //     if (isError) {
    //         const errorMessageRes = ((error as AxiosError)?.response?.data as IAxiosResponse<null>)?.message?.split(
    //             '"'
    //         );
    //         const keyIndex = 1;
    //         const messageIndex = 2;
    //         form.setFields([
    //             {
    //                 name: [errorMessageRes[keyIndex]],
    //                 errors: [errorMessageRes[messageIndex]],
    //             },
    //         ]);
    //     }
    //     if (isSuccess) {
    //         form.resetFields();
    //         setImagesFileList([]);
    //         setThumbnailFile([]);
    //     }
    // }, [createProductData, isError, error, form, isSuccess]);
    /* eslint-enable */
    return (
        <WrapperPageAdmin
            title="Thêm mới sản phẩm"
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS} className="underline">
                    Quay lại
                </Link>
            }
        >
            {/* <Form layout="vertical" form={form} onFinish={onFinish}> */}
            <Form layout="vertical" form={form}>
                <div className="grid grid-cols-1 gap-4">
                    <WrapperCard title="Thông tin cơ bản">
                        <Form.Item name="isHide" className="hidden" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label="Danh mục"
                            name="categoryId"
                            required
                            className="font-medium text-[#08090F]"
                            rules={[categoryValidator()]}
                            validateTrigger={['onChange', 'onBlur']}
                        >
                            <Select
                                size="large"
                                onChange={handleChangeCat}
                                placeholder="Chọn danh mục cho sản phẩm..."
                                className="w-full"
                                // options={categories?.map((category) => ({
                                //     label: category.name,
                                //     value: category._id,
                                // }))}
                            />
                        </Form.Item>
                        <Form.Item<IProductForm>
                            label="Thương hiệu"
                            name="brandId"
                            required
                            className="font-medium text-[#08090F]"
                            rules={[brandValidator()]}
                        >
                            <Select
                                size="large"
                                className="w-full normal-case"
                                placeholder="Chọn thương hiệu cho sản phẩm..."
                                // options={brands?.map((brand) => ({
                                //     label: brand.name,
                                //     value: brand._id,
                                // }))}
                            />
                        </Form.Item>
                        {/* <Form.Item<IProductForm>
                            label="Hình ảnh sản phẩm"
                            name="images"
                            required
                            className="font-medium text-[#08090F]"
                            dependencies={['images']}
                            rules={[
                                {
                                    validator: imagesValidator,
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                fileList={imagesfileList}
                                onPreview={(files) =>
                                    handlePreview(files, true)
                                }
                                onChange={handleChangeImages}
                                maxCount={5}
                                multiple
                            >
                                {imagesfileList.length >= 5
                                    ? null
                                    : UploadButton}
                            </Upload>
                        </Form.Item> */}
                        {/* {previewImages && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewImagesOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewImagesOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImages(''),
                                }}
                                src={previewImages}
                            />
                        )} */}
                        {/* <Form.Item<IProductForm>
                            label="Ảnh bìa"
                            required
                            name="thumbnail"
                            className="font-medium text-[#08090F]"
                            dependencies={['thumbnail']}
                            rules={[
                                {
                                    validator: thumbnailValidator,
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                fileList={thumbnailFile}
                                onPreview={(file) => handlePreview(file, false)}
                                onChange={handleChangeThumbnail}
                                maxCount={1}
                            >
                                {thumbnailFile.length >= 1
                                    ? null
                                    : UploadButton}
                            </Upload>
                        </Form.Item> */}
                        {/* {previewThumbnail && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewThumbnailOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewThumbnailOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewThumbnail(''),
                                }}
                                src={previewThumbnail}
                            />
                        )} */}
                        <Form.Item<IProductForm>
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
                        <Form.Item<IProductForm>
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
                        title="Thông tin chi tiết"
                        isOpacity={!isChooseCategory}
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* {attributesForProduct?.map(
                                (
                                    attribute: IAttributesValue,
                                    index: number,
                                ) => (
                                    <AttributesItem
                                        attribute={attribute}
                                        key={index}
                                    />
                                ),
                            )} */}
                        </div>
                    </WrapperCard>
                    <WrapperCard
                        // isLoading={isAttributeLoading}
                        title="Thông tin bán hàng"
                        isOpacity={!isChooseCategory}
                    >
                        <Form.List
                            name="variations"
                            rules={[
                                {
                                    validator: variationsValidator,
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {/* {fields.map(
                                        (
                                            { key, name, ...restField },
                                            index,
                                        ) => {
                                            return (
                                                <VariationItem
                                                    key={key}
                                                    index={index}
                                                    attributesForVariant={
                                                        attributesForVariant
                                                    }
                                                    fieldName={name}
                                                    restField={restField}
                                                    variantFile={attributesFile}
                                                    handleChangeThumbnail={
                                                        handleChangeAttributeThumbnail
                                                    }
                                                    handleRemoveThumbnail={
                                                        handleRemoveAttributeThumbnail
                                                    }
                                                    removeVariation={remove}
                                                />
                                            );
                                        },
                                    )} */}
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
                                    {isChooseCategory && errors && (
                                        <Form.ErrorList
                                            errors={errors}
                                            className="text-red"
                                        />
                                    )}
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
                            onClick={handleSaveAndHide}
                            size="large"
                        >
                            Lưu và ẩn
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusSquareOutlined />}
                            className="mr-3 px-5"
                            // loading={isPending && !isHide}
                            // disabled={isPending}
                            size="large"
                            onClick={handleSaveAndShow}
                        >
                            Lưu và hiển thị
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};
export default CreateProduct;
