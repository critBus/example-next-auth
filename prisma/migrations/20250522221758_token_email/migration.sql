-- CreateTable
CREATE TABLE "VerificationTokenEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationTokenEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokenEmail_token_key" ON "VerificationTokenEmail"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokenEmail_email_token_key" ON "VerificationTokenEmail"("email", "token");
