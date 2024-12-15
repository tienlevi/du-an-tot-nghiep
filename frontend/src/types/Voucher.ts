export type DiscountType = 'fixed' | 'percentage';

export type Status = 'active' | 'expired' | 'used';

export type IVoucher = {
    code: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minOrderValue: number;
    applicableCategories?: Array<string>;
    userId?: string;
    userRole?: string;
    startDate: Date;
    endDate: Date;
    quantity: number;
    status: Status;
    createdBy?: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type IVoucherResponse = {
    vouchers: IVoucher[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface IVoucherFormData
    extends Omit<IVoucher, '_id' | 'createdAt' | 'updatedAt'> {
    dateRange?: Array<Date>;
}
