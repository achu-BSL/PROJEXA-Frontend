export interface RegisterFormInterface {
  user_email: string;
  user_name: string;
  password: string;
  confirm_password: string;
}

export interface LoginFormInterface {
  user_email: string;
  password: string;
}

export interface AuthErrorsInterface {
  user_email?: { message: string };
  user_name?: { message: string };
  password?: { message: string };
  confirm_password?: { message: string };
}
