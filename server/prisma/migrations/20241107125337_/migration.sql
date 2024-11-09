/*
  Warnings:

  - You are about to drop the `_CourseToGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseToGenre" DROP CONSTRAINT "_CourseToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToGenre" DROP CONSTRAINT "_CourseToGenre_B_fkey";

-- DropTable
DROP TABLE "_CourseToGenre";

-- CreateTable
CREATE TABLE "CourseGenre" (
    "courseId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseGenre_pkey" PRIMARY KEY ("courseId","genreId")
);

-- AddForeignKey
ALTER TABLE "CourseGenre" ADD CONSTRAINT "CourseGenre_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseGenre" ADD CONSTRAINT "CourseGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
