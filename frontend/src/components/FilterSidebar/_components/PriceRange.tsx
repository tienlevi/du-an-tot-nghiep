import { MAX_PRICE, MIN_PRICE } from '@/constants/products';
import useFilter from '@/hooks/_common/useFilter';
import { Currency } from '@/utils/FormatCurreny';
import { Button, Form, Slider } from 'antd';
import _, { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const PriceRange = () => {
    const { query, updateQueryParam } = useFilter();
    const [form] = Form.useForm();

    // check query price is empty or not
    const minPrice = !isEmpty(query?.['priceFilter[gte]'])
        ? query?.['priceFilter[gte]']
        : 0;
    const maxPrice = !isEmpty(query?.['priceFilter[lte]'])
        ? query?.['priceFilter[lte]']
        : 0;

    const onChangePrice = (value: number[]) => {
        const [min, max] = value;
        updateQueryParam({
            ...query,
            ['priceFilter[gte]']: min,
            ['priceFilter[lte]']: max,
            page: 1,
        });
    };
    const debounceFn = useCallback(_.debounce(onChangePrice, 700), []);

    const resetForm = () => {
        form.resetFields();
    };

    useEffect(() => {
        if (minPrice || !maxPrice) {
            resetForm();
        }
    }, [minPrice, maxPrice]);
    return (
        <div className="w-full px-2 pl-2 min-h-32 bg-white">
            <div className="flex justify-between mt-4">
                <span className="text-sm font-medium cursor-default">
                    {Currency(MIN_PRICE)}
                </span>
                <span className="text-sm font-medium cursor-default">
                    {Currency(MAX_PRICE)}
                </span>
            </div>
            <Form form={form}>
                <Form.Item
                    name="slider"
                    initialValue={[
                        minPrice || MIN_PRICE,
                        maxPrice || MAX_PRICE,
                    ]}
                >
                    <Slider
                        className="pb-6 mb-4 slider-custom"
                        range
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        onChange={debounceFn}
                        tooltip={{
                            formatter(value) {
                                return Currency(Number(value));
                            },
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default PriceRange;
