import z from "zod";

export interface GetProductsInputDTO {
  q?: string;
}

export interface GetProductsOutputDTO {
  id: string;
  name: string;
  price: number;
  created_at: string;
}

export const GetProductScheme = z.object({
  q: z.string().min(2).optional(),
});
