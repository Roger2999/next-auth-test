import z from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Minimo de 3 caracteres")
      .max(20, "Maximo de 20 caracteres"),
    email: z.email("Email format invalid"),
    password: z
      .string()
      .min(8, "Minimo de 8 caracteres")
      .max(128, "No puede tener mas de 128 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "Minimo de 8 caracteres")
      .max(128, "No puede tener mas de 128 caracteres"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["confirmPassword"],
  });
export const SigninFormSchema = z.object({
  email: z.email("Email format invalid").min(1, "Campo requerido"),
  password: z
    .string()
    .min(8, "Minimo de 8 caracteres")
    .max(128, "No puede tener mas de 128 caracteres"),
});
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type SigninFormValues = z.infer<typeof SigninFormSchema>;

export type FormState = {
  data?: {
    username?: string;
    email: string;
    password?: string;
    confirmPassword?: string;
  };
  success?: boolean;
  message?: string;
  dbErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  validationErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
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
