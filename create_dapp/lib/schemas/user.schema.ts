import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const userSchemaDefaults: UserSchema = {
  firstName: "",
  lastName: "",
  email: "",
};
