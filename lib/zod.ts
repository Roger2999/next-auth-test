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
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .max(128, "Máximo 128 caracteres"),
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
// lib/validations/network-account-request.ts

export const networkAccountRequestSchema = z.object({
  // Header
  folio: z.string().min(1, "El folio es requerido"),
  managementType: z.enum(["CREATE", "UPDATE", "MODIFICATION"]),

  // Applicant
  fullName: z.string().min(1, "El nombre es requerido"),
  phoneExtension: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  employeeType: z.enum([
    "EXECUTIVE",
    "SENIOR_SPECIALIST",
    "TECHNICIAN",
    "OTHER",
  ]),
  accountIdentifier: z.string().optional(),

  // Email Services
  nationalEmail: z.boolean(),
  internationalEmail: z.boolean(),
  internetEmail: z.boolean(),
  emailReason: z.string().optional(),

  // Web Navigation
  uneIntranet: z.boolean(),
  nationalIntranet: z.boolean(),
  internetAccess: z.boolean(),
  webReason: z.string().optional(),

  // Instant Messaging
  corporateMessaging: z.boolean(),
  messagingReason: z.string().optional(),

  // Social Networks
  facebook: z.boolean(),
  twitter: z.boolean(),
  youtube: z.boolean(),
  whatsapp: z.boolean(),
  telegram: z.boolean(),
  instagram: z.boolean(),
  otherSocialNetworks: z.string().optional(),
  socialReason: z.string().optional(),

  // User Privileges
  basicUser: z.boolean(),
  advancedUser: z.boolean(),
  localAdmin: z.boolean(),
  networkAdmin: z.boolean(),
  privilegesReason: z.string().optional(),

  // Cloud Access
  cloudAccessLevel: z
    .enum(["READ_ONLY", "MODIFY", "DELETE", "FULL_CONTROL"])
    .optional(),
  cloudReason: z.string().optional(),

  // Account Type
  accountType: z.enum(["PERMANENT", "TEMPORARY"]),
  expirationDate: z.string().optional(),

  // Days and Hours
  weekdays: z.boolean(),
  afterHours: z.boolean(),
  afterHoursStart: z.string().optional(),
  afterHoursEnd: z.string().optional(),
  saturday: z.boolean(),
  saturdayStart: z.string().optional(),
  saturdayEnd: z.string().optional(),
  sunday: z.boolean(),
  sundayStart: z.string().optional(),
  sundayEnd: z.string().optional(),
  twentyFourHours: z.boolean(),

  // APN Access
  apnNationalEmail: z.boolean(),
  apnInternationalEmail: z.boolean(),
  apnInternet: z.boolean(),
  apnCellularNumber: z.boolean(),

  // APN Configuration
  authorizedPcName: z.string().optional(),
  authenticationPcs: z.string().optional(),
  authorizedSoftware: z.string().optional(),

  // Workflow
  requestedByName: z.string().optional(),
  requestedByRole: z.string().optional(),
  requestedByDate: z.string().optional(),

  reviewedByName: z.string().optional(),
  reviewedByRole: z.string().optional(),
  reviewedByDate: z.string().optional(),

  approvedByName: z.string().optional(),
  approvedByRole: z.string().optional(),
  approvedByDate: z.string().optional(),

  executedByName: z.string().optional(),
  executedByRole: z.string().optional(),
  executedByDate: z.string().optional(),
});

export type NetworkAccountRequestFormData = z.infer<
  typeof networkAccountRequestSchema
>;
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SendEmailFormValues = z.infer<typeof SendEmailFormSchema>;
