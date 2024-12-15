import WrapperList from '@/components/_common/WrapperList';
import useTable from '@/hooks/_common/useTable';
import { ConfigProvider } from 'antd';
import useGetMyOrders from '@/hooks/orders/Queries/useGetMyOrders';
import TableDisplay from '@/components/_common/TableDisplay';
import { ColumnsType, ColumnType, TableProps } from 'antd/es/table';
import { MyVoucher } from '@/types/MyVoucher';
import { Params } from 'react-router-dom';
import { Currency } from '@/utils';
import useGetMyVoucher from '@/hooks/MyVoucher/Queries/useGetMyVoucher';
import { formatDate } from '@/utils/formatDate';

const MyVoucherList = () => {

    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } =
        useTable<MyVoucher>();
    const { data } = useGetMyVoucher();
    const myVoucher = data?.data;
    // const totalDocs = data?.data.data.totalDocs;

    const myVoucherCol = (): TableProps<any>['columns'] => {
        return [
   
             {
                title: 'Voucher code',
          
                key: 'code',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {record.voucherId.code}
                    </span>
                ),
            },
            {
                title: 'Loại',
                key: 'discountType',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {record.voucherId.discountType === 'percentage' ? 'Phần trăm' : 'Giá trị trực tiếp'}
                    </span>
                ),
            },
            {
                title: 'Giảm',
                key: 'discountValue',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {record.voucherId.discountType === 'percentage' ? `${record.voucherId.discountValue} %` : `${Currency.format(record.voucherId.discountValue)}`}
                    </span>
                ),
            },
            {
                title: 'Thời gian bắt đầu',
          
                key: 'startDate',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {formatDate(record.voucherId.startDate)}
                    </span>
                ),
            },
            {
                title: 'Thời gian hết hạn',
          
                key: 'endDate',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {formatDate(record.voucherId.endDate)}
                    </span>
                ),
            },

            {
                title: 'Số lượng',
          
                key: 'quantity',
                render: (text: any, record) => (
                    <span className="font-semibold">
                        {record.quantity}
                    </span>
                ),
            },
           
            
        ];
    };

    
    const columns: ColumnsType<MyVoucher> =
        myVoucherCol() || [];

    return (
        <WrapperList classic title="Voucher của tôi" className="my-5">
            {/* @Content */}
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            titleFontSize: 16,
                            inkBarColor: '#da291c',
                            itemActiveColor: '#da291c',
                        },
                    },
                }}
            >
                {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}
                <TableDisplay
                    onFilter={onFilter}
                    onSelectPaginateChange={onSelectPaginateChange}
                    columns={columns}
                    totalDocs={1}
                    dataSource={myVoucher}
                    currentPage={Number(query.page || 1)}
                ></TableDisplay>
            </ConfigProvider>
        </WrapperList>
    );
};

export default MyVoucherList;
