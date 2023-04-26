import z from "zod";

export interface EditCourseInputDTO {
  idToEdit: string;
  id?: string;
  name?: string;
  lessons?: number;
}

export interface EditCourseOutputDTO {
  message: string;
  course: {
    id: string;
    name: string;
    lessons: number;
    createdAt: string;
  };
}

export const EditCourseScheme = z
  .object({
    idToEdit: z.string().min(3),
    id: z.string().min(3).optional(),
    name: z.string().min(3).optional(),
    lessons: z.number().min(3).optional(),
  })
  .transform((data) => data as EditCourseInputDTO);
