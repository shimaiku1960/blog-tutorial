-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyLog" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutes" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "memo" TEXT,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "StudyLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudyLog" ADD CONSTRAINT "StudyLog_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
