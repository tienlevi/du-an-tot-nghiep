import React, { useState } from 'react';
import { Button, Card, List, Typography, Divider, Tag, Image, Space, Checkbox, CheckboxProps, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { useCreateOrder } from '@/hooks/orders/Mutations/useCreateOrder';
import showMessage from '@/utils/ShowMessage';
import PolicyModal from '@/components/PolicyModal';
import useGetMyCart from '@/hooks/cart/Queries/useGetMyCart';

const { Text, Title } = Typography;

const ProductItemsCheckout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data} = useGetMyCart()
    const cartItems = data ? data.items : []
    const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);

    const { description, receiverInfo, shippingAddress, tax, shippingFee } = useSelector(
        (state: RootState) => state.order
    );
 
    const subTotal = cartItems?.reduce((acc:any, item: any) => acc + +item.price * item.quantity, 0) || 0;

    const taxAmount = tax * subTotal;
    const totalPrice = subTotal + taxAmount + shippingFee;

    const createOrder = useCreateOrder();

    const handleCheckout = () => {
        createOrder.mutate(
            {
                items: cartItems as [],
                customerInfo: receiverInfo.customer,
                receiverInfo: receiverInfo.addReceiver,
                description: description ?? '',
                shippingAddress: {
                    province: shippingAddress.province,
                    district: shippingAddress.district,
                    ward: shippingAddress.ward,
                    address: shippingAddress.address,
                    provinceId: shippingAddress.provinceId!,
                    districtId: shippingAddress.districtId!,
                    wardCode: shippingAddress.wardCode,
                },
                totalPrice,
                tax,
                shippingFee,
            },
            {
                onSuccess: () => {
                    navigate('/success');
                },
                onError: (error: any) => {
                    showMessage(error.response.data.message, 'error');
                },
            }
        );
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const onChange: CheckboxProps['onChange'] = (e) => {
        setPolicyAgreed(e.target.checked);
    };

    return (
        <div className='flex h-full flex-col'>
            <Title level={4} className='mb-4'>
                Đơn hàng của bạn
            </Title>

            <div className='mb-4 flex-grow overflow-auto' style={{ maxHeight: '400px' }}>
                <List
                    itemLayout='horizontal'
                    dataSource={cartItems}
                    renderItem={(item: any) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={60} src={item.image} preview={false} />}
                                title={<Text strong>{item.name}</Text>}
                                description={
                                    <>
                                        <Space wrap>
                                                <Tag color='blue'>
                                                    Màu sắc: {item.color}
                                                </Tag>
                                                <Tag color='blue'>
                                                    Kích cỡ: {item.size}
                                                </Tag>
                                        </Space>
                                        <div className='mt-2'>
                                            <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                                            <Text className='ml-4'>Số lượng: {item.quantity}</Text>
                                        </div>
                                    </>
                                }
                            />
                            <div>
                                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Divider />

                <Space direction='vertical' className='w-full'>
                    <div className='flex justify-between'>
                        <Text>Tạm tính:</Text>
                        <Text>{formatCurrency(subTotal)}</Text>
                    </div>

                    <div className='flex justify-between'>
                        <Text>Thuế VAT ({tax * 100}%):</Text>
                        <Text>{formatCurrency(taxAmount)}</Text>
                    </div>

                    <div className='flex justify-between'>
                        <Text>Phí vận chuyển:</Text>
                        <Text>{formatCurrency(shippingFee)}</Text>
                    </div>

                    <Checkbox onChange={onChange} defaultChecked={false} className='cursor-default'>
                        Tôi đồng ý với <PolicyModal />
                    </Checkbox>

                    <Divider />

                    <div className='flex justify-between'>
                        <Title level={3}>Tổng cộng:</Title>
                        <Title level={3} type='danger'>
                            {/* {formatCurrency(totalPrice)} */}
                        </Title>
                    </div>
                </Space>

                <Card className='mt-4 border-blue-200 bg-blue-50'>
                    <Tooltip
                        title={
                            policyAgreed
                                ? ''
                                : 'Bạn cần đồng ý với điều khoản và chính sách của chúng tôi để tiếp tục đặt hàng'
                        }
                        color='blue'
                    >
                        <Button
                            type='primary'
                            loading={createOrder.isPending}
                            size='large'
                            block
                            onClick={handleCheckout}
                            className='h-12 text-lg font-semibold'
                            disabled={!policyAgreed}
                        >
                            Đặt hàng
                        </Button>
                    </Tooltip>
                </Card>
            </div>
        </div>
    );
};

export default ProductItemsCheckout;
