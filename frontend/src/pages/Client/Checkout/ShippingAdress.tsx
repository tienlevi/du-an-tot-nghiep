import { Form, Input, Select, Space, Typography } from 'antd';

const ShippingAddress = () => {
    const form = Form.useFormInstance();
   

    return (
        <Space direction='vertical' className='mt-5 w-full rounded-lg border border-gray p-3'>
            <Typography.Text className='text-[1.2rem] font-semibold'>Địa chỉ giao hàng</Typography.Text>

            <Form.Item label='Quốc gia' name='country' rules={[{ required: true }]}>
                <Select options={[{ value: 'vn', label: 'Viet Nam' }]} />
            </Form.Item>

            <Form.Item label='Tỉnh/Thành phố' name='provinceId' rules={[{ required: true, message: <></> }]}>
                {/* <Select options={provinceList} allowClear onChange={handleSelectProvinceChange} /> */}
            </Form.Item>

            <Form.Item
                label='Quận/Huyện'
                rules={[{ required: true, message: <></> }]}
                shouldUpdate={(prevValues: { provinceId: number }, currentValues: { provinceId: number }) =>
                    prevValues.provinceId !== currentValues.provinceId
                }
            >
                {({ getFieldValue }) => {
                    const provinceId = getFieldValue('provinceId');

                    // if (provinceId) {
                    //     return <DistrictSelectList provinceId={provinceId} />;
                    // }
                    return (
                        <Form.Item name='districtId' rules={[{ required: true, message: <></> }]}>
                            <Select options={[]} disabled />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <Form.Item
                label='Phường/Xã'
                rules={[{ required: true, message: <></> }]}
                shouldUpdate={(prevValues: { districtId: number }, currentValues: { districtId: number }) =>
                    prevValues.districtId !== currentValues.districtId
                }
            >
                {({ getFieldValue }) => {
                    const districtId = getFieldValue('districtId');

                    if (districtId) {
                        // return <WardSelectList districtId={districtId} />;
                    }
                    return (
                        <Form.Item name='wardCode' rules={[{ required: true, message: <></> }]}>
                            <Select options={[]} disabled />
                        </Form.Item>
                    );
                }}
            </Form.Item>
            <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: <></> }]}>
                {/* <Input onChange={handleAddressChange} /> */}
            </Form.Item>
        </Space>
    );
};

export default ShippingAddress;
