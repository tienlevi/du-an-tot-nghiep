import { Card, Row, Col, Button, Typography, Modal } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import './VoucherList.css';
import WrapperList from '@/components/_common/WrapperList';
import useGetMyVoucher from '@/hooks/MyVoucher/Queries/useGetMyVoucher';
import { formatDate } from '@/utils/formatDate';
import { Currency } from '@/utils/FormatCurreny';
import { MyVoucher } from '@/types/MyVoucher';

const { Text } = Typography;

const VoucherList = ({
    open,
    voucherSelected,
    onCancel,
    onSelectVoucher,
}: {
    open: boolean;
    onCancel: () => void;
    onSelectVoucher: (voucher: MyVoucher) => void;
    voucherSelected?: MyVoucher;
}) => {
    const { data, error } = useGetMyVoucher();

    console.log('data', data);

    const myVoucher = data?.data;

    return (
        <>
            <Modal open={open} footer="" onCancel={onCancel}>
                <WrapperList
                    classic
                    className="m-0"
                    title="Danh sách voucher của bạn"
                >
                    {myVoucher ? (
                        <>
                            {myVoucher.length > 0 ? (
                                <div
                                    style={{
                                        padding: '20px',
                                        background: '#f5f5f5',
                                    }}
                                >
                                    <Row gutter={[16, 16]}>
                                        {myVoucher.map((voucher) => (
                                            <Col md={24} key={voucher._id}>
                                                <Card
                                                    style={{
                                                        borderRadius: '8px',
                                                        border:
                                                            voucherSelected?._id ===
                                                            voucher._id
                                                                ? '1px solid red'
                                                                : '',
                                                    }}
                                                    bodyStyle={{
                                                        padding: '10px',
                                                    }}
                                                    hoverable
                                                    bordered={false}
                                                >
                                                    <div className="voucher-container">
                                                        <div className="voucher-icon">
                                                            <ShoppingOutlined
                                                                style={{
                                                                    fontSize:
                                                                        '28px',
                                                                    color: '#fff',
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="voucher-content">
                                                            {/* <Tag
                                                                color="gold"
                                                                className="voucher-tag"
                                                            >
                                                                Số lượng có hạn
                                                            </Tag> */}
                                                            <Text strong>
                                                                {voucher
                                                                    .voucherId
                                                                    .discountType ===
                                                                'fixed' ? (
                                                                    <>
                                                                        Giảm
                                                                        trực
                                                                        tiếp{' '}
                                                                        <Text type="danger">
                                                                            {Currency(
                                                                                voucher
                                                                                    .voucherId
                                                                                    .discountValue,
                                                                            )}
                                                                        </Text>{' '}
                                                                        cho đơn
                                                                        hàng
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Giảm{' '}
                                                                        <Text type="danger">
                                                                            {
                                                                                voucher
                                                                                    .voucherId
                                                                                    .discountValue
                                                                            }{' '}
                                                                            %
                                                                        </Text>{' '}
                                                                        cho tổng
                                                                        giá trị
                                                                        đơn hàng
                                                                    </>
                                                                )}
                                                            </Text>
                                                            <div>
                                                                <Text type="secondary">
                                                                    Hiệu Lực Từ:{' '}
                                                                    {formatDate(
                                                                        voucher
                                                                            .voucherId
                                                                            .startDate as any,
                                                                    )}
                                                                    <Text type="danger">
                                                                        {' '}
                                                                        {
                                                                            ' Đến '
                                                                        }
                                                                    </Text>
                                                                    {formatDate(
                                                                        voucher
                                                                            .voucherId
                                                                            .endDate as any,
                                                                    )}
                                                                </Text>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginTop:
                                                                        '8px',
                                                                }}
                                                            >
                                                                <Button
                                                                    type="text"
                                                                    size="small"
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                    onClick={() =>
                                                                        onSelectVoucher(
                                                                            voucher,
                                                                        )
                                                                    }
                                                                >
                                                                    Dùng ngay
                                                                    &gt;
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ) : (
                                <p className="text-center text-global text-lg font-medium">
                                    Không có voucher!
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-global text-lg font-medium">
                            {error?.message}
                        </p>
                    )}
                </WrapperList>
            </Modal>
        </>
    );
};

export default VoucherList;
