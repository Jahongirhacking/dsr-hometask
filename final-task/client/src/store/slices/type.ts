export interface IUserProps {
  name: string;
  role: Role;
}

export enum Role {
  User = "user",
  Admin = "admin",
}
