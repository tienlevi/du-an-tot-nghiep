import { ADMIN_ROUTES } from '@/constants/router';
import { useMutationUpdateVoucher } from '@/hooks/Voucher/Mutations/useUpdateVoucher';
import { IVoucherFormData } from '@/types/Voucher';
import {
    voucherCodeValidator,
    voucherDiscountValidator,
    voucherDateValidator,
} from '@/validation/voucher/validator';
import { PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    FormProps,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useGetDetailVoucher from '@/hooks/Voucher/Queries/useGetDetailVoucher';
import showMessage from '@/utils/ShowMessage';
import { useEffect } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const UpdateVoucher = () => {
    const { id } = useParams();

    const { data: voucherRes } = useGetDetailVoucher(id as string);
    const [form] = Form.useForm<IVoucherFormData>();
    const { mutate: updateVoucher, isPending } = useMutationUpdateVoucher();

    const onFinish: FormProps<IVoucherFormData>['onFinish'] = (values) => {
        if (id) {
            updateVoucher({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id voucher', 'error');
        }
    };
    const onFinishFailed: FormProps<IVoucherFormData>['onFinishFailed'] = (
        errorInfo,
    ) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (voucherRes) {
            form.setFieldsValue({
                code: voucherRes.code,
                description: voucherRes.description,
                discountType: voucherRes.discountType,
                discountValue: voucherRes.discountValue,
                minOrderValue: voucherRes.minOrderValue,
                quantity: voucherRes.quantity,
                status: voucherRes.status,
                dateRange:
                    voucherRes.startDate && voucherRes.endDate
                        ? [
                              moment(voucherRes.startDate),
                              moment(voucherRes.endDate),
                          ]
                        : undefined,
            });
        }
    }, [voucherRes, form]);

    return (
        <WrapperPageAdmin
            title="Cập nhật thông tin voucher"
            option={
                <Link to={ADMIN_ROUTES.VOUCHER} className="underline">
                    Quay lại
                </Link>
            }
        >
            <Form
                form={form}
                initialValues={{
                    minOrderValue: 0,
                }}
                layout="vertical"
                className="grid grid-cols-12"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="col-span-8">
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Mã voucher"
                            name="code"
                            className="font-medium text-[#08090F]"
                            rules={voucherCodeValidator}
                            validateTrigger="onChange"

                        >
                            <Input placeholder="Nhập mã voucher..." />
                        </Form.Item>
                    </div>
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            className="font-medium text-[#08090F]"
                        >
                            <Input.TextArea
                                placeholder="Nhập mô tả cho voucher..."
                                rows={4}
                            />
                        </Form.Item>
                    </div>
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Loại giảm giá"
                            name="discountType"
                            className="font-medium text-[#08090F]"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn loại giảm giá!',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại giảm giá">
                                <Select.Option value="percentage">
                                    Phần trăm
                                </Select.Option>
                                <Select.Option value="fixed">
                                    Giảm giá cố định
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="w-full rounded-lg p-2 px-4">
                    <Form.Item
                            label="Giá trị giảm giá"
                            name="discountValue"
                            dependencies={['discountType']}
                            className="font-medium text-[#08090F]"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const discountType = getFieldValue('discountType');
                                        const validatorRule = voucherDiscountValidator(discountType)[1];
                                        
                                        if (validatorRule && typeof validatorRule.validator === 'function') {
                                            return validatorRule.validator(_, value);
                                        }
                                    },
                                }),
                            ]}
                            validateTrigger="onChange"

                        >
                            <InputNumber
                                placeholder="Nhập giá trị giảm giá"
                                min={0}
                                className="w-full"
                            />
                        </Form.Item>
                    </div>
                    {/* <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Giá trị đơn hàng tối thiểu"
                            name="minOrderValue"
                            className="font-medium text-[#08090F]"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập giá trị đơn hàng tối thiểu',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="Nhập giá trị đơn hàng tối thiểu"
                                min={0}
                                value={0}
                                className="w-full"
                            />
                        </Form.Item>
                    </div> */}
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            className="font-medium text-[#08090F]"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng voucher',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="Nhập số lượng voucher"
                                min={0}
                                className="w-full"
                            />
                        </Form.Item>
                    </div>
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            className="font-medium text-[#08090F]"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn trạng thái',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại trạng thái">
                                <Select.Option value="active">
                                    Chưa sử dụng
                                </Select.Option>
                                <Select.Option value="used">
                                    Đã sử dụng
                                </Select.Option>
                                <Select.Option value="expired">
                                    Hết hạn
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    {/* <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Danh mục áp dụng"
                            name="applicableCategories"
                            className="font-medium text-[#08090F]"
                        >
                            <Select
                                mode="tags"
                                placeholder="Nhập danh mục áp dụng"
                                className="w-full"
                            />
                        </Form.Item>
                    </div> */}
                    <div className="w-full rounded-lg p-2 px-4">
                        <Form.Item
                            label="Ngày hiệu lực"
                            name="dateRange"
                            className="font-medium text-[#08090F]"
                            rules={voucherDateValidator}
                        >
                            <RangePicker className="w-full" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col justify-between border-s border-black border-opacity-20 px-4">
                    <div className="sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 p-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size="large"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default UpdateVoucher;
