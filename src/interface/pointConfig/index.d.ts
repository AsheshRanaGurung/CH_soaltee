export interface IMembershipServiceRequest {
  id?: number | string;
  rewardPercentage?: number | string;
}
export interface IMemberTierOne {
  membershipName?: string;
  rewardPercentage?: number | string;
}
export interface IService {
  id?: number | string;
  serviceName?: string;
  serviceCode?: string;
  membershipServiceRequestDto?: IMembershipServiceRequest[];
  membershipServiceResponseDtos?: IMembershipServiceRequest[];
}

export interface IBonus {
  id?: number | string;
  bonusName?: string;
  validFrom?: string;
  validTo?: string;
  bonusValue?: number;
  serviceName?: string;
  serviceId?: string | number;
}
