export interface ICardData {
  title: string;
  key?: number | string;
  desc: string;
  img: string;
  count?: number | string;
}
export interface ICard {
  data: ICardData[];
}
