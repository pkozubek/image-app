export interface IUserDataDTO {
  id: string;
  name: string;
  token: string;
}

export interface IUserDataWithExpirationDate extends IUserDataDTO {
  expirationDate?: string;
}
