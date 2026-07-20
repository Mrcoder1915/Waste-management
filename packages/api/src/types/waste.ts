import z from "zod";

export const wasteInsertSchema = z.object({
  wasteLabel: z.string().min(1),
  wasteType: z.string().min(1),
});
