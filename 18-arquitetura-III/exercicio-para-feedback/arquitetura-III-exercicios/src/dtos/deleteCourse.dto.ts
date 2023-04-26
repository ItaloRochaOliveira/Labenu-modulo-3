import z from "zod";

export interface DeleteCoursesInputDTO {
  idToDelete: string;
}

export interface DeleteCoursesOutputDTO {
  message: string;
  course: {
    id: string;
    name: string;
    lessons: number;
    createdAt: string;
  };
}

export const DeleteCoursesScheme = z
  .object({
    idToDelete: z.string().min(3),
  })
  .transform((data) => data as DeleteCoursesInputDTO);
