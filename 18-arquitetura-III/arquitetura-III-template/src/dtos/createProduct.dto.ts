import z from "zod";

export interface CreateProductInputDTO {
  id: string;
  name: string;
  price: number;
}

export interface CreateProductOutputDTO {
  message: string;
  product: {
    id: string;
    name: string;
    price: number;
    createdAt: string;
  };
}

export const CreateProductScheme = z
  .object({
    id: z.string().min(3).optional(),
    name: z.string().min(3).optional(),
    price: z.number().positive().min(0).gt(0).optional(),
  })
  .transform((data) => data as CreateProductInputDTO);
