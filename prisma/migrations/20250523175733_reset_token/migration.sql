-- CreateTable
CREATE TABLE "ResetTokenEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetTokenEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetTokenEmail_token_key" ON "ResetTokenEmail"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetTokenEmail_email_token_key" ON "ResetTokenEmail"("email", "token");
