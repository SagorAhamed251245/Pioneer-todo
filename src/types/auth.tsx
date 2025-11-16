export type TUserSignup = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TLoginRes = {
  refresh: string;
  access: string;
};
