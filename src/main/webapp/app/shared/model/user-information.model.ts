export interface IUserInformation {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl: string;
  dateOfBirth: Date;
  description: string;
  placeOfBirth: string;
  socialPlatforms: any;
  visitedCountries: any;
}

export const defaultValue: Readonly<IUserInformation> = {
  id: '',
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  dateOfBirth: null,
  description: '',
  placeOfBirth: '',
  socialPlatforms: null,
  visitedCountries: null
};
