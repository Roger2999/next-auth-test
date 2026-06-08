-- CreateEnum
CREATE TYPE "ManagementType" AS ENUM ('CREATE', 'UPDATE', 'MODIFICATION');

-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('EXECUTIVE', 'SENIOR_SPECIALIST', 'TECHNICIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('PERMANENT', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "CloudAccessLevel" AS ENUM ('READ_ONLY', 'MODIFY', 'DELETE', 'FULL_CONTROL');

-- CreateTable
CREATE TABLE "network_account_request" (
    "id" TEXT NOT NULL,
    "folio" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "managementType" "ManagementType" NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneExtension" TEXT,
    "position" TEXT,
    "department" TEXT,
    "employeeType" "EmployeeType" NOT NULL,
    "accountIdentifier" TEXT,
    "nationalEmail" BOOLEAN NOT NULL DEFAULT false,
    "internationalEmail" BOOLEAN NOT NULL DEFAULT false,
    "internetEmail" BOOLEAN NOT NULL DEFAULT false,
    "emailReason" TEXT,
    "uneIntranet" BOOLEAN NOT NULL DEFAULT false,
    "nationalIntranet" BOOLEAN NOT NULL DEFAULT false,
    "internetAccess" BOOLEAN NOT NULL DEFAULT false,
    "webReason" TEXT,
    "corporateMessaging" BOOLEAN NOT NULL DEFAULT false,
    "messagingReason" TEXT,
    "facebook" BOOLEAN NOT NULL DEFAULT false,
    "twitter" BOOLEAN NOT NULL DEFAULT false,
    "youtube" BOOLEAN NOT NULL DEFAULT false,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "telegram" BOOLEAN NOT NULL DEFAULT false,
    "instagram" BOOLEAN NOT NULL DEFAULT false,
    "otherSocialNetworks" TEXT,
    "socialReason" TEXT,
    "basicUser" BOOLEAN NOT NULL DEFAULT false,
    "advancedUser" BOOLEAN NOT NULL DEFAULT false,
    "localAdmin" BOOLEAN NOT NULL DEFAULT false,
    "networkAdmin" BOOLEAN NOT NULL DEFAULT false,
    "privilegesReason" TEXT,
    "cloudAccessLevel" "CloudAccessLevel",
    "cloudReason" TEXT,
    "accountType" "AccountType" NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "weekdays" BOOLEAN NOT NULL DEFAULT false,
    "afterHours" BOOLEAN NOT NULL DEFAULT false,
    "afterHoursStart" TEXT,
    "afterHoursEnd" TEXT,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "saturdayStart" TEXT,
    "saturdayEnd" TEXT,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "sundayStart" TEXT,
    "sundayEnd" TEXT,
    "twentyFourHours" BOOLEAN NOT NULL DEFAULT false,
    "apnNationalEmail" BOOLEAN NOT NULL DEFAULT false,
    "apnInternationalEmail" BOOLEAN NOT NULL DEFAULT false,
    "apnInternet" BOOLEAN NOT NULL DEFAULT false,
    "apnCellularNumber" BOOLEAN NOT NULL DEFAULT false,
    "authorizedPcName" TEXT,
    "authenticationPcs" TEXT,
    "authorizedSoftware" TEXT,
    "requestedByName" TEXT,
    "requestedByRole" TEXT,
    "requestedByDate" TIMESTAMP(3),
    "requestedBySignature" TEXT,
    "reviewedByName" TEXT,
    "reviewedByRole" TEXT,
    "reviewedByDate" TIMESTAMP(3),
    "reviewedBySignature" TEXT,
    "approvedByName" TEXT,
    "approvedByRole" TEXT,
    "approvedByDate" TIMESTAMP(3),
    "approvedBySignature" TEXT,
    "executedByName" TEXT,
    "executedByRole" TEXT,
    "executedByDate" TIMESTAMP(3),
    "executedBySignature" TEXT,
    "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
    "deactivationReason" TEXT,
    "deactivationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "network_account_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "network_account_request_folio_key" ON "network_account_request"("folio");

-- CreateIndex
CREATE UNIQUE INDEX "network_account_request_accountIdentifier_key" ON "network_account_request"("accountIdentifier");

-- CreateIndex
CREATE INDEX "network_account_request_folio_idx" ON "network_account_request"("folio");

-- CreateIndex
CREATE INDEX "network_account_request_managementType_idx" ON "network_account_request"("managementType");

-- CreateIndex
CREATE INDEX "network_account_request_employeeType_idx" ON "network_account_request"("employeeType");

-- CreateIndex
CREATE INDEX "network_account_request_accountType_idx" ON "network_account_request"("accountType");

-- CreateIndex
CREATE INDEX "network_account_request_isDeactivated_idx" ON "network_account_request"("isDeactivated");
