import SortPopup from '@/components/SortPopup/SortPopup';
import useFilter from '@/hooks/_common/useFilter';
import useGetVoucher from '@/hooks/Voucher/Queries/useGetVoucher';
import { Currency } from '@/utils';
import { formatDate } from '@/utils/formatDate';
import {
    DownOutlined,
    ShoppingOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Dropdown,
    Empty,
    Pagination,
    RadioChangeEvent,
    Row,
    Skeleton,
    Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import './VoucherList.css';
import { useMutationClaimVoucher } from '@/hooks/MyVoucher/Mutations/useClaimVoucher';

const { Text } = Typography;

const Voucher = () => {
    const limit = 10;
    const { query, updateQueryParam, reset } = useFilter();
    const queryKeys = Object.keys(query);
    let isResetFilter = false;

    const {
        data,
        isLoading: isVoucherLoading,
        refetch,
    } = useGetVoucher({
        ...query,
        status: 'active',
    });

    const vouchers = data?.data.vouchers;

    console.log('vouchers', vouchers);
    const totalVouchers = vouchers?.length;
    const totalDocs = data?.data?.totalDocs;
    // const totalPages = Math.ceil(totalDocs / Number(query?.limit)) || 0;

    // check if query key is have one
    if (
        (queryKeys.length === 1 && queryKeys.includes('category')) ||
        (queryKeys.length === 2 &&
            queryKeys.includes('category') &&
            queryKeys.includes('page'))
    ) {
        isResetFilter = false;
    } else if (queryKeys.length > 0) {
        isResetFilter = true;
    }

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['sort']: e.target.value });
    };

    const handleReset = () => {
        reset();
    };

    const onPageChange = (page: number) => {
        updateQueryParam({
            ...query,
            page: page.toString(),
            limit: String(limit),
        });
    };

    const { mutate, isPending } = useMutationClaimVoucher();

    const claimVoucher = (voucherCode: string) => {
        mutate(
            { voucherCode },
            {
                onSuccess: () => {
                    refetch();
                },
            },
        );
    };

    return (
        <div className="lg:max-w-[1200px] 2xl:max-w-screen-default w-full default:mx-auto mx-4">
            <div className="gap-4 flex">
                <div className="px-2 flex-1">
                    <div className="breadcrumb">
                        <Breadcrumb
                            className="text-base py-4"
                            separator=">"
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <Link to="/">Voucher</Link>,
                                },
                            ]}
                        />
                    </div>
                    <div className="flex justify-between border-b border-black border-opacity-5 pb-4">
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{totalVouchers}</span>
                            <span className="font-normal">Voucher</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Dropdown
                                placement="bottomLeft"
                                className=""
                                trigger={['click']}
                                dropdownRender={() => (
                                    <SortPopup
                                        value={query?.sort}
                                        onChange={onChange}
                                    />
                                )}
                            >
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <UnorderedListOutlined
                                        style={{ fontSize: 20 }}
                                    />
                                    <span className="font-medium">
                                        Sắp xếp theo
                                    </span>
                                    <DownOutlined />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    {isResetFilter && (
                        <Button
                            htmlType="button"
                            type="default"
                            onClick={handleReset}
                        >
                            Đặt lại
                        </Button>
                    )}
                    <div className="my-4">
                        <Row gutter={[16, 16]}>
                            {vouchers &&
                                vouchers.map((voucher) => (
                                    <Col md={6} xs={12} key={voucher._id}>
                                        <Card
                                            style={{
                                                borderRadius: '8px',
                                                border: '1px solid red',
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
                                                            fontSize: '28px',
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
                                                        {voucher.discountType ===
                                                        'fixed' ? (
                                                            <>
                                                                Giảm trực tiếp{' '}
                                                                <Text type="danger">
                                                                    {Currency.format(
                                                                        voucher.discountValue,
                                                                    )}
                                                                </Text>{' '}
                                                                cho đơn hàng
                                                            </>
                                                        ) : (
                                                            <>
                                                                Giảm{' '}
                                                                <Text type="danger">
                                                                    {
                                                                        voucher.discountValue
                                                                    }{' '}
                                                                    %
                                                                </Text>{' '}
                                                                cho tổng giá trị
                                                                đơn hàng
                                                            </>
                                                        )}
                                                    </Text>
                                                    <div>
                                                        <Text type="secondary">
                                                            Hiệu Lực Từ:{' '}
                                                            {formatDate(
                                                                voucher.startDate as any,
                                                            )}
                                                            <Text type="danger">
                                                                {' '}
                                                                {' Đến '}
                                                            </Text>
                                                            {formatDate(
                                                                voucher.endDate as any,
                                                            )}
                                                        </Text>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: '8px',
                                                        }}
                                                    >
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                            loading={isPending}
                                                            onClick={() =>
                                                                claimVoucher(
                                                                    voucher.code,
                                                                )
                                                            }
                                                        >
                                                            Nhận mã &gt;
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                        </Row>

                        {vouchers && vouchers?.length === 0 && <Empty />}
                        {isVoucherLoading && <Skeleton />}
                        {vouchers && vouchers?.length > 0 && (
                            <Pagination
                                className="flex justify-center item-center my-4"
                                current={Number(query.page) || 1}
                                pageSize={limit}
                                total={totalDocs}
                                onChange={onPageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Voucher;
