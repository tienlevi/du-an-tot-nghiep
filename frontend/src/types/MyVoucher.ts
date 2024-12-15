import { IVoucher, Status } from './Voucher';

export type MyVoucher = {
    _id: string;
    userId: string;
    voucherId: IVoucher;
    status: Status;
    quantity: number;
    usedAt?: string;
    claimedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
