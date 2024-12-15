import React, { useState } from 'react';
import { Input, Button, message, Form, Typography } from 'antd';
import { useMutationClaimVoucher } from '@/hooks/MyVoucher/Mutations/useClaimVoucher';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const MyVoucher = () => {
    const [voucherCode, setVoucherCode] = useState('');

    const { mutate, isPending, error } = useMutationClaimVoucher();

    const handleClaim = () => {
        if (!voucherCode.trim()) {
            message.warning('Vui lòng nhập mã voucher.');
            return;
        }

        mutate({ voucherCode });
    };
    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                textAlign: 'center',
            }}
        >
            <h2>Claim Voucher</h2>
            <Link
                to="/"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Trang Chủ
            </Link>
            <Form layout="vertical">
                <Form.Item label="Mã Voucher" required>
                    <Input
                        placeholder="Nhập mã voucher"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        disabled={isPending}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={handleClaim}
                        loading={isPending}
                        block
                    >
                        Claim
                    </Button>

                    {/* <Text className="text-lg text-red-500">
                        {error?.response.data.message}
                    </Text> */}
                </Form.Item>
            </Form>
        </div>
    );
};

export default MyVoucher;
