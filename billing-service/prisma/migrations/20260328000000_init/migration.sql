-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(191) NOT NULL DEFAULT 'pending',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_id_key" ON "Bill"("id");
