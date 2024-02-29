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
  menuItems: ImenuItem[];
  userProfile: Iuser | null;
  handleLogout: () => Promise<void>;
  setUserProfile: React.Dispatch<React.SetStateAction<Iuser | null>>;
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

export interface Iarea {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ItableColumn<T = any> {
  key: keyof T;
  label: string;
  component?: (item: T) => React.ReactNode;
}

export interface IareaForm {
  image: File | string;
  name: string;
}
