import z from "zod";
//!Validaciones para foro y subForo

export const createForoSchema = z.object({
  title: z
    .string({ required_error: "" })
    .min(6, { message: "El titulo debe tener al menos 6 caracteres" })
    .nonempty({ message: "No se pueden ingresar valores vacios" }),
  desc: z
    .string({ required_error: "" })
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(500, { message: "La descripción no puede exceder los 500 caracteres" })
    .nonempty({ message: "No se pueden ingresar valores vacios" }),
});

export const updateForoSchema = z.object({
  title: z
    .string()
    .min(6, { message: "El titulo debe tener al menos 6 caracteres" })
    .optional(),
  desc: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .optional(),
});

export const createSubForoSchema = z.object({
  title: z
    .string({ required_error: "El título es obligatorio" })
    .min(6, { message: "El título debe tener al menos 6 caracteres" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" })
    .nonempty({ message: "No se pueden ingresar valores vacíos" }),
  desc: z
    .string()
    .max(500, { message: "La descripción no puede exceder los 500 caracteres" })
    .optional(),
});

export const updateSubForoSchema = z.object({
  title: z
    .string()
    .min(6, { message: "El título debe tener al menos 6 caracteres" })
    .max(50, { message: "El título no puede exceder los 50 caracteres" })
    .optional(),
  desc: z
    .string()
    .max(500, { message: "La descripción no puede exceder los 500 caracteres" })
    .optional(),
});
