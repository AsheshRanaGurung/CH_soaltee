export interface ProfileFormProps {
  userId: any;
  onCloseModal: () => void;
  handleFormSubmit: () => void;
}

//create points by service
interface IServiceArray {
  serviceId: number;
  totalAmount: number;
}
export interface ICreateByService {
  userId: number | string;
  propertyId: number;
  transactionType?: string;
  lpServiceListDtos?: IServiceArray[];
}

//create points manually

export interface ICreateManually {
  userId: number | string;
  propertyId: number;
  rewardPoints: string;
  transactionType?: string;
}
