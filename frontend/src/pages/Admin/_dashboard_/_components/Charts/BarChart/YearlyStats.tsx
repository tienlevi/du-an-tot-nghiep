import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '@/components/_common/WrapperList';
import { ApexOptions } from 'apexcharts';

// Mock data generator function
const generateMockData = (year :any) => {
    // Generate realistic but fake data based on the year
    const currentYear = dayjs().year();
    const multiplier = Math.max(0.5, 1 - (currentYear - year) * 0.1); // Older years have less activity
    
    return {
      year,
      totalOrders: Math.floor(Math.random() * 1000 * multiplier + 500),
      totalRevenue: Math.floor(Math.random() * 5000000000 * multiplier + 1000000000)
    };
  };
  
  // Mock API response
  const useMockYearlyStats = (selectedYear:any) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulate API delay
      setIsLoading(true);
      const timer = setTimeout(() => {
        setData(generateMockData(selectedYear));
        setIsLoading(false);
      }, 800);
  
      return () => clearTimeout(timer);
    }, [selectedYear]);
  
    return { data, isLoading, refetch: () => {} };
  };

const YearlyStats: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
    const { data: yearlyStats, isLoading ,refetch} = useMockYearlyStats(selectedYear);

    useEffect(() => {
        refetch();
    }, [selectedYear, refetch]);

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

    const chartData = useMemo(() => {
        const yearData = yearlyStats || { year: selectedYear, totalOrders: 0, totalRevenue: 0 };
        const { year, totalOrders, totalRevenue } = yearData;

        const options: ApexOptions = {
            chart: {
                type: 'bar',
                height: 450,
                stacked: false,
                toolbar: {
                    show: true,
                },
            },
            colors: ['#6366F1', '#84CC16'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Đơn hàng và Doanh thu'],
            },
            yaxis: [
                {
                    title: {
                        text: 'Đơn hàng',
                        style: {
                            color: '#6366F1',
                        },
                    },
                    labels: {
                        formatter(value: number) {
                            return value.toFixed(0);
                        },
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: 'Doanh thu',
                        style: {
                            color: '#84CC16',
                        },
                    },
                    labels: {
                        formatter(value: number) {
                            if (value >= 1e9) return `${(value / 1e9).toFixed(1)} tỷ`;
                            if (value >= 1e6) return `${(value / 1e6).toFixed(1)} triệu`;
                            return `${value.toLocaleString()} đ`;
                        },
                    },
                },
            ],
            title: {
                text: `Thống kê năm ${year}`,
                align: 'center',
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            },
        };

        return {
            options,
            series: [
                {
                    name: 'Đơn hàng',
                    type: 'column',
                    data: [totalOrders],
                },
                {
                    name: 'Doanh thu',
                    type: 'column',
                    data: [totalRevenue],
                },
            ],
        };
    }, [yearlyStats, selectedYear]);

    if (isLoading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <WrapperList
            title='Theo năm'
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
            <div>
                {chartData.series[0].data[0] === 0 && chartData.series[1].data[0] === 0 ? (
                    <div>Không có dữ liệu cho năm này</div>
                ) : (
                    <div id='chart'>
                        <ReactApexChart options={chartData.options} series={chartData.series} type='bar' height={450} />
                    </div>
                )}
            </div>
        </WrapperList>
    );
};

export default YearlyStats;
