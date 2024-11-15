// StatisticsCards.tsx
import React, { useRef, useState } from 'react';
import { Carousel, Button } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    ShoppingOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons';
import CardDataStats from './CardDataStats';
import DatePickerCard from '../DatePickerCard/DatePickerCard';
import moment from 'moment';


type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const StatisticsCards: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({ type: 'single', date: moment().format('YYYY-MM-DD') });
    const carouselRef = useRef<CarouselRef>(null);

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };

    const cardData = [
        {
            title: 'Tổng đơn hàng',
            total: 1500,
            rate: '5%',
            levelUp: true,
            subtitle: 'Thành công',
            icon: <ShoppingCartOutlined />,
            tooltip: 'Total orders placed in selected time period',
            rateTooltip: 'Success rate for the selected period',
        },
        {
            title: 'Total Revenue',
            total: '$5,000',
            rate: '20%',
            subtitle: 'Average Daily Revenue',
            icon: <DollarCircleOutlined />,
            tooltip: 'Total revenue for selected period',
            rateTooltip: 'Average daily revenue for selected period',
        },
        {
            title: 'New Users',
            total: 234,
            rate: '3%',
            levelDown: true,
            subtitle: 'Cancellation Rate',
            icon: <UserOutlined />,
            tooltip: 'New user registrations in selected period',
            rateTooltip: 'Order cancellation rate for selected period',
        },
        {
            title: 'New Products',
            total: 45,
            icon: <ShoppingOutlined />,
            tooltip: 'New products added in selected period',
        },
    ];

    const NavigationButton = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
        <Button
            type="default"
            shape="circle"
            icon={direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
            onClick={onClick}
            className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50
                ${direction === 'left' ? '-left-4' : '-right-4'}`}
        />
    );

    return (

        <>
           <div className='mb-3 ml-3'>
                <DatePickerCard onDateChange={handleDateChange} initialDate={dateInput} />
            </div>
            <div className="relative">

                <NavigationButton
                    direction="left"
                    onClick={() => carouselRef.current?.prev()}
                />
                <NavigationButton
                    direction="right"
                    onClick={() => carouselRef.current?.next()}
                />

                <div className="px-4">
                    <Carousel
                        ref={carouselRef}
                        dots={false}
                        slidesToShow={3}
                        slidesToScroll={1}
                        autoplay={false}
                        className="!-mx-2"
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                },
                            },
                            {
                                breakpoint: 640,
                                settings: {
                                    slidesToShow: 1,
                                },
                            },
                        ]}
                    >
                        {cardData.map((card, index) => (
                            <div key={index} className="px-2">
                                <CardDataStats {...card} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div></>

    );
};

export default StatisticsCards;