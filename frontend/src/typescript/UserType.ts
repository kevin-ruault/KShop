export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
};

export type CreateUserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type LogUserType = {
  email: string;
  password: string;
};

export type UserContextType = {
  user: UserType | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};
