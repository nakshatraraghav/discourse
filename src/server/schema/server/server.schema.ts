import { z } from "zod";

export const editServerFormSchema = z.object({
  name: z
    .string({
      required_error: "The edited name is required for Server Creation",
      invalid_type_error: "The edited name has to be a String",
    })
    .min(6, "The edited name should be longer than 6 characters")
    .max(16, "The edited name cannot be longer than 16 characters"),
  image: z.string().min(1, "Server image is required"),
});

export const createServerFormSchema = z.object({
  name: z
    .string({
      required_error: "Server name is required for Server Creation",
      invalid_type_error: "Name has to be a String",
    })
    .min(6, "Server name should be longer than 6 characters")
    .max(16, "Server name cannot be longer than 16 characters"),
  image: z.string().min(1, "Server image is required"),
});
