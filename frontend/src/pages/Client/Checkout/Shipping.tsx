import React from 'react';
import { Form, Input, Button, Card, Space, Typography, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeliveryMethod from './DeliveryMethod';
import ReceiverInfo from './ReceiverInfo';
import ShippingAddress from './ShippingAdress';
import useDocumentTitle from '@/hooks/_common/useDocumentTitle';
import { setDescription, setReceiver } from '@/store/slice/orderSlice';

const { Title, Text } = Typography;

const Shipping: React.FC = () => {
    useDocumentTitle('Thông tin giao hàng');

    const [form] = Form.useForm();
    const districtId = Form.useWatch('districtId', form);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setDescription({ description: e.target.value }));
    };

    const onFinish = (values: any) => {
        dispatch(
            setReceiver({
                customer: {
                    name: values.customerName,
                    email: values.customerEmail,
                    phone: values.customerPhone,
                },
                receiver: {
                    name: values.receiverName || values.customerName,
                    email: values.receiverEmail || values.customerEmail,
                    phone: values.receiverPhone || values.customerPhone,
                },
            })
        );

        navigate('/checkout');
    };

    return (
        <Card className='mx-auto my-8 w-full max-w-6xl shadow-lg'>
            <Title level={2} className='mb-6 text-center'>
                Thông tin giao hàng
            </Title>
            <Form layout='vertical' form={form} onFinish={onFinish} className='space-y-8'>
                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        <Space direction='vertical' className='w-full'>
                            <ReceiverInfo form={form} />
                            <ShippingAddress />
                            <Form.Item label='Ghi chú đơn hàng (Tùy chọn)' name='description'>
                                <Input.TextArea rows={4} onChange={handleDescriptionChange} />
                            </Form.Item>
                        </Space>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card className='bg-gray-50 h-full'>
                            <Title level={4} className='mb-4'>
                                Phương thức vận chuyển
                            </Title>
                            {districtId ? (
                                <DeliveryMethod districtId={districtId} />
                            ) : (
                                <Text type='secondary'>Vui lòng chọn địa chỉ giao hàng trước</Text>
                            )}
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size='large'
                                    block
                                    className='h-12 text-lg font-semibold'
                                >
                                    Tiếp tục thanh toán
                                </Button>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default Shipping;
