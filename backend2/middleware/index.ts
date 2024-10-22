import { NextFunction ,Request, Response  } from "express";
import { validateSchema } from "../zod";
interface SignupBody {
    email: string;
    password: string;
  }
export function ZodValidation(req: Request, res: Response,next : NextFunction){
    const body = req.body as SignupBody;
    // Validate the input using the schema
    const response = validateSchema(body);
    // Send the appropriate response based on the validation result
    if (response.status !== 200) {
      res.status(response.status).json({ error: response.message });
    }
}