"use server";

import { CreateUserState } from "@/lib/types";
import { networkAccountRequestSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

function parseFormData(formData: FormData) {
  return {
    folio: formData.get("folio") as string,
    managementType: formData.get("managementType") as string,
    fullName: formData.get("fullName") as string,
    phoneExtension: (formData.get("phoneExtension") as string) || undefined,
    position: (formData.get("position") as string) || undefined,
    department: (formData.get("department") as string) || undefined,
    employeeType: formData.get("employeeType") as string,
    accountIdentifier:
      (formData.get("accountIdentifier") as string) || undefined,
    nationalEmail: formData.get("nationalEmail") === "on",
    internationalEmail: formData.get("internationalEmail") === "on",
    internetEmail: formData.get("internetEmail") === "on",
    emailReason: (formData.get("emailReason") as string) || undefined,
    uneIntranet: formData.get("uneIntranet") === "on",
    nationalIntranet: formData.get("nationalIntranet") === "on",
    internetAccess: formData.get("internetAccess") === "on",
    webReason: (formData.get("webReason") as string) || undefined,
    corporateMessaging: formData.get("corporateMessaging") === "on",
    messagingReason: (formData.get("messagingReason") as string) || undefined,
    facebook: formData.get("facebook") === "on",
    twitter: formData.get("twitter") === "on",
    youtube: formData.get("youtube") === "on",
    whatsapp: formData.get("whatsapp") === "on",
    telegram: formData.get("telegram") === "on",
    instagram: formData.get("instagram") === "on",
    otherSocialNetworks:
      (formData.get("otherSocialNetworks") as string) || undefined,
    socialReason: (formData.get("socialReason") as string) || undefined,
    basicUser: formData.get("basicUser") === "on",
    advancedUser: formData.get("advancedUser") === "on",
    localAdmin: formData.get("localAdmin") === "on",
    networkAdmin: formData.get("networkAdmin") === "on",
    privilegesReason: (formData.get("privilegesReason") as string) || undefined,
    cloudAccessLevel: (formData.get("cloudAccessLevel") as string) || undefined,
    cloudReason: (formData.get("cloudReason") as string) || undefined,
    accountType: formData.get("accountType") as string,
    expirationDate: (formData.get("expirationDate") as string) || undefined,
    weekdays: formData.get("weekdays") === "on",
    afterHours: formData.get("afterHours") === "on",
    afterHoursStart: (formData.get("afterHoursStart") as string) || undefined,
    afterHoursEnd: (formData.get("afterHoursEnd") as string) || undefined,
    saturday: formData.get("saturday") === "on",
    saturdayStart: (formData.get("saturdayStart") as string) || undefined,
    saturdayEnd: (formData.get("saturdayEnd") as string) || undefined,
    sunday: formData.get("sunday") === "on",
    sundayStart: (formData.get("sundayStart") as string) || undefined,
    sundayEnd: (formData.get("sundayEnd") as string) || undefined,
    twentyFourHours: formData.get("twentyFourHours") === "on",
    apnNationalEmail: formData.get("apnNationalEmail") === "on",
    apnInternationalEmail: formData.get("apnInternationalEmail") === "on",
    apnInternet: formData.get("apnInternet") === "on",
    apnCellularNumber: formData.get("apnCellularNumber") === "on",
    authorizedPcName: (formData.get("authorizedPcName") as string) || undefined,
    authenticationPcs:
      (formData.get("authenticationPcs") as string) || undefined,
    authorizedSoftware:
      (formData.get("authorizedSoftware") as string) || undefined,
    requestedByName: (formData.get("requestedByName") as string) || undefined,
    requestedByRole: (formData.get("requestedByRole") as string) || undefined,
    requestedByDate: (formData.get("requestedByDate") as string) || undefined,
    reviewedByName: (formData.get("reviewedByName") as string) || undefined,
    reviewedByRole: (formData.get("reviewedByRole") as string) || undefined,
    reviewedByDate: (formData.get("reviewedByDate") as string) || undefined,
    approvedByName: (formData.get("approvedByName") as string) || undefined,
    approvedByRole: (formData.get("approvedByRole") as string) || undefined,
    approvedByDate: (formData.get("approvedByDate") as string) || undefined,
    executedByName: (formData.get("executedByName") as string) || undefined,
    executedByRole: (formData.get("executedByRole") as string) || undefined,
    executedByDate: (formData.get("executedByDate") as string) || undefined,
  };
}

export async function CreateUserAction(
  prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const fields = parseFormData(formData);

  const validated = networkAccountRequestSchema.safeParse(fields);
  if (!validated.success) {
    return {
      success: false,
      message: "Error de validación",
      data: {
        afterHours: fields.afterHours,
        saturday: fields.saturday,
        sunday: fields.sunday,
      },
      dbErrors: null,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const data = validated.data;

  try {
    await prisma.userAccountRequest.create({
      data: {
        folio: data.folio,
        managementType: data.managementType,
        fullName: data.fullName,
        phoneExtension: data.phoneExtension,
        position: data.position,
        department: data.department,
        employeeType: data.employeeType,
        accountIdentifier: data.accountIdentifier,
        nationalEmail: data.nationalEmail,
        internationalEmail: data.internationalEmail,
        internetEmail: data.internetEmail,
        emailReason: data.emailReason,
        uneIntranet: data.uneIntranet,
        nationalIntranet: data.nationalIntranet,
        internetAccess: data.internetAccess,
        webReason: data.webReason,
        corporateMessaging: data.corporateMessaging,
        messagingReason: data.messagingReason,
        facebook: data.facebook,
        twitter: data.twitter,
        youtube: data.youtube,
        whatsapp: data.whatsapp,
        telegram: data.telegram,
        instagram: data.instagram,
        otherSocialNetworks: data.otherSocialNetworks,
        socialReason: data.socialReason,
        basicUser: data.basicUser,
        advancedUser: data.advancedUser,
        localAdmin: data.localAdmin,
        networkAdmin: data.networkAdmin,
        privilegesReason: data.privilegesReason,
        cloudAccessLevel: data.cloudAccessLevel || undefined,
        cloudReason: data.cloudReason,
        accountType: data.accountType,
        expirationDate: data.expirationDate
          ? new Date(data.expirationDate)
          : undefined,
        weekdays: data.weekdays,
        afterHours: data.afterHours,
        afterHoursStart: data.afterHoursStart,
        afterHoursEnd: data.afterHoursEnd,
        saturday: data.saturday,
        saturdayStart: data.saturdayStart,
        saturdayEnd: data.saturdayEnd,
        sunday: data.sunday,
        sundayStart: data.sundayStart,
        sundayEnd: data.sundayEnd,
        twentyFourHours: data.twentyFourHours,
        apnNationalEmail: data.apnNationalEmail,
        apnInternationalEmail: data.apnInternationalEmail,
        apnInternet: data.apnInternet,
        apnCellularNumber: data.apnCellularNumber,
        authorizedPcName: data.authorizedPcName,
        authenticationPcs: data.authenticationPcs,
        authorizedSoftware: data.authorizedSoftware,
        requestedByName: data.requestedByName,
        requestedByRole: data.requestedByRole,
        requestedByDate: data.requestedByDate
          ? new Date(data.requestedByDate)
          : undefined,
        reviewedByName: data.reviewedByName,
        reviewedByRole: data.reviewedByRole,
        reviewedByDate: data.reviewedByDate
          ? new Date(data.reviewedByDate)
          : undefined,
        approvedByName: data.approvedByName,
        approvedByRole: data.approvedByRole,
        approvedByDate: data.approvedByDate
          ? new Date(data.approvedByDate)
          : undefined,
        executedByName: data.executedByName,
        executedByRole: data.executedByRole,
        executedByDate: data.executedByDate
          ? new Date(data.executedByDate)
          : undefined,
      },
    });

    revalidatePath("/dashboard/account-user-manangment");

    return {
      success: true,
      message: "Solicitud creada exitosamente",
      data: undefined,
      dbErrors: null,
      errors: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al crear la solicitud";
    return {
      success: false,
      message,
      data: {
        afterHours: fields.afterHours,
        saturday: fields.saturday,
        sunday: fields.sunday,
      },
      dbErrors: {
        message,
        name: "DatabaseError",
      },
      errors: null,
    };
  }
}
