export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
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
