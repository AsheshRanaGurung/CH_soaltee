export interface IMember {
  id?: number | string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  nationality?: string;
  isActive?: boolean;
  propertyId?: number;
  isBlocked?: boolean;
}

export interface IMemberHistory {
  id?: string | number;
  rewardPoints?: number | string;
  fullName?: string;
  serviceName?: string;
  transactionType?: string;
  txnDate?: any;
}
