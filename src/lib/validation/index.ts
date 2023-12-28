import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email("Email format is incorrect"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  shop: z.string().min(1, { message: "Shop number required" }),
});

export const SigninValidation = z.object({
  username: z.string().min(2, { message: "Username is too short" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .length(10, { message: "Phone number should be exactly 10 digits long." }),
});

const measurements = z.object({
  shirt: z.object({
    length: z.string(),
    shoulder: z.string(),
    sleeveLength: z.string(),
    chest: z.string(),
    waist: z.string(),
    hip: z.string(),
    neck: z.string(),
    remark: z.string(),
  }),
  trouser: z.object({
    length: z.string(),
    crotch: z.string(),
    waist: z.string(),
    hip: z.string(),
    thigh: z.string(),
    knee: z.string(),
    bottom: z.string(),
    fLow: z.string(),
    remark: z.string(),
  }),
  jacket: z.object({
    length: z.string(),
    shoulder: z.string(),
    sleeveLength: z.string(),
    chest: z.string(),
    waist: z.string(),
    hip: z.string(),
    neck: z.string(),
    crossBack: z.string(),
    remark: z.string(),
  }),
});

export const OrderValidation = z.object({
  order: z
    .string()
    .min(1, { message: "Order ID is missing!" })
    .refine((value) => /^\d+$/.test(value), {
      message: "ID must be a number!",
    }),
  dates: z.object({
    order: z.date(),
    trial: z.date({ required_error: "Required trial date!" }),
    delivery: z.date({ required_error: "Required delivery date!" }),
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Phone Number must be a 10-digit number!",
  }),
  measurements: measurements,
  productObj: z.object({
    kurta: z.string(),
    pajama: z.string(),
    trouser: z.string(),
    jacket: z.string(),
    shirt: z.string(),
    vestCoat: z.string(),
    jawarBundi: z.string(),
    tuxedo: z.string(),
    sherwani: z.string(),
    suit2: z.string(),
    suit3: z.string(),
  }),
  products: z.array(
    z.object({
      type: z.string(),
      amount: z.number(),
    })
  ),
});
