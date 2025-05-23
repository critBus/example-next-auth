/*
  Warnings:

  - You are about to drop the `ResetTokenEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ResetTokenEmail";

-- CreateTable
CREATE TABLE "ResetPasswordTokenEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordTokenEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordTokenEmail_token_key" ON "ResetPasswordTokenEmail"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordTokenEmail_email_token_key" ON "ResetPasswordTokenEmail"("email", "token");
