export interface IProperty {
  id?: number | string;
  name?: string;
  code?: string;
  phoneNumber?: string;
  contactPerson?: string;
  contactPersonPhoneNo?: string;
}

export interface IMemberTier {
  data?: string;
  image?: string;
}

export interface IMemberTierDetail {
  id?: number | string;
  membershipName?: string;
  imageUrl?: string;
  image?: string | undefined | Blob;
  pointsFrom?: number | string;
  pointsTo?: number | string;
  colorCode?: string;
}
