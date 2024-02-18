import { User } from 'firebase/auth';

export interface IloginForm {
  email: string;
  password: string;
}

export interface Iuser {
  uuid: string;
  role: string;
  photoUrl: string;
  displayName: string;
  mobileNumber: string;
  emailAddress: string;
}

export interface Icontext {
  user: User | null;
  menuItems: ImenuItem[];
  userProfile: Iuser | null;
}

export interface ImenuItem {
  title: string;
  subTitle: string;
  basePath: string;
  icon: React.ReactNode;
  children?: ImenuItemChildren[];
}

export interface ImenuItemChildren {
  path: string;
  title: string;
}
