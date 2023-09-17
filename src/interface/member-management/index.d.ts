export interface IMember {
  id?: number | string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  nationalityId?: string;
  isActive?: boolean;
  propertyId?: string;
  property?: {
    id?: number | string;
  };
  isBlocked?: boolean;
  roleId?: string | number;
  dateOfBirth?: string;
  userId?: string;
  membershipTierId?: string | number;
}

export interface IMemberHistory {
  id?: string | number;
  rewardPoints?: number | string;
  fullName?: string;
  serviceName?: string;
  transactionType?: string;
  txnDate?: any;
  propertyName?: string;
}
