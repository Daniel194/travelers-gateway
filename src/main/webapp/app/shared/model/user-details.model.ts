export interface IUserDetails {
  dateOfBirth: Date;
  description: string;
  placeOfBirth: string;
  socialPlatforms: any;
}

export const defaultValue: Readonly<IUserDetails> = {
  dateOfBirth: null,
  description: '',
  placeOfBirth: '',
  socialPlatforms: null
};
