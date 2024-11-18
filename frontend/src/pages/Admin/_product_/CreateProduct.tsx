import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Image,
    Input,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import {
    brandValidator,
    nameValidator,
    variationsValidator,
} from '@/validation/Products/validators';
import WrapperCard from './_component/WrapperCard';
import { ADMIN_ROUTES } from '@/constants/router';
import WrapperPageAdmin from '@/pages/Admin/_common/WrapperPageAdmin';
import useGetAllCategoriesNoParams from '@/hooks/categories/Queries/useGetAllCategoriesNoParams';
import useGetAllTagNoParams from '@/hooks/Tags/Queries/useGetAllTagNoParams';

const CreateProduct = () => {
    const [form] = Form.useForm<any>();
    const { data: categories } = useGetAllCategoriesNoParams();
    const { data: tags } = useGetAllTagNoParams();

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
                            Lưu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </WrapperPageAdmin>
    );
};
export default CreateProduct;
