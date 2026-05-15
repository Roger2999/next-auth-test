export type Route = {
  name: string;
  href: string;
  current: boolean;
  id: string;
};
export type SignupFormState = {
  data?: {
    username?: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    image?: string;
  };
  success?: boolean;
  message?: string;
  dbErrors?: {
    status?: number;
    name?: string;
    message?: string;
    details?: Record<string, string[]>;
  } | null;
  validationErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    image?: string[];
  } | null;
};
export type SigninFormState = {
  data?: {
    email: string;
    password?: string;
  };
  success?: boolean;
  message?: string;
  dbErrors?: {
    status?: number;
    name?: string;
    message?: string;
    details?: Record<string, string[]>;
  } | null;
  validationErrors?: {
    email?: string[];
    password?: string[];
  } | null;
};
export type SignoutState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string;
    message?: string | undefined;
  } | null;
};
export type SendEmailState =
  | {
      success?: boolean;
      message?: string;
      dbErrors?: {
        status?: number;
        name?: string;
        message?: string;
        details?: Record<string, string[]>;
      } | null;
      validationErrors?: {
        email?: string[];
      } | null;
    }
  | undefined;
export type ForgotPasswordState = {
  success?: boolean;
  message?: string;
  dbErrors?: {
    status?: number;
    name?: string;
    message?: string;
  } | null;
  validationErrors?: {
    email?: string[];
  } | null;
};
export type UploadImageState = {
  success?: boolean;
  message?: string;
  dbErrors?: {
    status?: number;
    name?: string;
    message?: string;
  } | null;
  validationErrors?: {
    image?: string[];
  } | null;
};
