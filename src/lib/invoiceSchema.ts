import { z } from "zod";

export const lineItemSchema = z.object({
    id: z.string(),
    description: z
        .string()
        .min(1, "Description is required")
        .max(80, "Description must be 80 characters or less"),
    quantity: z
        .number({ error: "Quantity must be a number" })
        .min(1, "Quantity must be at least 1")
        .max(10000, "Quantity cannot exceed 10,000"),
    rate: z
        .number({ error: "Rate must be a number" })
        .min(0, "Rate must be positive")
        .max(1000000, "Rate cannot exceed $1,000,000"),
    amount: z.number(),
});

export const companyDetailsSchema = z.object({
    name: z
        .string()
        .min(1, "Company name is required")
        .max(50, "Company name must be 50 characters or less"),
    address: z
        .string()
        .min(1, "Address is required")
        .max(150, "Address must be 150 characters or less"),
    email: z
        .string()
        .email("Invalid email address")
        .max(60, "Email must be 60 characters or less"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .max(20, "Phone number must be 20 characters or less"),
    gstNumber: z
        .string()
        .max(15, "GST number must be 15 characters or less")
        .optional()
        .or(z.literal("")),
});

export const clientDetailsSchema = z.object({
    name: z
        .string()
        .min(1, "Client name is required")
        .max(50, "Client name must be 50 characters or less"),
    address: z
        .string()
        .min(1, "Address is required")
        .max(150, "Address must be 150 characters or less"),
    email: z
        .string()
        .email("Invalid email address")
        .max(60, "Email must be 60 characters or less"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .max(20, "Phone number must be 20 characters or less"),
});

export const invoiceSchema = z.object({
    invoiceNumber: z
        .string()
        .min(1, "Invoice number is required")
        .max(25, "Invoice number must be 25 characters or less"),
    invoiceDate: z.string().min(1, "Invoice date is required"),
    dueDate: z.string().min(1, "Due date is required"),
    companyDetails: companyDetailsSchema,
    clientDetails: clientDetailsSchema,
    lineItems: z
        .array(lineItemSchema)
        .min(1, "At least one line item is required"),
    taxRate: z
        .number({ error: "Tax rate must be a number" })
        .min(0, "Tax rate must be positive")
        .max(100, "Tax rate must be between 0 and 100"),
    discount: z
        .number({ error: "Discount must be a number" })
        .min(0, "Discount must be positive")
        .max(1000000, "Discount cannot exceed $1,000,000"),
    notes: z
        .string()
        .max(400, "Notes must be 400 characters or less")
        .optional()
        .or(z.literal("")),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
