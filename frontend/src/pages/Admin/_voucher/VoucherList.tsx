/* eslint-disable no-nested-ternary */
import { ADMIN_ROUTES } from '@/constants/router';
import useTable from '@/hooks/_common/useTable';
import { IVoucher } from '@/types/Voucher';
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useGetVoucher from '@/hooks/Voucher/Queries/useGetVoucher';
import { formatDate } from '@/utils/formatDate';
import { Currency } from '@/utils/FormatCurreny';
import { useMutationDeleteVoucher } from '@/hooks/Voucher/Mutations/useDeleteVoucher';
import { useState } from 'react';

const VoucherList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [voucherId, setVoucherId] = useState<string>('');

    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } =
        useTable<IVoucher>();
    const { data: voucher } = useGetVoucher(query);
    const voucherList = voucher?.data.vouchers;
    const totalDocs = voucher?.data.totalDocs;
    const currentPage = Number(query.page || 1);

    const { mutate: deleteVoucher, isPending } = useMutationDeleteVoucher();

    const columns: TableProps<IVoucher>['columns'] = [
        {
            title: 'Mã voucher',
            dataIndex: 'code',
            key: 'code',
            render: (text) => (
                <h4 className="font-semibold inline-block bg-red-400">
                    {text}
                </h4>
            ),
            ...getColumnSearchProps('code'),
            width: '20%',
        },
        {
            title: 'Loại voucher',
            dataIndex: 'discountType',
            key: 'discountType',
            render: (text) => (
                <h4 className="inline-block bg-slate-50">
                    {text === 'percentage' ? 'Phần trăm' : 'Giá'}
                </h4>
            ),
            width: '10%',
        },

        {
            title: 'Giảm',
            dataIndex: 'discountValue',
            key: 'discountValue',
            render: (text, record) => (
                <h4 className="inline-block bg-slate-50">
                    {record.discountType === 'percentage'
                        ? `${text}%`
                        : `${Currency(text)}`}
                </h4>
            ),
            width: '10%',
        },

        {
            title: 'Ngày bắt đầu áp dụng',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => (
                <h4 className="inline-block bg-slate-50">{formatDate(text)}</h4>
            ),
            width: '20%',
        },

        {
            title: 'Ngày hết hạn áp dụng',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (text) => (
                <h4 className="inline-block bg-slate-50">{formatDate(text)}</h4>
            ),
            width: '20%',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <h4 className="inline-block bg-slate-50">
                    {text === 'active'
                        ? 'Chưa sử dụng'
                        : text === 'used'
                          ? 'Đã sử dụng'
                          : 'Hết hạn'}
                </h4>
            ),
            width: '10%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title="Cập nhật voucher">
                        <Link
                            to={`${ADMIN_ROUTES.VOUCHER_EDIT}/${record._id}`}
                            className="text-blue-500"
                        >
                            <EditOutlined
                                className="rounded-full bg-blue-100 p-2"
                                style={{ fontSize: '1rem' }}
                            />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Xóa voucher">
                        <DeleteOutlined
                            className="rounded-full bg-red-100 p-2"
                            style={{ fontSize: '1rem' }}
                            onClick={() => {
                                setVoucherId(record._id);
                                setIsModalOpen(true);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setVoucherId('');
    };

    return (
        <WrapperPageAdmin
            title="Quản lý voucher"
            option={
                <Link to={ADMIN_ROUTES.VOUCHER_CREATE}>
                    <Button icon={<PlusOutlined />} type="primary">
                        Thêm mới voucher
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IVoucher>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={voucherList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
            <Modal
                title={
                    <div>
                        <WarningOutlined
                            className="text-yellow-500"
                            style={{ fontSize: '1.5rem' }}
                        />
                        <h4 className="ml-2 inline-block">Xác nhận lại</h4>
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" type="default" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        key="button"
                        danger
                        loading={isPending}
                        type="primary"
                        onClick={() => {
                            deleteVoucher({ id: voucherId });
                        }}
                    >
                        Chấp nhận
                    </Button>,
                ]}
            >
                <p>Bạn có muốn xóa voucher này không?</p>
            </Modal>
        </WrapperPageAdmin>
    );
};

export default VoucherList;
