import z from "zod";

export interface CreateCourseInputDTO {
  id: string;
  name: string;
  lessons: number;
}

export interface CreateCourseOutputDTO {
  message: string;
  course: {
    id: string;
    name: string;
    lessons: number;
    createdAt: string;
  };
}

export const CreateCourseScheme = z
  .object({
    id: z.string().min(3),
    name: z.string().min(3),
    lessons: z.number().min(3),
  })
  .transform((data) => data as CreateCourseInputDTO);
