import { useQueryClient } from '@tanstack/react-query';
import { Form, Radio, Space, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useDispatch } from 'react-redux';

interface Props {
    districtId: number;
}

const DeliveryMethod = ({ districtId }: Props) => {
    const form = Form.useFormInstance();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

  


    return (
        <Space direction='vertical' className='mb-5 w-full rounded-lg border-2 border-gray p-5'>
            <Typography.Text className='text-[1.2rem] font-semibold'>Phương thức vận chuyển</Typography.Text>
            <Form.Item
                name='serviceId'
                rules={[{ required: true, message: <>Vui lòng chọn phương thức vận chuyển</> }]}
            >
                <Radio.Group className='flex flex-col gap-3' >
                    {/* {services &&
                        services.map((service, index) => {
                            return (
                                <Fragment key={index}>
                                    {service.service_id === 53320 ? (
                                        <Radio
                                            value={service.service_id}
                                            className='w-full rounded-lg border-2 border-gray p-3'
                                        >
                                            <Space className='w-full p-3'>
                                                <MdOutlineLocalShipping size={'1.5rem'} />
                                                <Typography.Text className='text-[1rem] font-semibold'>
                                                    Vận chuyển tiêu chuẩn
                                                </Typography.Text>
                                            </Space>
                                        </Radio>
                                    ) : (
                                        <Radio
                                            value={service.service_id}
                                            className='w-full rounded-lg border-2 border-gray p-3'
                                        >
                                            <Space className='w-full p-3'>
                                                <FaShippingFast size={'1.5rem'} />
                                                <Typography.Text className='text-[1rem] font-semibold'>
                                                    Vận chuyển đặc biệt
                                                </Typography.Text>
                                            </Space>
                                        </Radio>
                                    )}
                                </Fragment>
                            );
                        })} */}
                </Radio.Group>
            </Form.Item>
            <Typography.Text className='flex justify-center text-[0.8rem] font-semibold'>
                Cước phí vận chuyển và thời gian giao hàng dự kiến sẽ được hiển thị sau khi bạn thực hiện bước tiếp
                theo.
            </Typography.Text>
        </Space>
    );
};

export default DeliveryMethod;
