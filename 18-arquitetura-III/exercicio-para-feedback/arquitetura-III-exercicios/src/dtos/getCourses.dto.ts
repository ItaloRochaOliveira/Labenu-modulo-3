import z from "zod";

export interface GetCoursesInputDTO {
  q?: string;
}

export interface GetCoursesOutputDTO {
  id: string;
  name: string;
  lessons: number;
  createdAt: string;
}

export const GetCoursesScheme = z
  .object({
    q: z.string().min(3).optional(),
  })
  .transform((data) => data as GetCoursesInputDTO);
