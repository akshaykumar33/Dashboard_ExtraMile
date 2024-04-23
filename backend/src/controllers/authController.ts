import { Request, Response } from 'express';
const bcrypt= require('bcrypt');
import jwt from 'jsonwebtoken';
import Joi, { ValidationError } from 'joi';
import httpStatus from 'http-status';
import { EmployeeModel } from '@/models/models'; 
import { registerSchema, loginSchema } from '@/validations/authValidation';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const validator = Joi.compile(registerSchema);
            const { value, error }: { value: any, error: any |unknown |string} = await validator.validate(body);


            if (error) {
                throw new Error(error);
            } else {
                const payload = value;

                // Check if email is already taken
                const existingEmployee = await EmployeeModel.findOne({ email: payload.email });
                if (existingEmployee) {
                    throw new Error("Unique constraint failed");
                }

                // Hash the password
                const salt = bcrypt.genSaltSync(10);
                payload.password = bcrypt.hashSync(payload.password, salt);

                // Create the employee
                const employee = await EmployeeModel.create(payload);

                return res.json({ status: httpStatus.OK, message: 'Employee created successfully', employee });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                // Handle Joi validation error
                const errorMessage = error.message;
                const startIndex = errorMessage.indexOf(':') + 1;
                const formattedErrorMessage = errorMessage.substring(startIndex);
                return res.json({ status: httpStatus.BAD_REQUEST, errors: formattedErrorMessage });
            } else {
                // Handle other errors
                switch (true) {
                    case error.message.includes('Unique constraint failed'):
                        return res.json({ status: httpStatus.BAD_REQUEST, errors: 'Email is already taken. Please choose another Email!!!' });
                    case error.message.includes('password') || error.message.includes('email') || error.message.includes('username'):
                        const errorMessage = error.message;
                        const startIndex = errorMessage.indexOf(':') + 1;
                        const formattedErrorMessage = errorMessage.substring(startIndex);
                        return res.json({ status: httpStatus.BAD_REQUEST, errors: formattedErrorMessage });
                    default:
                        return res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, errors: "Something went wrong. Please try again!!" });
                }
            }
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const validator = Joi.compile(loginSchema);
            const { value, error }: { value: any, error: any } = await validator.validate(body);


            if (error) {
                throw new Error(error);
            } else {
                const payload = value;

                // Check if employee exists and password matches
                const employee = await EmployeeModel.findOne({ email: payload.email });
                if (!employee || !bcrypt.compareSync(payload.password, employee.password)) {
                    return res.json({ status: httpStatus.BAD_REQUEST, message: "Invalid Credentials!!!" });
                }

                // Issue token
                const payloadData = {
                    id: employee.empId,
                    name: employee.username,
                    email: employee.email,
                    
                }

                const token = jwt.sign(payloadData, JWT_SECRET, {
                    expiresIn: '1h'
                });

                return res.json({ status: httpStatus.OK, message: "You have logged in successfully!!!", access_token: `Bearer ${token}` });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                // Handle Joi validation error
                const errorMessage = error.message;
                const startIndex = errorMessage.indexOf(':') + 1;
                const formattedErrorMessage = errorMessage.substring(startIndex);
                return res.json({ status: httpStatus.BAD_REQUEST, errors: formattedErrorMessage });
            } else {
                // Handle other errors
                switch (true) {
                    case error.message.includes('password') || error.message.includes('email'):
                        const errorMessage = error.message;
                        const startIndex = errorMessage.indexOf(':') + 1;
                        const formattedErrorMessage = errorMessage.substring(startIndex);
                        return res.json({ status: httpStatus.BAD_REQUEST, errors: formattedErrorMessage });
                    default:
                        return res.json({ status: httpStatus.INTERNAL_SERVER_ERROR, errors: "Something went wrong. Please try again!!" });
                }
            }
        }
    }
}

export default AuthController;
