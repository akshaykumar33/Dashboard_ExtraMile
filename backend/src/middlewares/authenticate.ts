import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import status from 'http-status';

// Define a custom interface to extend the Request interface
interface CustomRequest extends Request {
    user?: any; // Define the user property here
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(status.BAD_REQUEST).json({ status: status.BAD_REQUEST, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(status.BAD_REQUEST).json({ status: status.BAD_REQUEST, message: "Unauthorized" });
        }

        req.user = user;
        next();
    });
};

export default authMiddleware;
