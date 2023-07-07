import { z } from "zod";

const category= z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

const categoryCreate = category.omit({ id: true });

const categoryRead = category.array();

export { category, categoryCreate, categoryRead };