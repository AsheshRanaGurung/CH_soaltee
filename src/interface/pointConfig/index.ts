export interface IMembershipServiceRequest {
  id?: number | string;
  rewardPercentage?: number | string;
}
export interface IMemberTierOne {
  membershipTierName?: string;
  rewardPercentage?: number | string;
}
export interface IService {
  id?: number | string;
  serviceName?: string;
  serviceCode?: string;
  membershipServiceRequestDto?: IMembershipServiceRequest[];
  membershipServiceResponseDtos?: IMembershipServiceRequest[];
}
