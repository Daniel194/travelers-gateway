export interface IPost {
  id?: any;
  country?: string;
  coverImageUrl?: string;
  title?: string;
  description?: string;
  endDate?: Date;
  startDate?: Date;
  login?: string;
  rating?: number;
}

export const defaultValue: Readonly<IPost> = {
  id: '',
  country: '',
  coverImageUrl: '',
  title: '',
  description: '',
  login: '',
  rating: 0,
  endDate: null,
  startDate: null
};
