/*
  Warnings:

  - You are about to drop the `CourseGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseGenre" DROP CONSTRAINT "CourseGenre_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseGenre" DROP CONSTRAINT "CourseGenre_genreId_fkey";

-- DropTable
DROP TABLE "CourseGenre";

-- CreateTable
CREATE TABLE "_CourseGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseGenres_AB_unique" ON "_CourseGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseGenres_B_index" ON "_CourseGenres"("B");

-- AddForeignKey
ALTER TABLE "_CourseGenres" ADD CONSTRAINT "_CourseGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseGenres" ADD CONSTRAINT "_CourseGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
