import { Button, Card, ConfigProvider, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import WrapperList from '@/components/_common/WrapperList';
import DateRangePickerCard from '../../DatePickerCard/DateRangePickerCard';
import LatestOrders from './LatestOrders';
import { columns } from '../_option'; 
import { OrderStatus } from '@/constants/enum';

const { Title } = Typography;

function generateOrder(id: string): LatestOrders {
    const orderStatus = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'done'] as OrderStatus[];
    const paymentMethod = ['cash', 'card'] as ('cash' | 'card')[];
    const customerNames = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Samantha Lee', 'Michael Brown'];
    const customerAvatars = [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
    ];
  
    return {
      _id: id,
      totalPrice: Math.floor(Math.random() * 1000) + 50,
      paymentMethod: paymentMethod[Math.floor(Math.random() * paymentMethod.length)],
      orderStatus: orderStatus[Math.floor(Math.random() * orderStatus.length)],
      createdAt: dayjs().subtract(Math.floor(Math.random() * 30), 'day').toISOString(),
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      customerAvatar: customerAvatars[Math.floor(Math.random() * customerAvatars.length)],
    };
  }
  const sampleLatestOrders: LatestOrders[] = Array.from({ length: 2 }, (_, i) => generateOrder(`order-${i}`));

  const sampleTopBuyers = {
    data: {
      topBuyers: Array.from({ length: 5 }, (_, i) => ({
        _id: `buyer-${i}`,
        name: `Buyer ${i + 1}`,
        totalOrders: Math.floor(Math.random() * 100) + 10,
        totalSpent: Math.floor(Math.random() * 10000) + 1000,
      })),
      latestOrders: sampleLatestOrders,
    },
  };
type DateInput =
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const TopUsers: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({
        type: 'range',
        start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });


    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };

    const tableData = sampleTopBuyers?.data?.topBuyers?.map((buyer: any, index: number) => ({
        ...buyer,
        key: buyer._id,
        index: index + 1,
    }));

    return (
        <WrapperList
            title='Thống kê khách hàng'
            lineButtonBox
            option={<DateRangePickerCard onDateChange={handleDateChange} initialDate={dateInput} />}
        >
            <Card
                title={<Typography.Title level={4}>Đơn hàng gần đây</Typography.Title>}
                extra={
                    <Button type='link'>
                        <Link to={'/admin/orders'}>Xem tất cả</Link>
                    </Button>
                }
                className='mb-8'
            >
                {sampleTopBuyers?.data?.latestOrders && <LatestOrders orders={sampleTopBuyers.data.latestOrders} />}
            </Card>

            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemHoverColor: '#1890ff',
                            itemSelectedColor: '#1890ff',
                            itemColor: '#595959',
                            titleFontSize: 16,
                        },
                    },
                    token: {
                        colorPrimary: '#1890ff',
                        borderRadius: 4,
                    },
                }}
            >
                <Card title={<Title level={4}>Top 5 khách hàng</Title>}>
                    <Table columns={columns} dataSource={tableData} pagination={false}  />
                </Card>
            </ConfigProvider>
        </WrapperList>
    );
};

export default TopUsers;
