import { z } from 'zod';

export const registerUserSchema = z.object({
    role: z.enum(['victima', 'profesional', 'institucion'], {
        errorMap: () => ({ message: 'Rol no válido' }),
    }),
    nombre: z.string()
        .min(1, { message: 'El nombre es requerido' }),
    mail: z.string()
        .email({ message: 'Correo electrónico no válido' }),
    departamento: z.string()
        .min(1, { message: 'El departamento es obligatorio' }),
    localidad: z.string()
        .min(1, { message: 'La localidad es obligatoria' }),
    contrasenia: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
        .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula' })
        .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número' }),
    nro_telefono: z.string()
        .min(7, { message: 'El número de teléfono debe tener al menos 7 dígitos' })
        .regex(/^\+?[0-9]+$/, { message: 'El número de teléfono debe ser válido' }),
    nro_matricula: z.string()
        .optional()
        .or(z.literal('').optional()), // Solo para el rol 'profesional'
    cuit: z.string("El CUIT es requerido")
        .optional()
        .or(z.literal('').optional()), // Se valida condicionalmente en superRefine
    razon_social: z.string("La razón social es requerida")
        .optional()
        .or(z.literal('').optional()), // Solo para el rol 'institucion'
    direccion: z.string("La direccion es requerida")
        .optional()
        .or(z.literal('').optional()), // Solo para el rol 'institucion'
}).superRefine((data, ctx) => {
    // Validación condicional para CUIT si el role es 'institucion'
    if (data.role === 'institucion' && (!data.cuit || !/^\d{11}$/.test(data.cuit))) {
        ctx.addIssue({
            path: ['cuit'],
            message: 'El CUIT debe tener 11 dígitos si el rol es "institución"',
        });
    }

    // Validación de razon_social si el role es 'institucion'
    if (data.role === 'institucion' && !data.razon_social) {
        ctx.addIssue({
            path: ['razon_social'],
            message: 'La razón social es obligatoria si el rol es "institución"',
        });
    }
});





export const loginSchema = z.object({
    mail: z.string({
        required_error: 'El email es requerido'
    })
        .nonempty({ message: 'No se puede enviar un email vacío' })
        .email({ message: 'Ingrese un email válido, con @ y .com, .es' }),
    contrasenia: z.string({
        required_error: 'La contraseña es requerida'
    })
        .nonempty({ message: 'No se puede enviar una contraseña vacía' })
})