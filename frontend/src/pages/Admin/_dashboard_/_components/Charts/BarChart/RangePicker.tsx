import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '@/components/_common/WrapperList';
import DateRangePickerComponent from '../RangePicker/DateRangePickerComponent'; 
import { optionsBarChart } from './_option';

const generateMockData = (startDate: Dayjs, endDate: Dayjs) => {
    const days = endDate.diff(startDate, 'day') + 1;
    const data = [];
  
    for (let i = 0; i < days; i++) {
      const currentDate = startDate.add(i, 'day');
      data.push({
        date: currentDate.format('YYYY-MM-DD'),
        totalOrders: Math.floor(Math.random() * 100) + 50, // Random orders between 50-150
        totalRevenue: Math.floor(Math.random() * 10000000) + 5000000, // Random revenue between 5M-15M
      });
    }
  
    return {
      data,
      success: true,
      message: "Success"
    };
  };



const BarChartRangePicker: React.FC = () => {
    const today = dayjs();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today, today]);
    const dailyStats = generateMockData(dateRange[0], dateRange[1]);

    const revenue = dailyStats?.data?.map((item: any) => item.totalRevenue) || [];
    const orders = dailyStats?.data?.map((item: any) => item.totalOrders) || [];
    const time = dailyStats?.data?.map((item: any) => item.date) || [];

    const series = [
        {
            name: 'Đơn hàng',
            data: orders || [0],
        },
        {
            name: 'Doanh thu',
            data: revenue || [0],
        },
    ];
    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };
    useEffect(() => {
        // Khi component mount, đảm bảo rằng dateRange có giá trị
        if (!dateRange[0] || !dateRange[1]) {
            setDateRange([today, today]);
        }
    }, []);
    return (
        <WrapperList
            title='Đơn hàng và doanh thu'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
        >
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart(time)}
                        series={series}
                        type='bar'
                        height={350}
                        width={'100%'}
                    />
                </div>
            </div>
        </WrapperList>
    );
};

export default BarChartRangePicker;
