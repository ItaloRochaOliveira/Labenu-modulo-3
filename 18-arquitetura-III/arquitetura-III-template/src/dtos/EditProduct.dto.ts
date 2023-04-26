import z from "zod";

export interface EditProductInputDTO {
  idToEdit: string;
  id?: string;
  name?: string;
  price?: number;
}

export interface EditProductOutputDTO {
  message: string;
  product: {
    id: string;
    name: string;
    price: number;
    createdAt: string;
  };
}

export const EditProductScheme = z
  .object({
    idToEdit: z.string(),
    id: z.string().min(3).optional(),
    name: z.string().min(3).optional(),
    price: z.number().positive().min(0).gt(0).optional(),
  })
  .transform((data) => data as EditProductInputDTO);
