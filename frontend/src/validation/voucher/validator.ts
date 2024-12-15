import { ErrorMessage } from '../Message';

export const voucherCodeValidator = [
    {
        required: true,
        message: 'Vui lòng nhập mã voucher!',
    },
    {
        validator(_: any, code: string) {
            if (code && code.length < 5) {
                return ErrorMessage('Mã voucher phải có ít nhất 5 ký tự.');
            }
            if (code && code.length > 20) {
                return ErrorMessage('Mã voucher phải ít hơn 20 ký tự.');
            }
            if (!/^[A-Za-z0-9-]+$/.test(code)) {
                return ErrorMessage(
                    'Mã voucher chỉ bao gồm chữ in hoa, số và dấu gạch ngang.',
                );
            }
            return Promise.resolve();
        },
    },
];

export const voucherDiscountValidator = (discountType: string) => [
    {
        required: true,
        message: 'Vui lòng nhập giá trị giảm giá!',
    },
    {
        validator(_: any, value: number) {
            if (value === undefined || value === null) {
                return Promise.reject('Giá trị giảm giá là bắt buộc.');
            }

            if (discountType === 'percentage') {
                // Kiểm tra cho kiểu giảm giá theo phần trăm
                if (value < 1 || value > 100) {
                    return Promise.reject('Giá trị giảm giá phải từ 1 đến 100%.');
                }
            } else if (discountType === 'fixed') {
                // Kiểm tra cho kiểu giảm giá cố định
                if (value < 1000 || value > 100000) {
                    return Promise.reject('Giá trị giảm giá phải từ 1,000 đến 100,000.');
                }
            } else {
                return Promise.reject('Loại giảm giá không hợp lệ.');
            }

            return Promise.resolve();
        },
    },
];

export const voucherDateValidator = [
    {
        required: true,
        message: 'Vui lòng chọn ngày bắt đầu và ngày kết thúc!',
    },
    {
        validator(_: any, dates: [Date, Date]) {
            if (dates && dates[0] && dates[1]) {
                const [startDate, endDate] = dates;
                if (endDate < startDate) {
                    return ErrorMessage(
                        'Ngày kết thúc không thể trước ngày bắt đầu.',
                    );
                }
                return Promise.resolve();
            }
            return Promise.reject('Ngày bắt đầu và ngày kết thúc là bắt buộc.');
        },
    },
];
