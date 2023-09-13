export interface IVoucher {
  id?: string | number;
  voucherName?: string;
  serviceId?: string | number;
  discountPercentage?: string | number;
  maximumAmounts?: string | number;
  maximumLimits?: string | number;
  voucherDescription?: any;
  image?: any;
}
