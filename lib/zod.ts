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
    image: z.url().optional(),
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
export const SendEmailFormSchema = z.object({
  email: z.email("Email format invalid").min(1, "Campo requerido"),
});

export const ForgotPasswordSchema = z.object({
  email: z.email("Email format invalid").min(1, "Campo requerido"),
});
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .max(128, "Máximo 128 caracteres"),
    confirmPassword: z.string().min(8, "Mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["confirmPassword"],
  });
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SendEmailFormValues = z.infer<typeof SendEmailFormSchema>;
