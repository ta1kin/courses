-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'Guest',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
