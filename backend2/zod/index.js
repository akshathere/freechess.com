"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
// Define your Zod schema
const passwordValidation = zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter");
const schema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: passwordValidation,
});
// Define a function to handle schema validation and return specific errors
const validateSchema = (data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.flatten();
        if (errors.fieldErrors.password) {
            for (const error of errors.fieldErrors.password) {
                if (error.includes("lowercase")) {
                    return { status: 400, message: "Password must contain at least one lowercase letter" };
                }
                if (error.includes("uppercase")) {
                    return { status: 400, message: "Password must contain at least one uppercase letter" };
                }
                if (error.includes("8 characters")) {
                    return { status: 400, message: "Password must be at least 8 characters long" };
                }
            }
        }
        if (errors.fieldErrors.email) {
            return { status: 400, message: "Invalid email address" };
        }
        return { status: 400, message: "Invalid input" };
    }
    return { status: 200, message: "Validation successful" };
};
exports.validateSchema = validateSchema;
// module.exports=validateSchema
