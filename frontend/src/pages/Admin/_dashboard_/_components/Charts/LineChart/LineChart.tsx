import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '@/components/_common/WrapperList';
import { optionsLineChart } from './_options';

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LineChart = () => {
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

    const sortedData = monthOrder.map(month => ({
        month,
        totalOrders: Math.floor(Math.random() * 100 + 50),
        totalRevenue: Math.floor(Math.random() * 1000000000 + 500000000)
    }));

    const months = sortedData.map((item) => item.month);
    const totalRevenue = sortedData.map((item) => item.totalRevenue);
    const totalOrders = sortedData.map((item) => item.totalOrders);

    const showRevenue = totalRevenue.some((value) => value !== undefined && value !== null);
    const showOrders = totalOrders.some((value) => value !== undefined && value !== null);

    const series = [
        {
            name: 'Doanh thu',
            data: totalRevenue,
        },
        {
            name: 'Đơn hàng',
            data: totalOrders,
        },
    ];

    const onYearChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        if (date) {
            const newYear = date.year();
            if (newYear <= dayjs().year()) {
                setSelectedYear(newYear);
            }
        }
    };

    const disabledDate = (current: Dayjs) => {
        return current.year() > dayjs().year();
    };


    return (
        <WrapperList
            title='Đơn hàng và doanh thu theo từng tháng'
            className='xl:col-span-12'
            option={
                <DatePicker
                    onChange={onYearChange}
                    picker='year'
                    defaultValue={dayjs().year(selectedYear)}
                    disabledDate={disabledDate}
                />
            }
            lineButtonBox
        >
            <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                            <ReactApexChart
                                options={optionsLineChart(months, showRevenue, showOrders)}
                                series={series}
                                type='line'
                                height={350}
                                width={'100%'}
                            />
                    </div>
                </div>
            </div>
        </WrapperList>
    );
};

export default LineChart;
